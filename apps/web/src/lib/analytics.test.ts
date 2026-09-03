import { describe, expect, it, vi } from 'vitest';
import {
  configureAnalytics,
  countBucket,
  sourceSizeBucket,
  trackAnalytics,
} from './analytics';

describe('privacy-safe analytics facade', () => {
  it('is inert without a configured provider', () => {
    expect(() =>
      trackAnalytics({ name: 'sample_loaded', sampleId: 'example-user' }),
    ).not.toThrow();
  });
  it('sends only the explicit coarse event schema', () => {
    const send = vi.fn();
    configureAnalytics({ send });
    trackAnalytics({
      name: 'parse_result',
      success: true,
      sourceSizeBucket: '<10KB',
      rootKind: 'model',
      modelCountBucket: '1-5',
      fieldCountBucket: '6-20',
      diagnosticCodes: ['EMPTY_ARRAY_UNKNOWN_ELEMENT'],
      rawJson: 'MODEL_FORGE_PRIVATE_SENTINEL_92741',
    } as never);
    const serialized = JSON.stringify(send.mock.calls);
    expect(serialized).not.toContain('MODEL_FORGE_PRIVATE_SENTINEL_92741');
    expect(serialized).not.toContain('rawJson');
    configureAnalytics(undefined);
  });
  it('uses stable non-identifying buckets', () => {
    expect(sourceSizeBucket(20_000)).toBe('10-100KB');
    expect(countBucket(9)).toBe('6-20');
  });
});
