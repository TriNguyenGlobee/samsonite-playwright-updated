import fs from 'fs';
import path from 'path';
import sg from '../locales/sg.json';

export type Locale = 'sg' | 'jp' | 'tw' | 'ph' | 'au' | 'my' | 'id';
const defaultLocale: Locale = 'sg';
const currentLocale: Locale = (process.env.LOCALE as Locale) || defaultLocale;

const localesDir = path.join(__dirname, '..', 'locales');

export type Translations = typeof sg;

function loadTranslations(locale: Locale): Translations {
  try {
    const filePath = path.join(localesDir, `${locale}.json`);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData) as Translations;
  } catch (error) {
    console.warn(`Cannot load JSON file [${locale}]. Using fallback: ${defaultLocale}`);
    const fallbackData = fs.readFileSync(path.join(localesDir, `${defaultLocale}.json`), 'utf-8');
    return JSON.parse(fallbackData) as Translations;
  }
}

export const I18n = {
  locale: currentLocale,
  translations: loadTranslations(currentLocale),
};
