import type {
  FieldDefinition,
  ModelDefinition,
  TypeRef,
} from '@modelforge/core';
import { describe, expect, it } from 'vitest';

import { inferJsonValue, parseAndInferJson } from './index';

function successful(source: string) {
  const result = parseAndInferJson(source);
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error('Expected successful JSON inference.');
  return result;
}

function rootModel(source: string): ModelDefinition {
  const result = successful(source);
  expect(result.document.root.kind).toBe('model');
  const root = result.document.models[0];
  if (!root) throw new Error('Expected a root model.');
  return root;
}

function field(model: ModelDefinition, sourceName: string): FieldDefinition {
  const found = model.fields.find(
    (candidate) => candidate.sourceName === sourceName,
  );
  if (!found) throw new Error(`Expected field ${sourceName}.`);
  return found;
}

function scalar(type: TypeRef): string | undefined {
  return type.kind === 'scalar' ? type.scalar : undefined;
}

describe('JSON syntax parsing', () => {
  it('returns an actionable stable diagnostic for invalid JSON', () => {
    const first = parseAndInferJson('{\n  "name": "Ada",\n  nope\n}');
    const second = parseAndInferJson('{\n  "name": "Ada",\n  nope\n}');

    expect(first.ok).toBe(false);
    if (first.ok) throw new Error('Expected invalid JSON.');
    expect(first.diagnostics[0]).toMatchObject({
      code: 'INVALID_JSON_SYNTAX',
      severity: 'error',
      path: '$',
    });
    expect(first.diagnostics[0]?.location?.line).toBeGreaterThanOrEqual(2);
    expect(first).toEqual(second);
  });

  it('enforces source size warning and hard-limit boundaries', () => {
    const warning = parseAndInferJson('{"value":1}', {
      sourceSizeWarningBytes: 1,
      sourceSizeHardLimitBytes: 100,
    });
    expect(warning.ok).toBe(true);
    if (warning.ok) {
      expect(warning.document.diagnostics[0]?.code).toBe('SOURCE_SIZE_WARNING');
    }

    const rejected = parseAndInferJson('{"value":1}', {
      sourceSizeHardLimitBytes: 2,
    });
    expect(rejected.ok).toBe(false);
    if (!rejected.ok) {
      expect(rejected.diagnostics[0]?.code).toBe('SOURCE_SIZE_LIMIT_EXCEEDED');
    }
  });
});

