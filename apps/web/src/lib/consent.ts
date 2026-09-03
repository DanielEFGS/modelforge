export type ConsentState = 'unknown' | 'denied' | 'granted';
export interface OptionalIntegration {
  start(): void;
  stop?(): void;
}

export function applyConsent(
  state: ConsentState,
  integrations: readonly OptionalIntegration[],
): void {
  if (state === 'granted') {
    for (const integration of integrations) integration.start();
  } else {
    for (const integration of integrations) integration.stop?.();
  }
}
