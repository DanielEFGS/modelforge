export type StableIdKind =
  'model' | 'field' | 'enum' | 'diagnostic' | 'decision';

function fnv1a64(value: string): string {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;

  for (const character of value) {
    hash ^= BigInt(character.codePointAt(0) ?? 0);
    hash = BigInt.asUintN(64, hash * prime);
  }

  return hash.toString(16).padStart(16, '0');
}

export function createStableId(
  kind: StableIdKind,
  logicalPath: string,
): string {
  const normalizedPath = logicalPath.normalize('NFC');
  return `${kind}_${fnv1a64(`${kind}\u0000${normalizedPath}`)}`;
}
