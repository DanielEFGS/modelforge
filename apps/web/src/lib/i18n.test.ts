import { describe, expect, it } from 'vitest';
import { resolveLocale, WORKSPACE_MESSAGES } from './i18n';
import { translateDiagnostic } from './diagnostic-i18n';

describe('workspace locale resolution', () => {
  it('matches supported browser language families in preference order', () => {
    expect(resolveLocale(['fr-FR', 'es-CL', 'en-US'])).toBe('es');
    expect(resolveLocale(['pt-PT'])).toBe('pt-BR');
    expect(resolveLocale(['zh-TW'])).toBe('zh-CN');
    expect(resolveLocale(['ko-KR'])).toBe('ko');
  });

  it('falls back to English without changing technical identifiers', () => {
    expect(resolveLocale(['fr-FR'])).toBe('en');
    expect(WORKSPACE_MESSAGES.es.generatedNameFor('emailAddress')).toContain(
      'emailAddress',
    );
  });

  it('translates diagnostic explanations while preserving field identifiers', () => {
    expect(
      translateDiagnostic(
        {
          id: 'normalized-name',
          severity: 'info',
          code: 'PROPERTY_NAME_NORMALIZED',
          message: 'Property "email_address" was normalized to "emailAddress".',
        },
        'es',
      ),
    ).toBe(
      'El nombre de la propiedad se normalizó para el destino. "email_address" → "emailAddress"',
    );
  });
});
