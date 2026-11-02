import "server-only";
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
  const page = (await getCmsBundle()).pages.find(p => p.path === path);
  const seo = page?.seo;
  return { ...pageMetadata(seo?.title || page?.title || fallback[1], seo?.description || fallback[2], path, seo?.image), ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}) };
}
