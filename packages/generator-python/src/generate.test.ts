import { parseAndInferJson } from '@modelforge/parser-json';
import { describe, expect, it } from 'vitest';

import { generatePython } from './generate';

function documentFor(source: string) {
  const parsed = parseAndInferJson(source);
  if (!parsed.ok) throw new Error('Fixture JSON must parse.');
  return parsed.document;
}

describe('Python generator', () => {
  it('generates deterministic dataclasses with explicit JSON metadata', () => {
    const document = documentFor(
      '[{"id":1,"email_address":"a@example.com"},{"id":2}]',
    );
    const first = generatePython(document);
    expect(first).toEqual(generatePython(document));
    expect(first.files[0]?.content).toBe(
      'from __future__ import annotations\n\n' +
        'from dataclasses import dataclass\n' +
        'from dataclasses import field\n\n' +
        '@dataclass(slots=True)\n' +
        'class Root:\n' +
        '    id: int\n' +
        '    emailAddress: str | None = field(default=None, metadata={"json_name": "email_address"})\n',
    );
    expect(first.metadata.verified).toBe(true);
  });

  it('supports Pydantic aliases, strict mode and datetime mappings', () => {
    const result = generatePython(
      documentFor('{"created_at":"2026-08-29T12:30:00Z","tags":["compiler"]}'),
      {
        modelStyle: 'pydantic',
        dateStyle: 'datetime',
        pydanticStrict: true,
      },
    );
    expect(result.files[0]?.content).toContain('class Root(BaseModel):');
    expect(result.files[0]?.content).toContain(
      'model_config = ConfigDict(populate_by_name=True, strict=True)',
    );
    expect(result.files[0]?.content).toContain(
      'createdAt: datetime = Field(..., alias="created_at")',
    );
    expect(result.files[0]?.content).toContain('tags: list[str]');
    expect(result.metadata.verified).toBe(false);
  });

  it('keeps required nullable fields independent from optional fields', () => {
    const document = documentFor('[{"name":null},{"name":"Ada"},{}]');
    const output = generatePython(document).files[0]?.content;
    expect(output).toContain('name: str | None = None');
  });
});
