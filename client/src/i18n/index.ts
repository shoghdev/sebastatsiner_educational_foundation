import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import hy from './locales/hy.json';

// Անգլերեն ավելացնելու համար՝ ստեղծել locales/en.json և ավելացնել resources-ում։
i18n.use(initReactI18next).init({
  resources: { hy: { translation: hy } },
  lng: 'hy',
  fallbackLng: 'hy',
  interpolation: { escapeValue: false },
});
export default i18n;
