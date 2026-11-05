import type { Language } from "./language";

/** Optional Bangla siblings share the original document, slug, assets and settings. */
export function localizeContent<T>(value: T, language: Language | undefined): T {
  if (language !== "bn" || value == null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(item => localizeContent(item, language)) as T;
  const fields = value as Record<string, unknown>;
  const result = Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, localizeContent(field, language)]));
  for (const [key, field] of Object.entries(fields)) {
    if (!key.endsWith("Bn") || key === "valueBn") continue;
    if ((typeof field === "string" && field.trim()) || (Array.isArray(field) && field.length)) {
      result[key.slice(0, -2)] = field;
    }
  }
  return result as T;
}
