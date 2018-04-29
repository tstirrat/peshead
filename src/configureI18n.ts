import * as i18n from 'i18next';
import * as XHR from 'i18next-xhr-backend';
import * as LanguageDetector from 'i18next-browser-languagedetector';

export default i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    // debug: true,
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    react: {
      wait: false,
      nsMode: 'fallback' // let passed namespaces act as fallbacks
    }
  });

export const i18nTest = i18n.init({
  fallbackLng: 'cimode',
  debug: false,
  saveMissing: false,
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: false,
    nsMode: 'fallback'
  }
});
