# Universal Model IR Specification

## Purpose

The Universal Model IR is ModelForge's central contract between source parsers and target generators.

It must be:
- source-language agnostic,
- target-language agnostic,
- serializable,
- deterministic,
- versioned,
- explainable,
- extensible to future schema/database relations.

## Design rule

No target-specific concepts such as `Java Long`, `TypeScript interface`, `@Entity`, `Zod` or `Spring Repository` may appear in the core IR.

## Top-level structure

Suggested TypeScript shape:

```ts
export interface ForgeDocument {
  schemaVersion: '1';
  source: SourceMetadata;
  root: TypeRef;
  models: ModelDefinition[];
  enums: EnumDefinition[];
  diagnostics: Diagnostic[];
}
```

### SourceMetadata

```ts
interface SourceMetadata {
  kind: 'json';
  rootSuggestedName: string;
  sampleCount: number;
}
```

Do not store the raw JSON inside the IR by default.

## Type system

```ts
type TypeRef =
  | ScalarTypeRef
  | ModelTypeRef
  | ArrayTypeRef
  | UnionTypeRef
  | UnknownTypeRef;
```

### Scalar types

Canonical semantic scalars:
- string
- integer
- number
- boolean
- null-evidence

Date/email/url/uuid are **semantic hints** on strings in v1, not distinct irreversible scalar types.

Reason: JSON has no native date/email/UUID type.

### Model reference

```ts
interface ModelTypeRef {
  kind: 'model';
  modelId: string;
}
```

### Array

```ts
interface ArrayTypeRef {
  kind: 'array';
  element: TypeRef;
  evidenceCount: number;
}
```

### Union

Unions are needed to describe conflicting evidence without silently discarding it.

```ts
interface UnionTypeRef {
  kind: 'union';
  variants: TypeRef[];
}
```

Generators decide how to map unsupported unions and must emit diagnostics instead of guessing.

### Unknown

```ts
interface UnknownTypeRef {
  kind: 'unknown';
  reason: 'empty-array' | 'null-only' | 'no-evidence' | 'conflict';
}
```

## Models

```ts
interface ModelDefinition {
  id: string;
  sourceName?: string;
  targetName: string;
  suggestedName: string;
  fields: FieldDefinition[];
  path: string;
}
```

### Fields

```ts
interface FieldDefinition {
  id: string;
  sourceName: string;
  targetName: string;
  type: TypeRef;
  required: boolean;
  nullable: boolean;
  semanticHints: SemanticHint[];
  evidence: EvidenceSummary;
  constraints: FieldConstraints;
}
```

### Semantic hints

```ts
type SemanticHint =
  | { kind: 'datetime'; confidence: number }
  | { kind: 'date'; confidence: number }
  | { kind: 'email'; confidence: number }
  | { kind: 'url'; confidence: number }
  | { kind: 'uuid'; confidence: number };
```

Hints may influence optional generator settings but should never silently rewrite user intent.

## Evidence

```ts
interface EvidenceSummary {
  observedCount: number;
  missingCount: number;
  nullCount: number;
  examples: PrimitiveExample[];
}
```

Store only small non-sensitive primitive examples internally if required for the current browser session. Do not send them to telemetry and do not persist by default.

For maximum privacy, examples may be represented by categories rather than raw values where feasible.

## Constraints

V1:

```ts
interface FieldConstraints {
  minLength?: number;
  maxLength?: number;
  numericIntegerOnly?: boolean;
}
```

Do not pretend these are schema guarantees when inferred from one example. Prefer diagnostics/hints unless multiple samples establish meaningful evidence.

Future extensions:
- database PK/FK,
- unique,
- database default,
- enum constraints,
- relation cardinality.

## Diagnostics

```ts
interface Diagnostic {
  id: string;
  severity: 'info' | 'warning' | 'error';
  code: string;
  message: string;
  path?: string;
  fieldId?: string;
  modelId?: string;
}
```

Example codes:
- `EMPTY_ARRAY_UNKNOWN_ELEMENT`
- `NULL_ONLY_UNKNOWN_TYPE`
- `HETEROGENEOUS_ARRAY`
- `PROPERTY_NAME_NORMALIZED`
- `PROPERTY_NAME_COLLISION`
- `ROOT_MODEL_NAME_REQUIRED`
- `UNSUPPORTED_TARGET_UNION`

## Stable IDs

IDs must be deterministic from logical source path + kind, not random UUIDs, so editing/re-rendering does not churn identity.

Do not use target names alone because users may rename them.

## Naming

Separate:
- source name: exact key from input,
- suggested name: normalized default,
- target name: user-editable generated identifier.

Example:

```text
sourceName: "user-name"
suggestedName: "userName"
targetName: "username"
```

## Root handling

### Root object
Create a model using user-selected/suggested root name, default `Root` until the user chooses or a landing preset supplies a better name.

### Root array of objects
Infer element model; root type is array reference.

### Root primitive
Allow it, but many class/model generators should explain that no object model exists.

## Future relations

Reserve a future relation layer rather than overloading ordinary fields:

```ts
interface RelationDefinition {
  id: string;
  fromModelId: string;
  toModelId: string;
  kind: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
  sourceFieldId?: string;
  metadata?: Record<string, unknown>;
}
```

Do not implement this until SQL/schema sources require it.

## IR invariants

1. Every model ID is unique.
2. Every field ID is unique within the document.
3. Every model reference resolves.
4. `required` and `nullable` are independent.
5. Source names are never overwritten by normalization.
6. No framework annotation exists in IR.
7. Diagnostics are reproducible for the same input/config.
8. `schemaVersion` changes only when the serialized contract changes incompatibly.
