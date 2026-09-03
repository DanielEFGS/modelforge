import { describe, expect, it } from 'vitest';

import { createMetadata } from './metadata';

describe('createMetadata', () => {
  it('builds a stable absolute canonical URL', () => {
    const metadata = createMetadata({
      title: 'JSON to TypeScript Generator | ModelForge',
      description: 'Generate TypeScript models locally.',
      pathname: 'json-to-typescript',
      siteUrl: new URL('https://example.dev'),
    });

    expect(metadata.canonical).toBe('https://example.dev/json-to-typescript');
    expect(metadata.openGraph.url).toBe(metadata.canonical);
  });
});
