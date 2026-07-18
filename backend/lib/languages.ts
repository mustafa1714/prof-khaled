export const LOCALES = [
  { id: "ar", title: "العربية", isDefault: true },
  { id: "en", title: "English", isDefault: false },
  { id: "tr", title: "Türkçe", isDefault: false },
];

export const DEFAULT_LOCALE = "ar";

export const SUPPORTED_LANGUAGES = LOCALES.map((l) => ({
  id: l.id,
  title: l.title,
}));
