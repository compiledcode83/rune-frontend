import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      keyWithItemCount_one: "{{count}} item",
      keyWithItemCount_other: "{{count}} items",
      keyWithInsCount_one: "{{count}} Inscription",
      keyWithInsCount_other: "{{count}} Inscriptions",
      keyWithOfferCount_one: "{{count}} Offer",
      keyWithOfferCount_other: "{{count}} Offers",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;