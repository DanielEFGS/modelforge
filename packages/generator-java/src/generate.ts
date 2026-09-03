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

import type { JavaGeneratorOptions } from './types';

const JAVA_KEYWORDS = new Set([
  'abstract',
  'assert',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'default',
  'do',
  'double',
  'else',
  'enum',
  'extends',
  'final',
  'finally',
  'float',
  'for',
  'goto',
  'if',
  'implements',
  'import',
  'instanceof',
  'int',
  'interface',
  'long',
  'native',
  'new',
  'package',
  'private',
  'protected',
  'public',
  'record',
  'return',
  'short',
  'static',
  'strictfp',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'try',
  'void',
  'volatile',
  'while',
  'var',
  'yield',
]);
const VERSION = '1.0.0';

type Resolved = Required<JavaGeneratorOptions>;
interface RenderContext {
  document: ForgeDocument;
  options: Resolved;
  imports: Set<string>;
  diagnostics: Diagnostic[];
}

function resolve(options: JavaGeneratorOptions): Resolved {
  return {
    target: options.target ?? 'pojo',
    packageName: options.packageName ?? 'com.example.demo',
    dateStyle: options.dateStyle ?? 'string',
    noArgsConstructor: options.noArgsConstructor ?? true,
    allArgsConstructor: options.allArgsConstructor ?? true,
    getters: options.getters ?? true,
    setters: options.setters ?? true,
    equalsHashCode: options.equalsHashCode ?? false,
    includeToString: options.includeToString ?? false,
    builder: options.builder ?? false,
  };
}

function javaName(name: string): string {
  return JAVA_KEYWORDS.has(name) ? `${name}Value` : name;
}
function upper(name: string): string {
  return name[0]!.toUpperCase() + name.slice(1);
}

function javaType(
  type: TypeRef,
  field: FieldDefinition | undefined,
  context: RenderContext,
): string {
  switch (type.kind) {
    case 'scalar':
      if (type.scalar === 'integer') return 'Long';
      if (type.scalar === 'number') return 'Double';
      if (type.scalar === 'boolean') return 'Boolean';
      if (
        type.scalar === 'string' &&
        context.options.dateStyle === 'java-time'
      ) {
        if (field?.semanticHints.some((hint) => hint.kind === 'date')) {
          context.imports.add('java.time.LocalDate');
          return 'LocalDate';
        }
        if (field?.semanticHints.some((hint) => hint.kind === 'datetime')) {
          context.imports.add('java.time.OffsetDateTime');
          return 'OffsetDateTime';
        }
      }
      return type.scalar === 'null-evidence' ? 'Object' : 'String';
    case 'model':
      return (
        context.document.models.find((model) => model.id === type.modelId)
          ?.targetName ?? 'Object'
      );
    case 'array':
      context.imports.add('java.util.List');
      return `List<${javaType(type.element, field, context)}>`;
    case 'unknown':
      return 'Object';
    case 'union':
      context.diagnostics.push(
        createDiagnostic({
          severity: 'warning',
          code: 'JAVA_UNION_MAPPED_TO_OBJECT',
          message:
            'Java cannot represent this union directly; it was mapped to Object.',
          fieldId: field?.id,
        }),
      );
      return 'Object';
  }
}

function header(packageName: string, imports: Set<string>): string[] {
  const lines = [`package ${packageName};`];
  const sorted = [...imports].sort();
  if (sorted.length)
    lines.push('', ...sorted.map((value) => `import ${value};`));
  return [...lines, ''];
}

function renderRecord(model: ModelDefinition, context: RenderContext): string {
  const fields = model.fields.map(
    (field) =>
      `    ${javaType(field.type, field, context)} ${javaName(field.targetName)}`,
  );
  return [
    ...header(context.options.packageName, context.imports),
    `public record ${model.targetName}(`,
    fields.join(',\n'),
    ') {}',
    '',
  ].join('\n');
}

function renderLombok(model: ModelDefinition, context: RenderContext): string {
  const annotations: string[] = [];
  const mapping: Array<[boolean, string, string]> = [
    [context.options.getters, 'lombok.Getter', '@Getter'],
    [context.options.setters, 'lombok.Setter', '@Setter'],
    [
      context.options.noArgsConstructor,
      'lombok.NoArgsConstructor',
      '@NoArgsConstructor',
    ],
    [
      context.options.allArgsConstructor,
      'lombok.AllArgsConstructor',
      '@AllArgsConstructor',
    ],
    [context.options.builder, 'lombok.Builder', '@Builder'],
    [
      context.options.equalsHashCode,
      'lombok.EqualsAndHashCode',
      '@EqualsAndHashCode',
    ],
    [context.options.includeToString, 'lombok.ToString', '@ToString'],
  ];
  for (const [enabled, imported, annotation] of mapping)
    if (enabled) {
      context.imports.add(imported);
      annotations.push(annotation);
    }
  const fields = model.fields.map(
    (field) =>
      `    private ${javaType(field.type, field, context)} ${javaName(field.targetName)};`,
  );
  return [
    ...header(context.options.packageName, context.imports),
    ...annotations,
    `public class ${model.targetName} {`,
    ...fields,
    '}',
    '',
  ].join('\n');
}

