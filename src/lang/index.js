import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import translationEN from './en.json';
import translationVI from './vi.json';

// the translations
const resources = {
    en: { translation: translationEN },
    vi: { translation: translationVI },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
