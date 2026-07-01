import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "he", "es", "zh", "ar", "ko", "ja"],
  defaultLocale: "en",
});

export const rtlLocales = ["he", "ar"] as const;
export type Locale = (typeof routing.locales)[number];
