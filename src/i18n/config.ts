export type LocaleCode = (typeof locales)[number];

export const locales = ["en", "zh"] as const;
export const defaultLocale: LocaleCode = "en";
