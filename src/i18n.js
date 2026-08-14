import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fi from './locales/fi/translation.json';
import en from './locales/en/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fi: { translation: fi },
      en: { translation: en }
    },
    fallbackLng: 'fi',
    lng: 'fi',
    interpolation: { escapeValue: false }
  });

export default i18n;
