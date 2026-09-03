import { describe, expect, it } from 'vitest';
import { clampToVerticalRail } from './reference-geometry';

describe('clampToVerticalRail', () => {
  const rail = { top: 72, bottom: 428 };

  it('groups offscreen positions at the nearest rail', () => {
    expect(clampToVerticalRail(-300, rail)).toBe(72);
    expect(clampToVerticalRail(900, rail)).toBe(428);
  });

  it('preserves positions already inside the visible range', () => {
    expect(clampToVerticalRail(240, rail)).toBe(240);
  });
});
