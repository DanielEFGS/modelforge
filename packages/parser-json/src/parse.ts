import { createDiagnostic } from '@modelforge/core';

import { inferJsonValue } from './infer';
import { createJsonSyntaxDiagnostic } from './parse-error';
import type { JsonInferenceOptions, JsonInferenceResult } from './types';

const DEFAULT_WARNING_BYTES = 2 * 1024 * 1024;
const DEFAULT_HARD_LIMIT_BYTES = 10 * 1024 * 1024;

function sourceBytes(source: string): number {
  return new TextEncoder().encode(source).byteLength;
}

export function parseAndInferJson(
  source: string,
  options: JsonInferenceOptions = {},
): JsonInferenceResult {
  const bytes = sourceBytes(source);
  const warningBytes = options.sourceSizeWarningBytes ?? DEFAULT_WARNING_BYTES;
  const hardLimitBytes =
    options.sourceSizeHardLimitBytes ?? DEFAULT_HARD_LIMIT_BYTES;

  if (bytes > hardLimitBytes) {
    return {
      ok: false,
      diagnostics: [
        createDiagnostic({
          severity: 'error',
          code: 'SOURCE_SIZE_LIMIT_EXCEEDED',
          message: `JSON source is ${bytes} bytes and exceeds the configured safety limit of ${hardLimitBytes} bytes.`,
          path: '$',
        }),
      ],
      decisions: [],
    };
  }

  let value: unknown;
  try {
    value = JSON.parse(source) as unknown;
  } catch (error) {
    return {
      ok: false,
      diagnostics: [createJsonSyntaxDiagnostic(source, error)],
      decisions: [],
    };
  }

  const inferred = inferJsonValue(value, options);
  if (bytes > warningBytes) {
    inferred.document.diagnostics.unshift(
      createDiagnostic({
        severity: 'warning',
        code: 'SOURCE_SIZE_WARNING',
        message: `JSON source is ${bytes} bytes; large inputs may affect browser responsiveness.`,
        path: '$',
      }),
    );
  }

  return { ok: true, ...inferred };
}
