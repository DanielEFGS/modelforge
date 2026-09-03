export interface JsonPropertyRange {
  path: string;
  from: number;
  to: number;
}

function escapePathSegment(segment: string): string {
  return segment.replaceAll('~', '~0').replaceAll('/', '~1');
}

export function fieldPath(modelPath: string, sourceName: string): string {
  return `${modelPath}/${escapePathSegment(sourceName)}`;
}

export function findJsonPropertyRanges(source: string): JsonPropertyRange[] {
  const ranges: JsonPropertyRange[] = [];
  let cursor = 0;

  function skipWhitespace() {
    while (/\s/.test(source[cursor] ?? '')) cursor += 1;
  }

  function readString(): { value: string; from: number; to: number } {
    const from = cursor;
    cursor += 1;
    let escaped = false;
    while (cursor < source.length) {
      const character = source[cursor];
      cursor += 1;
      if (character === '"' && !escaped) break;
      if (character === '\\' && !escaped) escaped = true;
      else escaped = false;
    }
    const to = cursor;
    return { value: JSON.parse(source.slice(from, to)) as string, from, to };
  }

  function readValue(path: string) {
    skipWhitespace();
    const character = source[cursor];
    if (character === '{') {
      readObject(path);
      return;
    }
    if (character === '[') {
      readArray(path);
      return;
    }
    if (character === '"') {
      readString();
      return;
    }
    while (cursor < source.length && !/[\],}]/.test(source[cursor] ?? '')) {
      cursor += 1;
    }
  }

  function readObject(path: string) {
    cursor += 1;
    skipWhitespace();
    while (cursor < source.length && source[cursor] !== '}') {
      const key = readString();
      const propertyPath = `${path}/${escapePathSegment(key.value)}`;
      ranges.push({ path: propertyPath, from: key.from, to: key.to });
      skipWhitespace();
      if (source[cursor] !== ':') throw new Error('Expected a colon.');
      cursor += 1;
      readValue(propertyPath);
      skipWhitespace();
      if (source[cursor] === ',') {
        cursor += 1;
        skipWhitespace();
      } else {
        break;
      }
    }
    if (source[cursor] === '}') cursor += 1;
  }

  function readArray(path: string) {
    cursor += 1;
    skipWhitespace();
    while (cursor < source.length && source[cursor] !== ']') {
      readValue(`${path}/items`);
      skipWhitespace();
      if (source[cursor] === ',') {
        cursor += 1;
        skipWhitespace();
      } else {
        break;
      }
    }
    if (source[cursor] === ']') cursor += 1;
  }

  try {
    readValue('$');
  } catch {
    return [];
  }
  return ranges;
}
