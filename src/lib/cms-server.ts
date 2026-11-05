import "server-only";
import { getLanguage } from "./language-server";
import { translate } from "./language";
import { localizeContent } from "./localized-content";
import { cmsApiUrl, emptyCms, validCms } from "./cms";
import { pageMetadata, staticPages } from "./seo";
export async function getCmsBundle() {
  const url = cmsApiUrl();
  if (!url) return emptyCms;
  try {
    const response = await fetch(url, { next: { revalidate: 60, tags: ["website-content"] }, signal: AbortSignal.timeout(8000) });
    return response.ok ? validCms((await response.json()).result) : emptyCms;
  } catch { return emptyCms; }
}
export async function managedPageMetadata(path: string) {
  const fallback = staticPages.find(p => p[0] === path) || staticPages[0];
  const [cms, preference] = await Promise.all([getCmsBundle(), getLanguage()]);
  const language = preference ?? "en";
  const page = localizeContent(cms.pages.find(p => p.path === path), language);
  const seo = page?.seo;
  const title = seo?.title || (language === "bn" && path === fallback[0] ? page?.titleBn?.trim() || fallback[1] : page?.title || fallback[1]);
  return { ...pageMetadata(translate(language, title), translate(language, seo?.description || fallback[2]), path, seo?.image, language), ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}) };
}
