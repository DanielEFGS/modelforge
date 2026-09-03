import { parseAndInferJson } from '@modelforge/parser-json';
import { describe, expect, it } from 'vitest';

import { generateCSharp } from './generate';

function documentFor(source: string) {
  const parsed = parseAndInferJson(source);
  if (!parsed.ok) throw new Error('Fixture JSON must parse.');
  return parsed.document;
}

describe('C# generator', () => {
  it('generates deterministic classes with JSON aliases and nullability', () => {
    const document = documentFor(
      '[{"id":1,"email_address":"a@example.com"},{"id":2,"email_address":null}]',
    );
    const first = generateCSharp(document);
    expect(first).toEqual(generateCSharp(document));
    expect(first.files[0]?.content).toBe(
      '#nullable enable\n\n' +
        'using System.Text.Json.Serialization;\n\n' +
        'namespace ModelForge.Generated;\n\n' +
        'public sealed class Root\n' +
        '{\n' +
        '    [JsonPropertyName("id")]\n' +
        '    public long Id { get; init; }\n\n' +
        '    [JsonPropertyName("email_address")]\n' +
        '    public string? EmailAddress { get; init; }\n' +
        '}\n',
    );
    expect(first.metadata.verified).toBe(false);
  });

  it('supports records, collections and explicit .NET date mappings', () => {
    const result = generateCSharp(
      documentFor('{"created_at":"2026-08-29T12:30:00Z","tags":["compiler"]}'),
      { declarationStyle: 'record', dateStyle: 'dotnet' },
    );
    expect(result.files[0]?.content).toContain('public sealed record Root');
    expect(result.files[0]?.content).toContain(
      'public DateTimeOffset CreatedAt { get; init; }',
    );
    expect(result.files[0]?.content).toContain(
      'public List<string> Tags { get; init; } = new();',
    );
  });

  it('rejects invalid namespaces and explains lossy unions', () => {
    const invalid = generateCSharp(documentFor('{"id":1}'), {
      namespaceName: 'bad namespace',
    });
    expect(invalid.files).toEqual([]);
    expect(invalid.diagnostics[0]?.code).toBe('INVALID_CSHARP_NAMESPACE');

    const union = generateCSharp(documentFor('{"value":[1,"one"]}'));
    expect(union.files[0]?.content).toContain('List<object>');
    expect(
      union.diagnostics.some(
        (item) => item.code === 'CSHARP_UNION_MAPPED_TO_OBJECT',
      ),
    ).toBe(true);
  });
});
