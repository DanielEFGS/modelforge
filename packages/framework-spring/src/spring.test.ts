import { parseAndInferJson } from '@modelforge/parser-json';
import { describe, expect, it } from 'vitest';
import {
  checkSpringCompatibility,
  generateSpring,
  getSpringBootProfile,
} from './index';

function sample() {
  const parsed = parseAndInferJson('{"id":1,"name":"Ada"}', {
    rootName: 'User',
  });
  if (!parsed.ok) throw new Error('fixture');
  return parsed.document;
}
describe('Spring profiles and adapters', () => {
  it('keeps verified version facts in explicit profiles', () => {
    expect(getSpringBootProfile('3.5')).toMatchObject({
      verifiedVersion: '3.5.16',
      compatibility: { javaMin: 17, javaMax: 25 },
    });
    expect(getSpringBootProfile('4.1')).toMatchObject({
      verifiedVersion: '4.1.1',
      compatibility: { javaMin: 17, javaMax: 26 },
    });
  });
  it('blocks incompatible Java selections', () => {
    expect(checkSpringCompatibility('3.5', 26).status).toBe('incompatible');
    expect(
      generateSpring(sample(), { family: '3.5', javaVersion: 26 }).files,
    ).toEqual([]);
  });
  it('generates entity, DTO and repository only with explicit ID evidence', () => {
    const document = sample();
    const id = document.models[0]!.fields[0]!.id;
    const result = generateSpring(document, {
      family: '4.1',
      javaVersion: 21,
      idFieldId: id,
    });
    expect(result.files).toHaveLength(3);
    expect(result.files[0]?.content).toContain('@Id');
    expect(result.files[1]?.path).toContain('UserDto.java');
    expect(result.files[2]?.content).toContain('JpaRepository<User, Long>');
    expect(result.metadata.verified).toBe(true);
  });
  it('never guesses an id field by name', () => {
    const result = generateSpring(sample(), {
      family: '3.5',
      javaVersion: 21,
      artifacts: ['entity'],
    });
    expect(result.files[0]?.content).not.toContain('@Id');
    expect(result.diagnostics[0]?.code).toBe('ENTITY_ID_NOT_SELECTED');
    expect(result.metadata.verified).toBe(false);
  });
});
