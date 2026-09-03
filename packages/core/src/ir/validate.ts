import { createDiagnostic } from '../diagnostics/create';
import type { Diagnostic, ForgeDocument, TypeRef } from './types';
import { FORGE_SCHEMA_VERSION } from './types';

export interface ValidationResult {
  valid: boolean;
  diagnostics: Diagnostic[];
}

function collectModelReferences(type: TypeRef, references: string[]): void {
  switch (type.kind) {
    case 'model':
      references.push(type.modelId);
      break;
    case 'array':
      collectModelReferences(type.element, references);
      break;
    case 'union':
      for (const variant of type.variants) {
        collectModelReferences(variant, references);
      }
      break;
    case 'scalar':
    case 'unknown':
      break;
  }
}

export function validateForgeDocument(
  document: ForgeDocument,
): ValidationResult {
  const diagnostics: Diagnostic[] = [];
  const modelIds = new Set<string>();
  const fieldIds = new Set<string>();

  if (document.schemaVersion !== FORGE_SCHEMA_VERSION) {
    diagnostics.push(
      createDiagnostic({
        severity: 'error',
        code: 'UNSUPPORTED_SCHEMA_VERSION',
        message: `Unsupported IR schema version: ${String(document.schemaVersion)}`,
      }),
    );
  }

  for (const model of document.models) {
    if (modelIds.has(model.id)) {
      diagnostics.push(
        createDiagnostic({
          severity: 'error',
          code: 'DUPLICATE_MODEL_ID',
          message: `Model ID ${model.id} is not unique.`,
          modelId: model.id,
          path: model.path,
        }),
      );
    }
    modelIds.add(model.id);

    for (const field of model.fields) {
      if (fieldIds.has(field.id)) {
        diagnostics.push(
          createDiagnostic({
            severity: 'error',
            code: 'DUPLICATE_FIELD_ID',
            message: `Field ID ${field.id} is not unique.`,
            fieldId: field.id,
            modelId: model.id,
            path: model.path,
          }),
        );
      }
      fieldIds.add(field.id);
    }
  }

  const references: string[] = [];
  collectModelReferences(document.root, references);
  for (const model of document.models) {
    for (const field of model.fields) {
      collectModelReferences(field.type, references);
    }
  }

  for (const modelId of references) {
    if (!modelIds.has(modelId)) {
      diagnostics.push(
        createDiagnostic({
          severity: 'error',
          code: 'UNRESOLVED_MODEL_REFERENCE',
          message: `Model reference ${modelId} does not resolve.`,
          modelId,
        }),
      );
    }
  }

  return { valid: diagnostics.length === 0, diagnostics };
}
