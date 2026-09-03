import {
  createDiagnostic,
  validateForgeDocument,
  type Diagnostic,
  type FieldDefinition,
  type ForgeDocument,
  type GenerationResult,
  type ModelDefinition,
  type TypeRef,
} from '@modelforge/core';

import type { CSharpGeneratorOptions } from './types';

const VERSION = '1.0.0';
const CSHARP_KEYWORDS = new Set([
  'abstract',
  'as',
  'base',
  'bool',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'checked',
  'class',
  'const',
  'continue',
  'decimal',
  'default',
  'delegate',
  'do',
  'double',
  'else',
  'enum',
  'event',
  'explicit',
  'extern',
  'false',
  'finally',
  'fixed',
  'float',
  'for',
  'foreach',
  'goto',
  'if',
  'implicit',
  'in',
  'int',
  'interface',
  'internal',
  'is',
  'lock',
  'long',
  'namespace',
  'new',
  'null',
  'object',
  'operator',
  'out',
  'override',
  'params',
  'private',
  'protected',
  'public',
  'readonly',
  'ref',
  'return',
  'sbyte',
  'sealed',
  'short',
  'sizeof',
  'stackalloc',
  'static',
  'string',
  'struct',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'uint',
  'ulong',
  'unchecked',
  'unsafe',
  'ushort',
  'using',
  'virtual',
  'void',
  'volatile',
  'while',
]);

interface ResolvedOptions {
  declarationStyle: 'class' | 'record';
  namespaceName: string;
  dateStyle: 'string' | 'dotnet';
  fileScopedNamespace: boolean;
}

interface RenderContext {
  document: ForgeDocument;
  options: ResolvedOptions;
  imports: Set<string>;
  diagnostics: Diagnostic[];
}

function resolve(options: CSharpGeneratorOptions): ResolvedOptions {
  return {
    declarationStyle: options.declarationStyle ?? 'class',
    namespaceName: options.namespaceName ?? 'ModelForge.Generated',
    dateStyle: options.dateStyle ?? 'string',
    fileScopedNamespace: options.fileScopedNamespace ?? true,
  };
}

function pascalCase(name: string): string {
  const normalized = name
    .replace(/[_\-\s]+(.)?/g, (_, value: string | undefined) =>
      value ? value.toUpperCase() : '',
    )
    .replace(/^[a-z]/, (value) => value.toUpperCase());
  return CSHARP_KEYWORDS.has(normalized.toLowerCase())
    ? `${normalized}Value`
    : normalized;
}

function isValueType(value: string): boolean {
  return ['long', 'double', 'bool', 'DateOnly', 'DateTimeOffset'].includes(
    value,
  );
}

function renderType(
  type: TypeRef,
  field: FieldDefinition | undefined,
  context: RenderContext,
): string {
  switch (type.kind) {
    case 'scalar':
      if (type.scalar === 'integer') return 'long';
      if (type.scalar === 'number') return 'double';
      if (type.scalar === 'boolean') return 'bool';
      if (type.scalar === 'string' && context.options.dateStyle === 'dotnet') {
        if (field?.semanticHints.some((hint) => hint.kind === 'date'))
          return 'DateOnly';
        if (field?.semanticHints.some((hint) => hint.kind === 'datetime'))
          return 'DateTimeOffset';
      }
      return type.scalar === 'null-evidence' ? 'object' : 'string';
    case 'model':
      return (
        context.document.models.find((model) => model.id === type.modelId)
          ?.targetName ?? 'object'
      );
    case 'array': {
      context.imports.add('System.Collections.Generic');
      let element = renderType(type.element, field, context);
      if (type.elementNullable && !element.endsWith('?')) element += '?';
      return `List<${element}>`;
    }
    case 'unknown':
      return 'object';
    case 'union':
      context.diagnostics.push(
        createDiagnostic({
          severity: 'warning',
          code: 'CSHARP_UNION_MAPPED_TO_OBJECT',
          message:
            'C# cannot represent this JSON union directly; it was mapped to object.',
          fieldId: field?.id,
        }),
      );
      return 'object';
  }
}

function renderProperty(
  field: FieldDefinition,
  context: RenderContext,
): string[] {
  const name = pascalCase(field.targetName);
  let type = renderType(field.type, field, context);
  const optional = !field.required || field.nullable;
  if (optional && !type.endsWith('?')) type += '?';
  const alias = name !== field.sourceName;
  const lines: string[] = [];
  if (alias) {
    context.imports.add('System.Text.Json.Serialization');
    lines.push(`    [JsonPropertyName("${field.sourceName}")]`);
  }
  const initializer = optional
    ? ''
    : type === 'string'
      ? ' = string.Empty;'
      : type.startsWith('List<')
        ? ' = new();'
        : isValueType(type)
          ? ''
          : ' = null!;';
  lines.push(`    public ${type} ${name} { get; init; }${initializer}`);
  return lines;
}

function renderModel(
  model: ModelDefinition,
  document: ForgeDocument,
  options: ResolvedOptions,
  diagnostics: Diagnostic[],
): string {
  const context: RenderContext = {
    document,
    options,
    imports: new Set(),
    diagnostics,
  };
  const properties = model.fields.flatMap((field, index) => [
    ...(index ? [''] : []),
    ...renderProperty(field, context),
  ]);
  const imports = [...context.imports].sort().map((value) => `using ${value};`);
  const declaration = `public sealed ${options.declarationStyle} ${model.targetName}`;
  if (options.fileScopedNamespace) {
    return [
      '#nullable enable',
      ...(imports.length ? ['', ...imports] : []),
      '',
      `namespace ${options.namespaceName};`,
      '',
      declaration,
      '{',
      ...properties,
      '}',
      '',
    ].join('\n');
  }
  return [
    '#nullable enable',
    ...(imports.length ? ['', ...imports] : []),
    '',
    `namespace ${options.namespaceName}`,
    '{',
    `    ${declaration}`,
    '    {',
    ...properties.map((line) => (line ? `    ${line}` : line)),
    '    }',
    '}',
    '',
  ].join('\n');
}

export function generateCSharp(
  document: ForgeDocument,
  input: CSharpGeneratorOptions = {},
): GenerationResult {
  const options = resolve(input);
  const validation = validateForgeDocument(document);
  const namespaceValid = /^(?:[A-Za-z_]\w*)(?:\.(?:[A-Za-z_]\w*))*$/u.test(
    options.namespaceName,
  );
  const diagnostics = [...validation.diagnostics];
  if (!namespaceValid)
    diagnostics.push(
      createDiagnostic({
        severity: 'error',
        code: 'INVALID_CSHARP_NAMESPACE',
        message: `Invalid C# namespace: ${options.namespaceName}.`,
      }),
    );
  const fatal = !validation.valid || !namespaceValid;
  const metadata = {
    generator: '@modelforge/generator-csharp',
    generatorVersion: VERSION,
    target: `csharp-${options.declarationStyle}`,
    verified: false,
  };
  if (fatal) return { files: [], diagnostics, metadata };
  if (document.models.length === 0) {
    return {
      files: [],
      diagnostics: [
        createDiagnostic({
          severity: 'error',
          code: 'NO_CSHARP_MODELS',
          message: 'C# generation requires at least one object model.',
        }),
      ],
      metadata,
    };
  }
  return {
    files: document.models.map((model) => ({
      path: `${model.targetName}.cs`,
      language: 'csharp',
      content: renderModel(model, document, options, diagnostics),
    })),
    diagnostics,
    metadata,
  };
}
