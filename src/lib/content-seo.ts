import { cache } from "react";
import { client } from "@/sanity/lib/client";
export const getBlog = cache((slug: string) => client.fetch(
  '*[_type == "blogs" && slug.current == $slug && !(_id in path("drafts.**"))][0]{..., "seo": seo{title, description, noIndex, "image": image.asset->url}, "slug": slug.current, "coverImage": blogcover.asset->url, "authorImage": authorimage.asset->url, "description": pt::text(content)}', { slug }));
export const getProject = cache((slug: string) => client.fetch(
  '*[_type in ["home-projects", "office-projects"] && slug.current == $slug && !(_id in path("drafts.**"))][0]{..., "seo": seo{title, description, noIndex, "image": image.asset->url}, "slug": slug.current, "coverImage": coverimage.asset->url, "galleryImage": gallery[].asset->url}', { slug }));
