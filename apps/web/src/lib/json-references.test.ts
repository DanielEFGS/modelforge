import { describe, expect, it } from 'vitest';
import { fieldPath, findJsonPropertyRanges } from './json-references';

describe('JSON reference ranges', () => {
  it('tracks nested object and array property paths used by the IR', () => {
    const source = `{"id":1,"profile":{"name":"Ada"},"items":[{"sku":"A"},{"sku":"B"}]}`;
    expect(findJsonPropertyRanges(source).map((range) => range.path)).toEqual([
      '$/id',
      '$/profile',
      '$/profile/name',
      '$/items',
      '$/items/items/sku',
      '$/items/items/sku',
    ]);
  });

  it('escapes JSON pointer path segments deterministically', () => {
    expect(fieldPath('$/profile', 'a/b~c')).toBe('$/profile/a~1b~0c');
  });
});
