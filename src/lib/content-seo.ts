import { getLanguage } from "./language-server";
import { localizeContent } from "./localized-content";
import { cache } from "react";
import { client } from "@/sanity/lib/client";
export const getBlog = cache(async (slug: string) => localizeContent(await client.fetch(
  '*[_type == "blogs" && slug.current == $slug && !(_id in path("drafts.**"))][0]{..., "seo": seo{title, titleBn, description, descriptionBn, noIndex, "image": image.asset->url}, "slug": slug.current, "coverImage": blogcover.asset->url, "authorImage": authorimage.asset->url, "description": pt::text(content), "descriptionBn": pt::text(contentBn)}', { slug }), await getLanguage()));
export const getProject = cache(async (slug: string) => localizeContent(await client.fetch(
  '*[_type in ["home-projects", "office-projects"] && slug.current == $slug && !(_id in path("drafts.**"))][0]{..., "seo": seo{title, titleBn, description, descriptionBn, noIndex, "image": image.asset->url}, "slug": slug.current, "coverImage": coverimage.asset->url, "galleryImage": gallery[].asset->url}', { slug }), await getLanguage()));
