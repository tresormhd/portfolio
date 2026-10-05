import fr from '../data/fr.js';
import en from '../data/en.js';

export const dictionaries = { fr, en };
export const DEFAULT_LANG = 'fr';
const STORAGE_KEY = 'lang';

export function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in dictionaries) return saved;
  } catch {
    /* stockage indisponible */
  }
  return DEFAULT_LANG;
}

export function saveLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignoré */
  }
}

/** Met à jour <html lang>, le titre et les meta dépendantes de la langue. */
export function applyDocumentLang(lang) {
  const { meta } = dictionaries[lang];
  document.documentElement.lang = lang;
  document.title = meta.title;
  const set = (sel, value) => document.querySelector(sel)?.setAttribute('content', value);
  set('meta[name="description"]', meta.description);
  set('meta[property="og:title"]', meta.title);
  set('meta[property="og:description"]', meta.description);
  set('meta[property="og:locale"]', meta.ogLocale);
  set('meta[name="twitter:title"]', meta.title);
  set('meta[name="twitter:description"]', meta.description);
}
