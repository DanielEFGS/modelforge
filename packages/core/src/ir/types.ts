export const FORGE_SCHEMA_VERSION = '1' as const;

export type ForgeSchemaVersion = typeof FORGE_SCHEMA_VERSION;

export interface ForgeDocument {
  schemaVersion: ForgeSchemaVersion;
  source: SourceMetadata;
  root: TypeRef;
  models: ModelDefinition[];
  enums: EnumDefinition[];
  diagnostics: Diagnostic[];
}

export interface SourceMetadata {
  kind: 'json';
  rootSuggestedName: string;
  sampleCount: number;
}

export type TypeRef =
  ScalarTypeRef | ModelTypeRef | ArrayTypeRef | UnionTypeRef | UnknownTypeRef;

export type ScalarName =
  'string' | 'integer' | 'number' | 'boolean' | 'null-evidence';

export interface ScalarTypeRef {
  kind: 'scalar';
  scalar: ScalarName;
}

export interface ModelTypeRef {
  kind: 'model';
  modelId: string;
}

export interface ArrayTypeRef {
  kind: 'array';
  element: TypeRef;
  evidenceCount: number;
  elementNullable?: boolean;
}

export interface UnionTypeRef {
  kind: 'union';
  variants: TypeRef[];
}

export interface UnknownTypeRef {
  kind: 'unknown';
  reason: 'empty-array' | 'null-only' | 'no-evidence' | 'conflict';
}

export interface ModelDefinition {
  id: string;
  sourceName?: string;
  targetName: string;
  suggestedName: string;
  fields: FieldDefinition[];
  path: string;
}

export interface EnumDefinition {
  id: string;
  targetName: string;
  values: string[];
}

export interface FieldDefinition {
  id: string;
  sourceName: string;
  targetName: string;
  suggestedName: string;
  type: TypeRef;
  required: boolean;
  nullable: boolean;
  semanticHints: SemanticHint[];
  evidence: EvidenceSummary;
  constraints: FieldConstraints;
}

export type SemanticHintKind = 'datetime' | 'date' | 'email' | 'url' | 'uuid';

export interface SemanticHint {
  kind: SemanticHintKind;
  confidence: number;
}

export interface EvidenceSummary {
  observedCount: number;
  missingCount: number;
  nullCount: number;
  examples: PrimitiveExample[];
}

export type PrimitiveExample =
  | { kind: 'string'; category?: SemanticHintKind }
  | { kind: 'integer' }
  | { kind: 'number' }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'null' };

export interface FieldConstraints {
  minLength?: number;
  maxLength?: number;
  numericIntegerOnly?: boolean;
}

export type DiagnosticSeverity = 'info' | 'warning' | 'error';

export interface Diagnostic {
  id: string;
  severity: DiagnosticSeverity;
  code: string;
  message: string;
  path?: string;
  fieldId?: string;
  modelId?: string;
  location?: SourceLocation;
}

export interface SourceLocation {
  line: number;
  column: number;
  offset?: number;
}

export interface GeneratedFile {
  path: string;
  language: string;
  content: string;
}

export interface GenerationMetadata {
  generator: string;
  generatorVersion: string;
  target: string;
  verified: boolean;
  profileId?: string;
}

export interface GenerationResult {
  files: GeneratedFile[];
  diagnostics: Diagnostic[];
  metadata: GenerationMetadata;
}
