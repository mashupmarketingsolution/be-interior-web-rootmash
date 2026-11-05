import bangla from "@/content/bangla.json";

export type Language = "en" | "bn";
export const languageCookie = "bei-language";
export function parseLanguage(value?: string): Language | undefined {
  return value === "en" || value === "bn" ? value : undefined;
}

const dictionary: Readonly<Record<string, string>> = bangla;
export function translate(language: Language, english: string, override?: string | null): string {
  if (language === "en") return english;
  if (override?.trim()) return override;
  const key = english.trim().replace(/\s+/g, " ").toLowerCase();
  const translation = Object.hasOwn(dictionary, key) ? dictionary[key] : undefined;
  return translation ? english.replace(/\S[\s\S]*\S|\S/, translation) : english;
}
