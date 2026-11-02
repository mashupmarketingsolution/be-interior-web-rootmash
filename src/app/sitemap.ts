import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { getCmsBundle } from "@/lib/cms-server";
import { siteUrl, staticPages } from "@/lib/seo";
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const records = await client.fetch<{ _type: string; slug: string; _updatedAt: string }[]>('*[_type in ["blogs", "home-projects", "office-projects"] && seo.noIndex != true && defined(slug.current) && !(_id in path("drafts.**"))]{_type, "slug": slug.current, _updatedAt}');
  const pages = (await getCmsBundle()).pages;
  const paths = new Set([...staticPages.map(([route]) => route as string), ...pages.map(p => p.path)]);
  return [...[...paths].filter(path => !pages.find(p => p.path === path)?.seo?.noIndex).map(route => ({url: siteUrl + (route === "/" ? "" : route)})),
    ...records.map((record) => ({ url: siteUrl + (record._type === "blogs" ? "/blogs/" : "/interior-projects/") + encodeURIComponent(record.slug), lastModified: record._updatedAt }))];
}
