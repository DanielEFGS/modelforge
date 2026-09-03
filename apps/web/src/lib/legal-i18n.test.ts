import { describe, expect, it } from 'vitest';

import { LOCALES } from './i18n';
import { getLegalDocument, type LegalKind } from './legal-i18n';

const kinds: LegalKind[] = ['privacy', 'cookies', 'terms', 'disclaimer'];

describe('legal translations', () => {
  it('covers every legal document in every interface locale', () => {
    for (const { value: locale } of LOCALES) {
      for (const kind of kinds) {
        const document = getLegalDocument(kind, locale);
        expect(document.eyebrow).toBeTruthy();
        expect(document.title).toBeTruthy();
        expect(document.status).toBeTruthy();
        expect(document.sections.length).toBeGreaterThanOrEqual(2);
        for (const section of document.sections) {
          expect(section.heading).toBeTruthy();
          expect(section.body).toBeTruthy();
        }
      }
    }
  });
});
