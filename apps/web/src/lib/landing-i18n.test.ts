import { describe, expect, it } from 'vitest';

import { LOCALES } from './i18n';
import { getLandingTranslation, type LandingKind } from './landing-i18n';

const kinds: LandingKind[] = [
  'home',
  'typescript',
  'java',
  'spring',
  'csharp',
  'python',
];

describe('landing translations', () => {
  it('covers every non-English locale and converter route', () => {
    for (const { value: locale } of LOCALES) {
      for (const kind of kinds) {
        const translation = getLandingTranslation(kind, locale);
        if (locale === 'en') {
          expect(translation).toBeNull();
          continue;
        }
        expect(translation?.compilerNotes).toBeTruthy();
        expect(translation?.title).toBeTruthy();
        expect(translation?.body).toBeTruthy();
        expect(translation?.notes).toHaveLength(3);
        expect(translation?.faq).toHaveLength(2);
        expect(translation?.relatedConverters).toBeTruthy();
      }
    }
  });
});
