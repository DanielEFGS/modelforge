import { describe, expect, it } from 'vitest';

import {
  allocateUniqueName,
  normalizeModelName,
  normalizePropertyName,
  singularizeModelName,
} from './normalize';
import { createStableId } from './stable-id';

describe('stable IDs', () => {
  it('is deterministic and kind-scoped', () => {
    expect(createStableId('model', '$.user')).toBe(
      createStableId('model', '$.user'),
    );
    expect(createStableId('model', '$.user')).not.toBe(
      createStableId('field', '$.user'),
    );
  });
});

describe('target-neutral naming', () => {
  it.each([
    ['first-name', 'firstName'],
    ['first_name', 'firstName'],
    ['First Name', 'firstName'],
    ['123value', 'value123value'],
  ])('normalizes %s to %s', (source, expected) => {
    expect(normalizePropertyName(source)).toBe(expected);
  });

  it('normalizes and conservatively singularizes model names', () => {
    expect(normalizeModelName('postal address')).toBe('PostalAddress');
    expect(singularizeModelName('Users')).toBe('User');
    expect(singularizeModelName('Categories')).toBe('Category');
    expect(singularizeModelName('Status')).toBe('Status');
  });

  it('allocates deterministic collision suffixes', () => {
    expect(allocateUniqueName('firstName', new Set(['firstName']))).toBe(
      'firstName2',
    );
  });
});
