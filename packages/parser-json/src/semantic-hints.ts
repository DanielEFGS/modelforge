import type { SemanticHint, SemanticHintKind } from '@modelforge/core';

function isCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const RECOGNIZERS: ReadonlyArray<
  [SemanticHintKind, (value: string) => boolean]
> = [
  [
    'datetime',
    (value) =>
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(
        value,
      ) && !Number.isNaN(Date.parse(value)),
  ],
  ['date', isCalendarDate],
  [
    'email',
    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value) && value.length <= 254,
  ],
  [
    'url',
    (value) => {
      try {
        const parsed = new URL(value);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    },
  ],
  [
    'uuid',
    (value) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(
        value,
      ),
  ],
];

export function inferSemanticHints(values: readonly string[]): SemanticHint[] {
  if (values.length === 0) {
    return [];
  }

  return RECOGNIZERS.flatMap(([kind, recognizes]) =>
    values.every(recognizes) ? [{ kind, confidence: 1 }] : [],
  );
}

export function categorizeString(value: string): SemanticHintKind | undefined {
  return RECOGNIZERS.find(([, recognizes]) => recognizes(value))?.[0];
}
