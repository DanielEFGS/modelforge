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

import type { PythonGeneratorOptions } from './types';

const VERSION = '1.0.0';
const PYTHON_KEYWORDS = new Set([
  'False',
  'None',
  'True',
  'and',
  'as',
  'assert',
  'async',
  'await',
  'break',
  'class',
  'continue',
  'def',
  'del',
  'elif',
  'else',
  'except',
  'finally',
  'for',
  'from',
  'global',
  'if',
  'import',
  'in',
  'is',
  'lambda',
  'nonlocal',
  'not',
  'or',
  'pass',
  'raise',
  'return',
  'try',
  'while',
  'with',
  'yield',
]);

interface ResolvedOptions {
  modelStyle: 'dataclass' | 'pydantic';
  dateStyle: 'string' | 'datetime';
  fileName: string;
  pydanticStrict: boolean;
}

interface RenderContext {
  document: ForgeDocument;
  options: ResolvedOptions;
  imports: Set<string>;
  diagnostics: Diagnostic[];
}

function resolve(options: PythonGeneratorOptions): ResolvedOptions {
  return {
    modelStyle: options.modelStyle ?? 'dataclass',
    dateStyle: options.dateStyle ?? 'string',
    fileName: options.fileName ?? 'models.py',
    pydanticStrict: options.pydanticStrict ?? false,
  };
}

function pythonName(name: string): string {
  return PYTHON_KEYWORDS.has(name) ? `${name}_` : name;
}

function renderType(
  type: TypeRef,
  field: FieldDefinition | undefined,
  context: RenderContext,
): string {
  switch (type.kind) {
    case 'scalar':
      if (type.scalar === 'integer') return 'int';
      if (type.scalar === 'number') return 'float';
      if (type.scalar === 'boolean') return 'bool';
      if (
        type.scalar === 'string' &&
        context.options.dateStyle === 'datetime'
      ) {
        if (field?.semanticHints.some((hint) => hint.kind === 'date')) {
          context.imports.add('from datetime import date');
          return 'date';
        }
        if (field?.semanticHints.some((hint) => hint.kind === 'datetime')) {
          context.imports.add('from datetime import datetime');
          return 'datetime';
        }
      }
      if (type.scalar === 'null-evidence') {
        context.imports.add('from typing import Any');
        return 'Any';
      }
      return 'str';
    case 'model': {
      const model = context.document.models.find(
        (candidate) => candidate.id === type.modelId,
      );
      if (!model) context.imports.add('from typing import Any');
      return model?.targetName ?? 'Any';
    }
    case 'array': {
      let element = renderType(type.element, field, context);
      if (type.elementNullable && !element.includes('None'))
        element = `${element} | None`;
      return `list[${element}]`;
    }
    case 'unknown':
      context.imports.add('from typing import Any');
      return 'Any';
    case 'union': {
      const variants = [
        ...new Set(
          type.variants.map((variant) => renderType(variant, field, context)),
        ),
      ];
      if (variants.length > 4) {
        context.imports.add('from typing import Any');
        context.diagnostics.push(
          createDiagnostic({
            severity: 'warning',
            code: 'PYTHON_COMPLEX_UNION_MAPPED_TO_ANY',
            message:
              'The Python union contained more than four variants and was mapped to Any.',
            fieldId: field?.id,
          }),
        );
        return 'Any';
      }
      return variants.join(' | ');
    }
  }
}

function fieldType(field: FieldDefinition, context: RenderContext): string {
  let value = renderType(field.type, field, context);
  if ((!field.required || field.nullable) && !value.includes('None'))
    value += ' | None';
  return value;
}

function renderDataclassField(
  field: FieldDefinition,
  context: RenderContext,
): string {
  const name = pythonName(field.targetName);
  const alias = name !== field.sourceName;
  if (alias) context.imports.add('from dataclasses import field');
  const metadata = alias ? `metadata={"json_name": "${field.sourceName}"}` : '';
  const optional = !field.required;
  const assignment = optional
    ? alias
      ? ` = field(default=None, ${metadata})`
      : ' = None'
    : alias
      ? ` = field(${metadata})`
      : '';
  return `    ${name}: ${fieldType(field, context)}${assignment}`;
}

function renderPydanticField(
  field: FieldDefinition,
  context: RenderContext,
): string {
  const name = pythonName(field.targetName);
  const alias = name !== field.sourceName;
  if (alias) context.imports.add('from pydantic import Field');
  const defaultValue = field.required ? '...' : 'None';
  const assignment = alias
    ? ` = Field(${defaultValue}, alias="${field.sourceName}")`
    : field.required
      ? ''
      : ' = None';
  return `    ${name}: ${fieldType(field, context)}${assignment}`;
}

function renderModel(model: ModelDefinition, context: RenderContext): string {
  const ordered = [
    ...model.fields.filter((field) => field.required),
    ...model.fields.filter((field) => !field.required),
  ];
  if (context.options.modelStyle === 'dataclass') {
    context.imports.add('from dataclasses import dataclass');
    const fields = ordered.map((field) => renderDataclassField(field, context));
    return [
      '@dataclass(slots=True)',
      `class ${model.targetName}:`,
      ...(fields.length ? fields : ['    pass']),
    ].join('\n');
  }

  context.imports.add('from pydantic import BaseModel');
  const aliases = ordered.some(
    (field) => pythonName(field.targetName) !== field.sourceName,
  );
  if (aliases || context.options.pydanticStrict)
    context.imports.add('from pydantic import ConfigDict');
  const fields = ordered.map((field) => renderPydanticField(field, context));
  const config =
    aliases || context.options.pydanticStrict
      ? [
          `    model_config = ConfigDict(populate_by_name=True${context.options.pydanticStrict ? ', strict=True' : ''})`,
          ...(fields.length ? [''] : []),
        ]
      : [];
  return [
    `class ${model.targetName}(BaseModel):`,
    ...config,
    ...(fields.length ? fields : ['    pass']),
  ].join('\n');
}

export function generatePython(
  document: ForgeDocument,
  input: PythonGeneratorOptions = {},
): GenerationResult {
  const options = resolve(input);
  const validation = validateForgeDocument(document);
  const diagnostics = [...validation.diagnostics];
  const metadata = {
    generator: '@modelforge/generator-python',
    generatorVersion: VERSION,
    target: `python-${options.modelStyle}`,
    verified: validation.valid && options.modelStyle === 'dataclass',
  };
  if (!validation.valid)
    return {
      files: [],
      diagnostics,
      metadata: { ...metadata, verified: false },
    };
  if (document.models.length === 0) {
    return {
      files: [],
      diagnostics: [
        createDiagnostic({
          severity: 'error',
          code: 'NO_PYTHON_MODELS',
          message: 'Python generation requires at least one object model.',
        }),
      ],
      metadata: { ...metadata, verified: false },
    };
  }

  const context: RenderContext = {
    document,
    options,
    imports: new Set(),
    diagnostics,
  };
  const sections = document.models.map((model) => renderModel(model, context));
  const imports = [...context.imports].sort();
  return {
    files: [
      {
        path: options.fileName,
        language: 'python',
        content: [
          'from __future__ import annotations',
          '',
          ...imports,
          '',
          ...sections.flatMap((section, index) =>
            index ? ['', section] : [section],
          ),
          '',
        ].join('\n'),
      },
    ],
    diagnostics,
    metadata,
  };
}
