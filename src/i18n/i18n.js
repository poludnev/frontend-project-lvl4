import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';

export default async () => {
  const defaultLanguage = 'ru';
  const i18instance = i18n.createInstance();
  await i18instance.use(initReactI18next).init({
    lng: defaultLanguage,
    resources: {
      ru,
    },
  });
  return i18instance;
};
