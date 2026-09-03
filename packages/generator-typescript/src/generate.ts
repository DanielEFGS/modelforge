import {
  createDiagnostic,
  validateForgeDocument,
  type FieldDefinition,
  type ForgeDocument,
  type GenerationResult,
  type ModelDefinition,
  type TypeRef,
} from '@modelforge/core';

import type {
  ResolvedTypeScriptGeneratorOptions,
  TypeScriptGeneratorOptions,
} from './types';

const GENERATOR_VERSION = '1.0.0';

function resolveOptions(
  options: TypeScriptGeneratorOptions,
): ResolvedTypeScriptGeneratorOptions {
  return {
    declarationStyle: options.declarationStyle ?? 'interface',
    readonly: options.readonly ?? false,
    semicolons: options.semicolons ?? true,
    optionalStyle: options.optionalStyle ?? 'question-mark',
    nullableStyle: options.nullableStyle ?? 'null',
    dateStyle: options.dateStyle ?? 'string',
    arrayStyle: options.arrayStyle ?? 'brackets',
    includeConstructor: options.includeConstructor ?? true,
    fileName: options.fileName ?? 'models.ts',
  };
}

function dependencyOrder(document: ForgeDocument): ModelDefinition[] {
  const byId = new Map(document.models.map((model) => [model.id, model]));
  const permanent = new Set<string>();
  const visiting = new Set<string>();
  const ordered: ModelDefinition[] = [];

  function referencedIds(type: TypeRef): string[] {
    if (type.kind === 'model') return [type.modelId];
    if (type.kind === 'array') return referencedIds(type.element);
    if (type.kind === 'union') return type.variants.flatMap(referencedIds);
    return [];
  }

  function visit(model: ModelDefinition): void {
    if (permanent.has(model.id) || visiting.has(model.id)) return;
    visiting.add(model.id);
    for (const field of model.fields) {
      for (const id of referencedIds(field.type)) {
        const dependency = byId.get(id);
        if (dependency) visit(dependency);
      }
    }
    visiting.delete(model.id);
    permanent.add(model.id);
    ordered.push(model);
  }

  for (const model of document.models) visit(model);
  return ordered;
}

function wrapForArray(value: string): string {
  return value.includes(' | ') ? `(${value})` : value;
}

function renderType(
  type: TypeRef,
  document: ForgeDocument,
  options: ResolvedTypeScriptGeneratorOptions,
  field?: FieldDefinition,
): string {
  switch (type.kind) {
    case 'scalar':
      if (
        type.scalar === 'string' &&
        options.dateStyle === 'Date' &&
        field?.semanticHints.some(
          (hint) => hint.kind === 'date' || hint.kind === 'datetime',
        )
      )
        return 'Date';
      if (type.scalar === 'integer' || type.scalar === 'number')
        return 'number';
      if (type.scalar === 'boolean') return 'boolean';
      if (type.scalar === 'null-evidence') return 'null';
      return 'string';
    case 'model':
      return (
        document.models.find((model) => model.id === type.modelId)
          ?.targetName ?? 'unknown'
      );
    case 'unknown':
      return 'unknown';
    case 'union':
      return [
        ...new Set(
          type.variants.map((variant) =>
            renderType(variant, document, options, field),
          ),
        ),
      ].join(' | ');
    case 'array': {
      let element = renderType(type.element, document, options, field);
      if (type.elementNullable)
        element = `${element} | ${options.nullableStyle}`;
      return options.arrayStyle === 'generic'
        ? `Array<${element}>`
        : `${wrapForArray(element)}[]`;
    }
  }
}

function renderFieldType(
  field: FieldDefinition,
  document: ForgeDocument,
  options: ResolvedTypeScriptGeneratorOptions,
): string {
  let rendered = renderType(field.type, document, options, field);
  const additions: string[] = [];
  if (field.nullable) additions.push(options.nullableStyle);
  if (!field.required && options.optionalStyle === 'undefined-union')
    additions.push('undefined');
  for (const addition of additions) {
    if (!rendered.split(' | ').includes(addition)) rendered += ` | ${addition}`;
  }
  return rendered;
}