describe('deterministic inference', () => {
  it('distinguishes integer, number, boolean, and string scalars', () => {
    const model = rootModel(
      '{"count":2,"ratio":2.5,"active":true,"label":"two"}',
    );

    expect(scalar(field(model, 'count').type)).toBe('integer');
    expect(scalar(field(model, 'ratio').type)).toBe('number');
    expect(scalar(field(model, 'active').type)).toBe('boolean');
    expect(scalar(field(model, 'label').type)).toBe('string');
  });

  it('creates stable nested models in source traversal order', () => {
    const result = successful('{"profile":{"display_name":"Ada"}}');
    expect(result.document.models.map((model) => model.targetName)).toEqual([
      'Root',
      'Profile',
    ]);
    expect(field(result.document.models[0]!, 'profile').type).toEqual({
      kind: 'model',
      modelId: result.document.models[1]!.id,
    });
    expect(result).toEqual(successful('{"profile":{"display_name":"Ada"}}'));
  });

  it('merges object evidence across array elements', () => {
    const result = successful(
      '[{"id":1,"name":"Ada"},{"id":2,"score":9.5},{"id":3,"score":8}]',
    );
    expect(result.document.root).toMatchObject({
      kind: 'array',
      evidenceCount: 3,
    });
    const item = result.document.models[0]!;
    expect(item.targetName).toBe('Root');
    expect(field(item, 'name')).toMatchObject({
      required: false,
      nullable: false,
    });
    expect(field(item, 'name').evidence).toMatchObject({
      observedCount: 1,
      missingCount: 2,
    });
    expect(scalar(field(item, 'score').type)).toBe('number');
  });

  it('keeps nullability independent from requiredness and type evidence', () => {
    const result = successful('[{"value":null},{},{"value":4}]');
    const value = field(result.document.models[0]!, 'value');
    expect(value).toMatchObject({ required: false, nullable: true });
    expect(scalar(value.type)).toBe('integer');
    expect(value.evidence).toMatchObject({
      observedCount: 2,
      missingCount: 1,
      nullCount: 1,
    });
  });

  it('represents null-only values and empty arrays as explainable unknowns', () => {
    const result = successful('{"nothing":null,"items":[]}');
    const model = result.document.models[0]!;
    expect(field(model, 'nothing').type).toEqual({
      kind: 'unknown',
      reason: 'null-only',
    });
    expect(field(model, 'nothing').nullable).toBe(true);
    expect(field(model, 'items').type).toMatchObject({
      kind: 'array',
      element: { kind: 'unknown', reason: 'empty-array' },
    });
    expect(result.document.diagnostics.map((item) => item.code)).toEqual(
      expect.arrayContaining([
        'NULL_ONLY_UNKNOWN_TYPE',
        'EMPTY_ARRAY_UNKNOWN_ELEMENT',
      ]),
    );
  });

  it('keeps heterogeneous arrays as unions and marks nullable elements', () => {
    const result = successful('{"values":[1,"one",null]}');
    const values = field(result.document.models[0]!, 'values').type;
    expect(values).toMatchObject({ kind: 'array', elementNullable: true });
    if (values.kind !== 'array') throw new Error('Expected array type.');
    expect(values.element.kind).toBe('union');
    expect(result.document.diagnostics.map((item) => item.code)).toContain(
      'HETEROGENEOUS_ARRAY',
    );
  });

  it('adds conservative semantic hints without changing string types', () => {
    const model = rootModel(
      '{"created":"2026-08-27T12:30:00Z","day":"2024-02-29","email":"ada@example.com","site":"https://example.com/x","id":"123e4567-e89b-12d3-a456-426614174000","fakeDay":"2024-02-31"}',
    );
    const expected = new Map([
      ['created', 'datetime'],
      ['day', 'date'],
      ['email', 'email'],
      ['site', 'url'],
      ['id', 'uuid'],
    ]);
    for (const [name, hint] of expected) {
      const inferred = field(model, name);
      expect(scalar(inferred.type)).toBe('string');
      expect(inferred.semanticHints).toEqual([{ kind: hint, confidence: 1 }]);
    }
    expect(field(model, 'fakeDay').semanticHints).toEqual([]);
  });

  it('normalizes names, preserves colliding properties, and reports both', () => {
    const result = successful('{"first-name":1,"first name":2,"123 code":3}');
    const model = result.document.models[0]!;
    expect(model.fields.map((item) => item.targetName)).toEqual([
      'firstName',
      'firstName2',
      'value123Code',
    ]);
    expect(result.document.diagnostics.map((item) => item.code)).toContain(
      'PROPERTY_NAME_COLLISION',
    );
  });

  it('exposes serializable inference decisions without raw string values', () => {
    const result = successful('{"secret":"do-not-record-me"}');
    expect(result.decisions).toHaveLength(1);
    expect(result.decisions[0]).toMatchObject({
      code: 'FIELD_INFERENCE',
      path: '$/secret',
      evidence: { observedCount: 1, missingCount: 0, nullCount: 0 },
    });
    expect(JSON.stringify(result.decisions)).not.toContain('do-not-record-me');
    expect(() => JSON.parse(JSON.stringify(result.decisions))).not.toThrow();
  });

  it('supports primitive roots and diagnoses a null root', () => {
    expect(inferJsonValue(4).document.root).toEqual({
      kind: 'scalar',
      scalar: 'integer',
    });
    const nullResult = inferJsonValue(null);
    expect(nullResult.document.root).toEqual({
      kind: 'unknown',
      reason: 'null-only',
    });
    expect(nullResult.document.diagnostics[0]?.code).toBe(
      'NULL_ONLY_UNKNOWN_TYPE',
    );
  });

  it('stops safely at the configured inference depth', () => {
    const result = parseAndInferJson('{"one":{"two":{"three":3}}}', {
      maxDepth: 1,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.document.diagnostics.map((item) => item.code)).toContain(
        'MAX_DEPTH_EXCEEDED',
      );
    }
  });
});
