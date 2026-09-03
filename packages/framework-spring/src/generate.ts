import {
  createDiagnostic,
  type ForgeDocument,
  type GeneratedFile,
  type GenerationResult,
  type ModelDefinition,
} from '@modelforge/core';
import { generateJava } from '@modelforge/generator-java';
import {
  checkSpringCompatibility,
  getSpringBootProfile,
  type SpringBootFamily,
} from './profiles';

export type SpringArtifact = 'entity' | 'dto' | 'repository';
export interface SpringGeneratorOptions {
  family: SpringBootFamily;
  javaVersion: number;
  packageName?: string;
  artifacts?: SpringArtifact[];
  entityModelId?: string;
  idFieldId?: string;
}

function replacePackage(
  file: GeneratedFile,
  from: string,
  to: string,
): GeneratedFile {
  return {
    ...file,
    path: file.path.replace(from.replaceAll('.', '/'), to.replaceAll('.', '/')),
    content: file.content.replace(`package ${from};`, `package ${to};`),
  };
}
function addEntityAnnotations(
  file: GeneratedFile,
  model: ModelDefinition,
  idFieldId?: string,
): GeneratedFile {
  let content = file.content.replace(
    '\n\npublic class ',
    '\nimport jakarta.persistence.Entity;\nimport jakarta.persistence.GeneratedValue;\nimport jakarta.persistence.GenerationType;\nimport jakarta.persistence.Id;\n\n@Entity\npublic class ',
  );
  const id = model.fields.find((field) => field.id === idFieldId);
  if (id) {
    const name = id.targetName === 'class' ? 'classValue' : id.targetName;
    content = content.replace(
      new RegExp(`(    private \\w+(?:<[^>]+>)? ${name};)`, 'u'),
      '    @Id\n    @GeneratedValue(strategy = GenerationType.AUTO)\n$1',
    );
  }
  return { ...file, content };
}
function idJavaType(
  model: ModelDefinition,
  fieldId: string,
): string | undefined {
  const field = model.fields.find((item) => item.id === fieldId);
  if (!field || field.type.kind !== 'scalar') return undefined;
  if (field.type.scalar === 'integer') return 'Long';
  if (field.type.scalar === 'number') return 'Double';
  if (field.type.scalar === 'string') return 'String';
  if (field.type.scalar === 'boolean') return 'Boolean';
  return undefined;
}
function dtoFiles(
  files: GeneratedFile[],
  base: string,
  models: ModelDefinition[],
): GeneratedFile[] {
  return files.map((original) => {
    let file = replacePackage(original, `${base}.model`, `${base}.dto`);
    for (const model of models)
      file = {
        ...file,
        path: file.path.replace(
          `${model.targetName}.java`,
          `${model.targetName}Dto.java`,
        ),
        content: file.content.replaceAll(
          model.targetName,
          `${model.targetName}Dto`,
        ),
      };
    return file;
  });
}

export function generateSpring(
  document: ForgeDocument,
  options: SpringGeneratorOptions,
): GenerationResult {
  const profile = getSpringBootProfile(options.family);
  const compatibility = checkSpringCompatibility(
    options.family,
    options.javaVersion,
  );
  const base = options.packageName ?? 'com.example.demo';
  const artifacts = options.artifacts ?? ['entity', 'dto', 'repository'];
  const entityModel =
    document.models.find((model) => model.id === options.entityModelId) ??
    document.models.find(
      (model) =>
        document.root.kind === 'model' && model.id === document.root.modelId,
    ) ??
    document.models[0];
  const baseResult = generateJava(document, {
    target: 'pojo',
    packageName: `${base}.model`,
    getters: true,
    setters: true,
    noArgsConstructor: true,
    allArgsConstructor: true,
  });
  const diagnostics = [...compatibility.diagnostics, ...baseResult.diagnostics];
  if (compatibility.status === 'incompatible' || !entityModel)
    return {
      files: [],
      diagnostics: entityModel
        ? diagnostics
        : [
            ...diagnostics,
            createDiagnostic({
              severity: 'error',
              code: 'NO_ENTITY_MODEL',
              message: 'Spring generation requires an object model.',
            }),
          ],
      metadata: {
        generator: '@modelforge/framework-spring',
        generatorVersion: '1.0.0',
        target: 'spring-boot',
        profileId: options.family,
        verified: false,
      },
    };
  const files: GeneratedFile[] = [];
  if (artifacts.includes('entity'))
    files.push(
      ...baseResult.files.map((file, index) =>
        addEntityAnnotations(file, document.models[index]!, options.idFieldId),
      ),
    );
  if (artifacts.includes('dto'))
    files.push(...dtoFiles(baseResult.files, base, document.models));
  const idType = options.idFieldId
    ? idJavaType(entityModel, options.idFieldId)
    : undefined;
  if (artifacts.includes('repository')) {
    if (!idType)
      diagnostics.push(
        createDiagnostic({
          severity: 'error',
          code: 'REPOSITORY_REQUIRES_ID',
          message:
            'Select a scalar entity identifier before generating a repository.',
          modelId: entityModel.id,
        }),
      );
    else
      files.push({
        path: `src/main/java/${base.replaceAll('.', '/')}/repository/${entityModel.targetName}Repository.java`,
        language: 'java',
        content: `package ${base}.repository;\n\nimport ${base}.model.${entityModel.targetName};\nimport org.springframework.data.jpa.repository.JpaRepository;\n\npublic interface ${entityModel.targetName}Repository extends JpaRepository<${entityModel.targetName}, ${idType}> {\n}\n`,
      });
  }
  if (artifacts.includes('entity') && !options.idFieldId)
    diagnostics.push(
      createDiagnostic({
        severity: 'warning',
        code: 'ENTITY_ID_NOT_SELECTED',
        message:
          'No identifier was selected; the entity has no @Id annotation and is not verified.',
        modelId: entityModel.id,
      }),
    );
  const hasError = diagnostics.some((item) => item.severity === 'error');
  const entityWithoutId = artifacts.includes('entity') && !options.idFieldId;
  return {
    files,
    diagnostics,
    metadata: {
      generator: '@modelforge/framework-spring',
      generatorVersion: '1.0.0',
      target: 'spring-boot',
      profileId: `${profile.family}:${profile.verifiedVersion}`,
      verified: !hasError && !entityWithoutId,
    },
  };
}
