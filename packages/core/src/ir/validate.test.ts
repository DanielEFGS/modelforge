import { describe, expect, it } from 'vitest';

import type {
  FieldDefinition,
  ForgeDocument,
  ModelDefinition,
  TypeRef,
} from './types';
import { FORGE_SCHEMA_VERSION } from './types';
import { validateForgeDocument } from './validate';

function field(
  id: string,
  sourceName: string,
  type: TypeRef,
  options: Partial<Pick<FieldDefinition, 'required' | 'nullable'>> = {},
): FieldDefinition {
  return {
    id,
    sourceName,
    suggestedName: sourceName,
    targetName: sourceName,
    type,
    required: options.required ?? true,
    nullable: options.nullable ?? false,
    semanticHints: [],
    evidence: {
      observedCount: 1,
      missingCount: options.required === false ? 1 : 0,
      nullCount: options.nullable ? 1 : 0,
      examples: [],
    },
    constraints: {},
  };
}

function document(
  root: TypeRef,
  models: ModelDefinition[] = [],
): ForgeDocument {
  return {
    schemaVersion: FORGE_SCHEMA_VERSION,
    source: { kind: 'json', rootSuggestedName: 'Root', sampleCount: 1 },
    root,
    models,
    enums: [],
    diagnostics: [],
  };
}

describe('Universal Model IR representation', () => {
  it.each([
    ['scalar', { kind: 'scalar', scalar: 'string' } satisfies TypeRef],
    [
      'root array',
      {
        kind: 'array',
        element: { kind: 'scalar', scalar: 'integer' },
        evidenceCount: 3,
      } satisfies TypeRef,
    ],
    ['null only', { kind: 'unknown', reason: 'null-only' } satisfies TypeRef],
    [
      'empty array',
      {
        kind: 'array',
        element: { kind: 'unknown', reason: 'empty-array' },
        evidenceCount: 0,
      } satisfies TypeRef,
    ],
    [
      'heterogeneous array',
      {
        kind: 'array',
        element: {
          kind: 'union',
          variants: [
            { kind: 'scalar', scalar: 'integer' },
            { kind: 'scalar', scalar: 'string' },
          ],
        },
        evidenceCount: 2,
      } satisfies TypeRef,
    ],
  ])('represents %s roots', (_name, root) => {
    expect(validateForgeDocument(document(root)).valid).toBe(true);
  });

  it('represents nested objects with independent required and nullable flags', () => {
    const address: ModelDefinition = {
      id: 'model_address',
      sourceName: 'address',
      suggestedName: 'Address',
      targetName: 'Address',
      path: '$.user.address',
      fields: [
        field('field_city', 'city', { kind: 'scalar', scalar: 'string' }),
      ],
    };
    const root: ModelDefinition = {
      id: 'model_root',
      suggestedName: 'Root',
      targetName: 'Root',
      path: '$',
      fields: [
        field(
          'field_middle_name',
          'middleName',
          { kind: 'unknown', reason: 'null-only' },
          { required: false, nullable: true },
        ),
        field('field_address', 'address', {
          kind: 'model',
          modelId: address.id,
        }),
      ],
    };

    const result = validateForgeDocument(
      document({ kind: 'model', modelId: root.id }, [root, address]),
    );
    expect(result).toEqual({ valid: true, diagnostics: [] });
  });

  it('reports duplicate IDs and unresolved model references deterministically', () => {
    const root: ModelDefinition = {
      id: 'duplicate',
      suggestedName: 'Root',
      targetName: 'Root',
      path: '$',
      fields: [
        field('same-field', 'child', {
          kind: 'model',
          modelId: 'missing',
        }),
      ],
    };
    const duplicate: ModelDefinition = {
      ...root,
      path: '$.duplicate',
      fields: [
        field('same-field', 'value', { kind: 'scalar', scalar: 'string' }),
      ],
    };

    const first = validateForgeDocument(
      document({ kind: 'model', modelId: root.id }, [root, duplicate]),
    );
    const second = validateForgeDocument(
      document({ kind: 'model', modelId: root.id }, [root, duplicate]),
    );

    expect(first.valid).toBe(false);
    expect(first.diagnostics.map(({ code }) => code)).toEqual([
      'DUPLICATE_MODEL_ID',
      'DUPLICATE_FIELD_ID',
      'UNRESOLVED_MODEL_REFERENCE',
    ]);
    expect(second).toEqual(first);
  });
});
