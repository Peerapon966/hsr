/**
 * All pathnames available in this website (navigate to pathname other than these will return 404 not found)
 */
export const AVAILABLE_PAGES = [
  "home",
  "news",
  "characters",
  "worlds",
] as const;
export const AVAILABLE_LOCALES = {
  "zh-cn": "中文(简体)",
  "zh-tw": "中文(繁體)",
  "de-de": "Deutsch",
  "en-us": "English",
  "es-es": "Español",
  "fr-fr": "Français",
  "id-id": "Indonesia",
  "ja-jp": "日本語",
  "ko-kr": "한국어",
  "pt-pt": "Português",
  "ru-ru": "Pусский",
  "th-th": "ภาษาไทย",
  "vi-vn": "Tiếng Việt",
} as const;
export const AVAILABLE_NEWS_TYPE = {
  Latest: "news_all",
  News: "news",
  Events: "events",
  Notices: "notices",
} as const;
export const DEFAULT_LOCALE = "en-us";
