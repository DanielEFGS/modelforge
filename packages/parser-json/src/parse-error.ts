import {
  createDiagnostic,
  type Diagnostic,
  type SourceLocation,
} from '@modelforge/core';

function locationFromOffset(source: string, offset: number): SourceLocation {
  const prefix = source.slice(0, offset);
  const lines = prefix.split(/\r\n|\r|\n/u);
  return {
    line: lines.length,
    column: (lines.at(-1)?.length ?? 0) + 1,
    offset,
  };
}

export function createJsonSyntaxDiagnostic(
  source: string,
  error: unknown,
): Diagnostic {
  const rawMessage = error instanceof Error ? error.message : String(error);
  const lineColumn = /line\s+(\d+)\s+column\s+(\d+)/iu.exec(rawMessage);
  const position = /position\s+(\d+)/iu.exec(rawMessage);
  let location: SourceLocation | undefined;

  if (lineColumn) {
    location = {
      line: Number(lineColumn[1]),
      column: Number(lineColumn[2]),
      offset: position ? Number(position[1]) : undefined,
    };
  } else if (position) {
    location = locationFromOffset(source, Number(position[1]));
  }

  const locationLabel = location
    ? ` at line ${location.line}, column ${location.column}`
    : '';

  return createDiagnostic({
    severity: 'error',
    code: 'INVALID_JSON_SYNTAX',
    message: `Invalid JSON${locationLabel}. ${rawMessage}`,
    path: '$',
    location,
  });
}
