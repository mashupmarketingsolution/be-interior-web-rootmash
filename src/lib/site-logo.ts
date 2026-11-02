import axios from "axios";

export interface SiteLogo {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const siteLogoQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  "url": logo.asset->url,
  "alt": logo.alt,
  "width": logo.asset->metadata.dimensions.width,
  "height": logo.asset->metadata.dimensions.height
}`;

export const siteFaviconQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  "url": favicon.asset->url,
  "width": favicon.asset->metadata.dimensions.width,
  "height": favicon.asset->metadata.dimensions.height
}`;

export async function fetchSiteFavicon(): Promise<SiteLogo | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return null;
  const { data } = await axios.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/${dataset}`,
    { params: { query: siteFaviconQuery, perspective: "published" }, timeout: 5000 },
  );
  return parseSiteLogo(data.result, projectId, dataset);
}

export function parseSiteLogo(value: unknown, projectId: string, dataset: string): SiteLogo | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.url !== "string") return null;
  try {
    const url = new URL(item.url);
    if (url.origin !== "https://cdn.sanity.io" ||
        !url.pathname.startsWith(`/images/${projectId}/${dataset}/`)) return null;
  } catch { return null; }
  if (typeof item.width !== "number" || !Number.isFinite(item.width) || item.width <= 0 ||
      typeof item.height !== "number" || !Number.isFinite(item.height) || item.height <= 0) return null;
  return {
    url: item.url,
    alt: typeof item.alt === "string" && item.alt.trim() ? item.alt.trim() : "BE Interior",
    width: item.width,
    height: item.height,
  };
}

export async function fetchSiteLogo(signal?: AbortSignal): Promise<SiteLogo | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return null;
  const { data } = await axios.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/${dataset}`,
    { params: { query: siteLogoQuery, perspective: "published" }, timeout: 10000, signal },
  );
  return parseSiteLogo(data.result, projectId, dataset);
}
