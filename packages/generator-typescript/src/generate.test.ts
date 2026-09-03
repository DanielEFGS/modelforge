import { parseAndInferJson } from '@modelforge/parser-json';
import { describe, expect, it } from 'vitest';

import { generateTypeScript } from './generate';

function documentFor(source: string) {
  const parsed = parseAndInferJson(source);
  if (!parsed.ok) throw new Error('Fixture JSON must parse.');
  return parsed.document;
}

describe('TypeScript generator', () => {
  const source = JSON.stringify({
    id: 1,
    createdAt: '2026-08-27T12:30:00Z',
    profile: { displayName: 'Ada' },
    tags: ['compiler'],
  });

  it('generates deterministic dependency-safe interfaces', () => {
    const document = documentFor(source);
    const first = generateTypeScript(document);
    expect(first).toEqual(generateTypeScript(document));
    expect(first.files[0]?.content).toBe(
      'export interface Profile {\n' +
        '  displayName: string;\n' +
        '}\n\n' +
        'export interface Root {\n' +
        '  id: number;\n' +
        '  createdAt: string;\n' +
        '  profile: Profile;\n' +
        '  tags: string[];\n' +
        '}\n',
    );
    expect(first.metadata.verified).toBe(true);
  });

  it('supports type aliases, formatting, readonly, dates, and generic arrays', () => {
    const result = generateTypeScript(documentFor(source), {
      declarationStyle: 'type',
      readonly: true,
      semicolons: false,
      dateStyle: 'Date',
      arrayStyle: 'generic',
    });
    expect(result.files[0]?.content).toContain('export type Root = {');
    expect(result.files[0]?.content).toContain('  readonly createdAt: Date');
    expect(result.files[0]?.content).toContain(
      '  readonly tags: Array<string>',
    );
    expect(result.files[0]?.content).not.toContain(';');
  });

  it('maps optional and nullable evidence independently', () => {
    const document = documentFor('[{"name":null},{},{"name":"Ada"}]');
    expect(generateTypeScript(document).files[0]?.content).toContain(
      'name?: string | null;',
    );
    expect(
      generateTypeScript(document, {
        optionalStyle: 'undefined-union',
        nullableStyle: 'undefined',
      }).files[0]?.content,
    ).toContain('name: string | undefined;');
  });

  it('generates classes with an explicit constructor policy', () => {
    const result = generateTypeScript(documentFor('{"id":1,"label":"Ada"}'), {
      declarationStyle: 'class',
      readonly: true,
    });
    expect(result.files[0]?.content).toContain('export class Root {');
    expect(result.files[0]?.content).toContain('readonly id: number;');
    expect(result.files[0]?.content).toContain(
      'constructor(id: number, label: string)',
    );
    expect(result.files[0]?.content).toContain('this.id = id;');
  });

  it('emits valid root aliases for arrays and unions without any', () => {
    const result = generateTypeScript(documentFor('[1,"one"]'));
    expect(result.files[0]?.content).toBe(
      'export type Root = (string | number)[];\n',
    );
    expect(result.files[0]?.content).not.toContain('any');
  });
});