function propertyLine(
  field: FieldDefinition,
  document: ForgeDocument,
  options: ResolvedTypeScriptGeneratorOptions,
  forClass = false,
): string {
  const readonly = options.readonly ? 'readonly ' : '';
  const optional =
    !field.required && options.optionalStyle === 'question-mark' ? '?' : '';
  const terminator = options.semicolons ? ';' : '';
  const definite =
    forClass && optional === '' && !options.includeConstructor ? '!' : '';
  return `  ${readonly}${field.targetName}${optional}${definite}: ${renderFieldType(field, document, options)}${terminator}`;
}

function renderModel(
  model: ModelDefinition,
  document: ForgeDocument,
  options: ResolvedTypeScriptGeneratorOptions,
): string {
  const fields = model.fields.map((item) =>
    propertyLine(item, document, options, options.declarationStyle === 'class'),
  );
  if (options.declarationStyle === 'interface') {
    return [`export interface ${model.targetName} {`, ...fields, '}'].join(
      '\n',
    );
  }
  if (options.declarationStyle === 'type') {
    return [
      `export type ${model.targetName} = {`,
      ...fields,
      options.semicolons ? '};' : '}',
    ].join('\n');
  }
  if (!options.includeConstructor || model.fields.length === 0) {
    return [`export class ${model.targetName} {`, ...fields, '}'].join('\n');
  }
  const constructorFields = [
    ...model.fields.filter((item) => item.required),
    ...model.fields.filter((item) => !item.required),
  ];
  const parameters = constructorFields.map((item) => {
    const optional =
      !item.required && options.optionalStyle === 'question-mark' ? '?' : '';
    return `${item.targetName}${optional}: ${renderFieldType(item, document, options)}`;
  });
  const assignments = constructorFields.map(
    (item) =>
      `    this.${item.targetName} = ${item.targetName}${options.semicolons ? ';' : ''}`,
  );
  return [
    `export class ${model.targetName} {`,
    ...fields,
    '',
    `  constructor(${parameters.join(', ')}) {`,
    ...assignments,
    '  }',
    '}',
  ].join('\n');
}

export function generateTypeScript(
  document: ForgeDocument,
  inputOptions: TypeScriptGeneratorOptions = {},
): GenerationResult {
  const options = resolveOptions(inputOptions);
  const validation = validateForgeDocument(document);
  const metadata = {
    generator: '@modelforge/generator-typescript',
    generatorVersion: GENERATOR_VERSION,
    target: `typescript-${options.declarationStyle}`,
    verified: validation.valid,
  };
  if (!validation.valid)
    return { files: [], diagnostics: validation.diagnostics, metadata };

  const models = dependencyOrder(document);
  const sections = models.map((model) => renderModel(model, document, options));
  const rootModelId =
    document.root.kind === 'model' ? document.root.modelId : undefined;
  const rootIsDeclaredModel =
    rootModelId !== undefined &&
    models.some((model) => model.id === rootModelId);
  if (!rootIsDeclaredModel) {
    sections.push(
      `export type ${document.source.rootSuggestedName} = ${renderType(document.root, document, options)}${options.semicolons ? ';' : ''}`,
    );
  }
  if (sections.length === 0) {
    return {
      files: [],
      diagnostics: [
        createDiagnostic({
          severity: 'error',
          code: 'NO_TYPESCRIPT_OUTPUT',
          message: 'The IR contains no root type or models to generate.',
        }),
      ],
      metadata: { ...metadata, verified: false },
    };
  }
  return {
    files: [
      {
        path: options.fileName,
        language: 'typescript',
        content: `${sections.join('\n\n')}\n`,
      },
    ],
    diagnostics: [],
    metadata,
  };
}