function renderPojo(model: ModelDefinition, context: RenderContext): string {
  const typed = model.fields.map((field) => ({
    field,
    name: javaName(field.targetName),
    type: javaType(field.type, field, context),
  }));
  if (context.options.equalsHashCode) context.imports.add('java.util.Objects');
  const body: string[] = typed.map(
    ({ name, type }) => `    private ${type} ${name};`,
  );
  if (context.options.noArgsConstructor)
    body.push('', `    public ${model.targetName}() {}`, '');
  if (context.options.allArgsConstructor && typed.length) {
    body.push(
      `    public ${model.targetName}(${typed.map(({ name, type }) => `${type} ${name}`).join(', ')}) {`,
      ...typed.map(({ name }) => `        this.${name} = ${name};`),
      '    }',
      '',
    );
  }
  for (const { name, type } of typed) {
    const cap = upper(name);
    if (context.options.getters)
      body.push(
        `    public ${type} get${cap}() {`,
        `        return ${name};`,
        '    }',
        '',
      );
    if (context.options.setters)
      body.push(
        `    public void set${cap}(${type} ${name}) {`,
        `        this.${name} = ${name};`,
        '    }',
        '',
      );
  }
  if (context.options.equalsHashCode)
    body.push(
      '    @Override',
      '    public boolean equals(Object object) {',
      '        if (this == object) return true;',
      `        if (!(object instanceof ${model.targetName} other)) return false;`,
      `        return ${typed.map(({ name }) => `Objects.equals(${name}, other.${name})`).join(' && ') || 'true'};`,
      '    }',
      '',
      '    @Override',
      '    public int hashCode() {',
      `        return Objects.hash(${typed.map(({ name }) => name).join(', ')});`,
      '    }',
      '',
    );
  if (context.options.includeToString) {
    const details = typed.length
      ? ` + ${typed.map(({ name }, index) => `"${index ? ', ' : ''}${name}=" + ${name}`).join(' + ')}`
      : '';
    body.push(
      '    @Override',
      '    public String toString() {',
      `        return "${model.targetName}{"${details} + "}";`,
      '    }',
      '',
    );
  }
  if (context.options.builder) {
    body.push(
      '    public static Builder builder() { return new Builder(); }',
      '',
      '    public static class Builder {',
      ...typed.map(({ name, type }) => `        private ${type} ${name};`),
      '',
    );
    for (const { name, type } of typed)
      body.push(
        `        public Builder ${name}(${type} ${name}) {`,
        `            this.${name} = ${name};`,
        '            return this;',
        '        }',
        '',
      );
    body.push(`        public ${model.targetName} build() {`);
    if (context.options.allArgsConstructor) {
      body.push(
        `            return new ${model.targetName}(${typed.map(({ name }) => name).join(', ')});`,
      );
    } else {
      body.push(
        `            ${model.targetName} value = new ${model.targetName}();`,
        ...typed.map(({ name }) => `            value.${name} = ${name};`),
        '            return value;',
      );
    }
    body.push('        }', '    }', '');
  }
  while (body.at(-1) === '') body.pop();
  return [
    ...header(context.options.packageName, context.imports),
    `public class ${model.targetName} {`,
    ...body,
    '}',
    '',
  ].join('\n');
}

function renderModel(
  model: ModelDefinition,
  document: ForgeDocument,
  options: Resolved,
  diagnostics: Diagnostic[],
): string {
  const context: RenderContext = {
    document,
    options,
    imports: new Set(),
    diagnostics,
  };
  if (options.target === 'record') return renderRecord(model, context);
  if (options.target === 'lombok') return renderLombok(model, context);
  return renderPojo(model, context);
}

export function generateJava(
  document: ForgeDocument,
  input: JavaGeneratorOptions = {},
): GenerationResult {
  const options = resolve(input);
  const validation = validateForgeDocument(document);
  const packageValid = /^(?:[a-z_]\w*)(?:\.(?:[a-z_]\w*))*$/u.test(
    options.packageName,
  );
  const diagnostics = [...validation.diagnostics];
  if (!packageValid)
    diagnostics.push(
      createDiagnostic({
        severity: 'error',
        code: 'INVALID_JAVA_PACKAGE',
        message: `Invalid Java package: ${options.packageName}.`,
      }),
    );
  const fatal = !validation.valid || !packageValid;
  const metadata = {
    generator: '@modelforge/generator-java',
    generatorVersion: VERSION,
    target: `java-${options.target}`,
    verified: !fatal,
  };
  if (fatal) return { files: [], diagnostics, metadata };
  if (document.models.length === 0) {
    return {
      files: [],
      diagnostics: [
        createDiagnostic({
          severity: 'error',
          code: 'NO_JAVA_MODELS',
          message: 'Java generation requires at least one object model.',
        }),
      ],
      metadata: { ...metadata, verified: false },
    };
  }
  const packagePath = options.packageName.replaceAll('.', '/');
  return {
    files: document.models.map((model) => ({
      path: `src/main/java/${packagePath}/${model.targetName}.java`,
      language: 'java',
      content: renderModel(model, document, options, diagnostics),
    })),
    diagnostics,
    metadata,
  };
}
