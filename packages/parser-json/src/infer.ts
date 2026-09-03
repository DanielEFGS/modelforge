import {
  allocateUniqueName,
  createDiagnostic,
  createStableId,
  FORGE_SCHEMA_VERSION,
  normalizeModelName,
  normalizePropertyName,
  singularizeModelName,
  type ArrayTypeRef,
  type Diagnostic,
  type EvidenceSummary,
  type FieldDefinition,
  type ForgeDocument,
  type ModelDefinition,
  type PrimitiveExample,
  type TypeRef,
} from '@modelforge/core';

import { categorizeString, inferSemanticHints } from './semantic-hints';
import type { InferenceDecision, JsonInferenceOptions } from './types';

interface InferenceContext {
  rootName: string;
  maxDepth: number;
  models: ModelDefinition[];
  modelsByPath: Map<string, ModelDefinition>;
  diagnostics: Diagnostic[];
  decisions: InferenceDecision[];
}

type JsonObject = Record<string, unknown>;

function escapePathSegment(segment: string): string {
  return segment.replaceAll('~', '~0').replaceAll('/', '~1');
}

function childPath(path: string, segment: string): string {
  return `${path}/${escapePathSegment(segment)}`;
}

function typeIdentity(type: TypeRef): string {
  switch (type.kind) {
    case 'scalar':
      return `scalar:${type.scalar}`;
    case 'model':
      return `model:${type.modelId}`;
    case 'unknown':
      return `unknown:${type.reason}`;
    case 'array':
      return `array:${typeIdentity(type.element)}:${String(type.elementNullable)}`;
    case 'union':
      return `union:${type.variants.map(typeIdentity).join('|')}`;
  }
}

function describeType(type: TypeRef): string {
  switch (type.kind) {
    case 'scalar':
      return type.scalar;
    case 'model':
      return `model:${type.modelId}`;
    case 'unknown':
      return `unknown:${type.reason}`;
    case 'array':
      return `array<${describeType(type.element)}>${type.elementNullable ? ' nullable-elements' : ''}`;
    case 'union':
      return type.variants.map(describeType).join(' | ');
  }
}

function addDecision(
  context: InferenceContext,
  input: Omit<InferenceDecision, 'id'>,
): void {
  context.decisions.push({
    id: createStableId(
      'decision',
      [input.code, input.path, input.result, input.summary].join('\u0000'),
    ),
    ...input,
  });
}

function primitiveExample(value: unknown): PrimitiveExample | undefined {
  if (value === null) return { kind: 'null' };
  if (typeof value === 'string') {
    return { kind: 'string', category: categorizeString(value) };
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { kind: 'integer' } : { kind: 'number' };
  }
  if (typeof value === 'boolean') return { kind: 'boolean', value };
  return undefined;
}

function uniqueExamples(values: readonly unknown[]): PrimitiveExample[] {
  const examples: PrimitiveExample[] = [];
  const identities = new Set<string>();

  for (const value of values) {
    const example = primitiveExample(value);
    if (!example) continue;
    const identity = JSON.stringify(example);
    if (!identities.has(identity)) {
      examples.push(example);
      identities.add(identity);
    }
    if (examples.length === 5) break;
  }
  return examples;
}

function mergeVariants(types: TypeRef[]): TypeRef {
  const byIdentity = new Map<string, TypeRef>();
  for (const type of types) {
    const variants = type.kind === 'union' ? type.variants : [type];
    for (const variant of variants) {
      byIdentity.set(typeIdentity(variant), variant);
    }
  }

  const variants = [...byIdentity.values()];
  const hasInteger = variants.some(
    (variant) => variant.kind === 'scalar' && variant.scalar === 'integer',
  );
  const hasNumber = variants.some(
    (variant) => variant.kind === 'scalar' && variant.scalar === 'number',
  );
  const widened =
    hasInteger && hasNumber
      ? variants.filter(
          (variant) =>
            !(variant.kind === 'scalar' && variant.scalar === 'integer'),
        )
      : variants;

  return widened.length === 1
    ? widened[0]!
    : { kind: 'union', variants: widened };
}

