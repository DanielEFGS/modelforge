export type AnalyticsEvent =
  | { name: 'workspace_loaded'; routePreset: string; locale: string }
  | {
      name: 'parse_result';
      success: boolean;
      sourceSizeBucket: string;
      rootKind: string;
      modelCountBucket: string;
      fieldCountBucket: string;
      diagnosticCodes: string[];
    }
  | {
      name: 'target_changed';
      language: string;
      framework?: string;
      versionFamily?: string;
      style?: string;
    }
  | {
      name: 'generation_result';
      success: boolean;
      target: string;
      fileCount: number;
      diagnosticCodes: string[];
    }
  | { name: 'copy_output'; target: string; scope: 'current' | 'all' }
  | { name: 'download_output'; target: string; fileCount: number }
  | { name: 'sample_loaded'; sampleId: string }
  | {
      name: 'model_edit';
      category: 'rename' | 'type' | 'nullability' | 'required' | 'hint';
    };

export interface AnalyticsProvider {
  send(event: AnalyticsEvent): void;
}
let provider: AnalyticsProvider | undefined;
const ALLOWED_KEYS: Record<AnalyticsEvent['name'], readonly string[]> = {
  workspace_loaded: ['name', 'routePreset', 'locale'],
  parse_result: [
    'name',
    'success',
    'sourceSizeBucket',
    'rootKind',
    'modelCountBucket',
    'fieldCountBucket',
    'diagnosticCodes',
  ],
  target_changed: ['name', 'language', 'framework', 'versionFamily', 'style'],
  generation_result: [
    'name',
    'success',
    'target',
    'fileCount',
    'diagnosticCodes',
  ],
  copy_output: ['name', 'target', 'scope'],
  download_output: ['name', 'target', 'fileCount'],
  sample_loaded: ['name', 'sampleId'],
  model_edit: ['name', 'category'],
};

export function configureAnalytics(next: AnalyticsProvider | undefined): void {
  provider = next;
}
export function trackAnalytics(event: AnalyticsEvent): void {
  if (!provider) return;
  const record = event as unknown as Record<string, unknown>;
  const sanitized = Object.fromEntries(
    ALLOWED_KEYS[event.name].flatMap((key) =>
      key in record ? [[key, structuredClone(record[key])]] : [],
    ),
  );
  provider.send(sanitized as unknown as AnalyticsEvent);
}
export function sourceSizeBucket(bytes: number): string {
  if (bytes < 10_000) return '<10KB';
  if (bytes < 100_000) return '10-100KB';
  if (bytes < 1_000_000) return '100KB-1MB';
  return '>=1MB';
}
export function countBucket(count: number): string {
  if (count === 0) return '0';
  if (count <= 5) return '1-5';
  if (count <= 20) return '6-20';
  return '21+';
}
