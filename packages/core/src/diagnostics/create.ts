import type { Diagnostic } from '../ir/types';
import { createStableId } from '../naming/stable-id';

export type DiagnosticInput = Omit<Diagnostic, 'id'>;

export function createDiagnostic(input: DiagnosticInput): Diagnostic {
  const identity = [
    input.code,
    input.path ?? '',
    input.modelId ?? '',
    input.fieldId ?? '',
    input.location?.line ?? '',
    input.location?.column ?? '',
    input.message,
  ].join('\u0000');

  return {
    id: createStableId('diagnostic', identity),
    ...input,
  };
}