function inferArray(
  arrays: unknown[][],
  context: InferenceContext,
  path: string,
  suggestedName: string,
  depth: number,
): ArrayTypeRef {
  const elements = arrays.flat();
  const nonNullElements = elements.filter((element) => element !== null);
  const elementNullable = nonNullElements.length !== elements.length;

  if (elements.length === 0 || nonNullElements.length === 0) {
    const reason = elements.length === 0 ? 'empty-array' : 'null-only';
    context.diagnostics.push(
      createDiagnostic({
        severity: 'warning',
        code:
          reason === 'empty-array'
            ? 'EMPTY_ARRAY_UNKNOWN_ELEMENT'
            : 'NULL_ONLY_UNKNOWN_TYPE',
        message:
          reason === 'empty-array'
            ? 'Array element type is unknown because no elements were observed.'
            : 'Array element type is unknown because only null was observed.',
        path,
      }),
    );
    return {
      kind: 'array',
      element: { kind: 'unknown', reason },
      evidenceCount: elements.length,
      elementNullable,
    };
  }

  const itemName = singularizeModelName(normalizeModelName(suggestedName));
  const element = inferValues(
    nonNullElements,
    context,
    childPath(path, 'items'),
    itemName,
    depth + 1,
  );

  if (element.kind === 'union') {
    context.diagnostics.push(
      createDiagnostic({
        severity: 'warning',
        code: 'HETEROGENEOUS_ARRAY',
        message: 'Array elements contain incompatible type evidence.',
        path,
      }),
    );
  }

  return {
    kind: 'array',
    element,
    evidenceCount: elements.length,
    elementNullable,
  };
}

function inferObjectSamples(
  samples: JsonObject[],
  context: InferenceContext,
  path: string,
  suggestedName: string,
  depth: number,
): TypeRef {
  const existing = context.modelsByPath.get(path);
  if (existing) return { kind: 'model', modelId: existing.id };

  const model: ModelDefinition = {
    id: createStableId('model', path),
    sourceName: path === '$' ? undefined : suggestedName,
    suggestedName: normalizeModelName(suggestedName),
    targetName: normalizeModelName(suggestedName),
    fields: [],
    path,
  };
  context.models.push(model);
  context.modelsByPath.set(path, model);

  const orderedKeys: string[] = [];
  const seenKeys = new Set<string>();
  for (const sample of samples) {
    for (const key of Object.keys(sample)) {
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        orderedKeys.push(key);
      }
    }
  }

  const allocatedNames = new Set<string>();
  for (const key of orderedKeys) {
    const presentValues = samples
      .filter((sample) => Object.hasOwn(sample, key))
      .map((sample) => sample[key]);
    const nonNullValues = presentValues.filter((value) => value !== null);
    const missingCount = samples.length - presentValues.length;
    const nullCount = presentValues.length - nonNullValues.length;
    const suggestedFieldName = normalizePropertyName(key);
    const targetName = allocateUniqueName(suggestedFieldName, allocatedNames);
    allocatedNames.add(targetName);
    const fieldPath = childPath(path, key);
    const type =
      nonNullValues.length === 0
        ? ({ kind: 'unknown', reason: 'null-only' } satisfies TypeRef)
        : inferValues(nonNullValues, context, fieldPath, key, depth + 1);
    const evidence: EvidenceSummary = {
      observedCount: presentValues.length,
      missingCount,
      nullCount,
      examples: uniqueExamples(presentValues),
    };
    const fieldId = createStableId('field', fieldPath);

    if (suggestedFieldName !== key) {
      context.diagnostics.push(
        createDiagnostic({
          severity: 'info',
          code: 'PROPERTY_NAME_NORMALIZED',
          message: `Property "${key}" was normalized to "${suggestedFieldName}".`,
          path: fieldPath,
          fieldId,
          modelId: model.id,
        }),
      );
    }
    if (targetName !== suggestedFieldName) {
      context.diagnostics.push(
        createDiagnostic({
          severity: 'warning',
          code: 'PROPERTY_NAME_COLLISION',
          message: `Property "${key}" collides after normalization and was assigned "${targetName}".`,
          path: fieldPath,
          fieldId,
          modelId: model.id,
        }),
      );
    }
    if (nonNullValues.length === 0) {
      context.diagnostics.push(
        createDiagnostic({
          severity: 'warning',
          code: 'NULL_ONLY_UNKNOWN_TYPE',
          message: `Property "${key}" has no non-null type evidence.`,
          path: fieldPath,
          fieldId,
          modelId: model.id,
        }),
      );
    }

    const semanticHints = inferSemanticHints(
      nonNullValues.filter(
        (value): value is string => typeof value === 'string',
      ),
    );
    const field: FieldDefinition = {
      id: fieldId,
      sourceName: key,
      suggestedName: suggestedFieldName,
      targetName,
      type,
      required: missingCount === 0,
      nullable: nullCount > 0,
      semanticHints,
      evidence,
      constraints: {},
    };
    model.fields.push(field);

    addDecision(context, {
      code: 'FIELD_INFERENCE',
      path: fieldPath,
      summary: `Observed ${presentValues.length} value(s), ${String(nullCount)} null and ${String(missingCount)} missing.`,
      result: `${describeType(type)}; ${field.required ? 'required' : 'optional'}; ${field.nullable ? 'nullable' : 'non-nullable'}`,
      evidence: {
        observedCount: presentValues.length,
        missingCount,
        nullCount,
      },
    });
  }

  return { kind: 'model', modelId: model.id };
}

