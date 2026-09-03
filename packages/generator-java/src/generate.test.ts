import { parseAndInferJson } from '@modelforge/parser-json';
import { describe, expect, it } from 'vitest';
import { generateJava } from './generate';

function doc(source: string) {
  const result = parseAndInferJson(source);
  if (!result.ok) throw new Error('invalid fixture');
  return result.document;
}

describe('Java generator', () => {
  const sample = doc(
    '{"id":1,"created":"2026-08-27T12:30:00Z","profile":{"name":"Ada"},"tags":["x"]}',
  );
  it('generates deterministic POJOs with stable imports and paths', () => {
    const first = generateJava(sample, {
      equalsHashCode: true,
      includeToString: true,
      builder: true,
    });
    expect(first).toEqual(
      generateJava(sample, {
        equalsHashCode: true,
        includeToString: true,
        builder: true,
      }),
    );
    expect(first.files.map((file) => file.path)).toEqual([
      'src/main/java/com/example/demo/Root.java',
      'src/main/java/com/example/demo/Profile.java',
    ]);
    expect(first.files[0]?.content).toContain('private Long id;');
    expect(first.files[0]?.content).toContain('private List<String> tags;');
    expect(first.files[0]?.content).toContain('public static class Builder');
  });
  it('generates records and java.time mappings', () => {
    const output = generateJava(sample, {
      target: 'record',
      dateStyle: 'java-time',
    }).files[0]?.content;
    expect(output).toContain('import java.time.OffsetDateTime;');
    expect(output).toContain('public record Root(');
    expect(output).toContain('OffsetDateTime created');
  });
  it('generates configurable Lombok annotations', () => {
    const output = generateJava(sample, { target: 'lombok', builder: true })
      .files[0]?.content;
    expect(output).toContain('import lombok.Builder;');
    expect(output).toContain('@NoArgsConstructor');
    expect(output).toContain('@Builder');
  });
  it('maps unions visibly to Object and rejects invalid packages', () => {
    const union = generateJava(doc('{"mixed":[1,"one"]}'));
    expect(union.files[0]?.content).toContain('private List<Object> mixed;');
    expect(union.diagnostics[0]?.code).toBe('JAVA_UNION_MAPPED_TO_OBJECT');
    expect(generateJava(sample, { packageName: 'Bad-package' }).files).toEqual(
      [],
    );
  });
});
