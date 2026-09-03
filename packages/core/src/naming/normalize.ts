const WORD_BOUNDARY = /[^\p{L}\p{N}]+/gu;

function words(value: string): string[] {
  return value
    .normalize('NFKC')
    .replace(WORD_BOUNDARY, ' ')
    .trim()
    .split(/\s+/u)
    .filter(Boolean);
}

function lowerInitial(value: string): string {
  return value.length === 0
    ? value
    : value[0]!.toLocaleLowerCase() + value.slice(1);
}

function upperInitial(value: string): string {
  return value.length === 0
    ? value
    : value[0]!.toLocaleUpperCase() + value.slice(1);
}

export function normalizePropertyName(sourceName: string): string {
  const parts = words(sourceName);
  const joined = parts
    .map((part, index) =>
      index === 0 ? lowerInitial(part) : upperInitial(part),
    )
    .join('');
  const fallback = joined || 'field';

  return /^\p{N}/u.test(fallback) ? `value${fallback}` : fallback;
}

export function normalizeModelName(sourceName: string): string {
  const propertyName = normalizePropertyName(sourceName);
  return upperInitial(propertyName);
}

export function singularizeModelName(value: string): string {
  if (/ies$/iu.test(value) && value.length > 3) {
    return `${value.slice(0, -3)}y`;
  }
  if (/(ches|shes|xes|zes)$/iu.test(value)) {
    return value.slice(0, -2);
  }
  if (/s$/iu.test(value) && !/(ss|us|is)$/iu.test(value)) {
    return value.slice(0, -1);
  }
  return value;
}

export function allocateUniqueName(
  suggestedName: string,
  allocatedNames: ReadonlySet<string>,
): string {
  if (!allocatedNames.has(suggestedName)) {
    return suggestedName;
  }

  let suffix = 2;
  while (allocatedNames.has(`${suggestedName}${suffix}`)) {
    suffix += 1;
  }
  return `${suggestedName}${suffix}`;
}