function inferValues(
  values: unknown[],
  context: InferenceContext,
  path: string,
  suggestedName: string,
  depth: number,
): TypeRef {
  if (depth > context.maxDepth) {
    context.diagnostics.push(
      createDiagnostic({
        severity: 'error',
        code: 'MAX_DEPTH_EXCEEDED',
        message: `Inference exceeded the configured depth limit of ${context.maxDepth}.`,
        path,
      }),
    );
    return { kind: 'unknown', reason: 'conflict' };
  }

  const grouped = new Map<string, unknown[]>();
  for (const value of values) {
    const key = Array.isArray(value)
      ? 'array'
      : value === null
        ? 'null'
        : typeof value;
    const group = grouped.get(key) ?? [];
    group.push(value);
    grouped.set(key, group);
  }

  const inferred: TypeRef[] = [];
  const strings = grouped.get('string') as string[] | undefined;
  if (strings) inferred.push({ kind: 'scalar', scalar: 'string' });
  const numbers = grouped.get('number') as number[] | undefined;
  if (numbers) {
    inferred.push({
      kind: 'scalar',
      scalar: numbers.every(Number.isInteger) ? 'integer' : 'number',
    });
  }
  if (grouped.has('boolean')) {
    inferred.push({ kind: 'scalar', scalar: 'boolean' });
  }
  const objects = grouped.get('object') as JsonObject[] | undefined;
  if (objects) {
    inferred.push(
      inferObjectSamples(objects, context, path, suggestedName, depth),
    );
  }
  const arrays = grouped.get('array') as unknown[][] | undefined;
  if (arrays) {
    inferred.push(inferArray(arrays, context, path, suggestedName, depth));
  }
  if (
    grouped.has('undefined') ||
    grouped.has('bigint') ||
    grouped.has('symbol')
  ) {
    inferred.push({ kind: 'unknown', reason: 'conflict' });
  }

  if (inferred.length === 0) {
    return { kind: 'unknown', reason: 'null-only' };
  }

  const merged = mergeVariants(inferred);
  if (merged.kind === 'union') {
    context.diagnostics.push(
      createDiagnostic({
        severity: 'warning',
        code: 'CONFLICTING_TYPE_EVIDENCE',
        message: 'Observed values contain incompatible type evidence.',
        path,
      }),
    );
  }
  return merged;
}

export function inferJsonValue(
  value: unknown,
  options: JsonInferenceOptions = {},
): { document: ForgeDocument; decisions: InferenceDecision[] } {
  const rootName = normalizeModelName(options.rootName ?? 'Root');
  const context: InferenceContext = {
    rootName,
    maxDepth: options.maxDepth ?? 100,
    models: [],
    modelsByPath: new Map(),
    diagnostics: [],
    decisions: [],
  };
  const root = inferValues([value], context, '$', rootName, 0);
  if (value === null) {
    context.diagnostics.push(
      createDiagnostic({
        severity: 'warning',
        code: 'NULL_ONLY_UNKNOWN_TYPE',
        message: 'Root type is unknown because only null was observed.',
        path: '$',
      }),
    );
  }
  const document: ForgeDocument = {
    schemaVersion: FORGE_SCHEMA_VERSION,
    source: {
      kind: 'json',
      rootSuggestedName: rootName,
      sampleCount: Array.isArray(value) ? value.length : 1,
    },
    root,
    models: context.models,
    enums: [],
    diagnostics: context.diagnostics,
  };
  return { document, decisions: context.decisions };
}
