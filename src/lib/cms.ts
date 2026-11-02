export type CmsTextEntry = { key: string; label?: string; value?: string };
export type CmsImageEntry = { key: string; label?: string; url?: string; alt?: string; fallbackUrl?: string };
export type CmsLinkEntry = { key: string; label?: string; href?: string; page?: string };
export type CmsCard = { _key?: string; enabled?: boolean; templateIndex?: number; title?: string; subtitle?: string; body?: string; points?: string[]; href?: string; url?: string; fallbackUrl?: string; alt?: string; featured?: boolean };
export type CmsSlide = { _key: string; enabled?: boolean; title: string; secondTitle?: string; body?: string; buttonLabel?: string; href?: string; action?: string; url?: string; mobileUrl?: string; fallbackUrl?: string; alt?: string };
export type CmsContact = { _id?: string; WhatsAppNumber?: string; footercontactnumber1?: string; footercontactnumber2?: string; footercontactemail?: string; footerlocation?: string; whatsappMessage?: string; openingHours?: string; mapUrl?: string; links?: { platformName: string; url: string }[] };
export type CmsSectionDoc = { _id: string; _type: "siteSection"; title: string; previewPath?: string; enabled?: boolean; slideDelay?: number; slides?: CmsSlide[]; texts?: CmsTextEntry[]; images?: CmsImageEntry[]; links?: CmsLinkEntry[]; lists?: { key: string; label: string; items: CmsCard[] }[] };
export type CmsPageBlock = { _key: string; kind: "existing" | "text" | "faq" | "cta" | "gallery"; sectionId?: string; title?: string; enabled?: boolean; body?: string; href?: string; buttonLabel?: string; url?: string; questions?: { _key: string; question: string; answer: string }[]; pictures?: { _key: string; url: string; alt?: string }[] };
export type CmsPageDoc = { _id: string; _type: "sitePage"; title: string; path: string; updatedDate?: string; sections?: CmsPageBlock[]; seo?: { title?: string; description?: string; noIndex?: boolean; image?: string } };
export type CmsGlobals = {pricing?:{interiorMultiplier?:number;furnitureMultiplier?:number;completeMultiplier?:number};announcement?:{enabled?:boolean;text?:string;href?:string;startsAt?:string;endsAt?:string}};
export type CmsBundle = {globals?:CmsGlobals; sections: CmsSectionDoc[]; pages: CmsPageDoc[]; contact?: CmsContact };
export const emptyCms: CmsBundle = { sections: [], pages: [] };

export function textKey(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.trim().length; i++) hash = Math.imul(hash ^ value.trim().charCodeAt(i), 16777619);
  return "copy-" + (hash >>> 0).toString(16);
}
export function safeContentLink(value: unknown): value is string {
  if (typeof value !== "string" || /[\s\\\u0000-\u001f]/.test(value)) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try { const u = new URL(value); return u.protocol === "https:" && !u.username && !u.password; } catch { return false; }
}
export function safeContentImage(value: unknown): value is string {
  return typeof value === "string" && ((value.startsWith("/") && !value.startsWith("//")) || value.startsWith("https://cdn.sanity.io/images/"));
}
export const cmsQuery = `{
  "globals":*[_id == "siteSettings"][0]{pricing,announcement},
  "sections": *[_type == "siteSection" && !(_id in path("drafts.**"))]{
    _id,_type,title,previewPath,enabled,slideDelay,texts,links,
    "slides":slides[]{_key,enabled,title,secondTitle,body,buttonLabel,href,action,fallbackUrl,alt,"url":image.asset->url,"mobileUrl":mobileImage.asset->url},
    "images":images[]{key,label,alt,fallbackUrl,"url":image.asset->url},
    "lists":lists[]{key,label,"items":items[]{_key,templateIndex,enabled,title,subtitle,body,points,href,alt,featured,fallbackUrl,"url":image.asset->url}}
  },
  "pages": *[_type == "sitePage" && !(_id in path("drafts.**"))]{
    _id,_type,title,path,updatedDate,
    "seo":seo{title,description,noIndex,"image":image.asset->url},
    "sections":sections[]{_key,kind,"sectionId":section._ref,title,enabled,body,href,buttonLabel,questions,"url":image.asset->url,"pictures":pictures[]{_key,alt,"url":asset->url}}
  },
  "contact":*[_type == "website-settings"] | order(_createdAt asc)[0]{_id,WhatsAppNumber,footercontactnumber1,footercontactnumber2,footercontactemail,footerlocation,whatsappMessage,openingHours,mapUrl,links}
}`;
export function cmsApiUrl(query = cmsQuery) {
  const project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  return project && dataset ? `https://${project}.api.sanity.io/v2026-06-03/data/query/${dataset}?perspective=published&query=${encodeURIComponent(query)}` : null;
}
export function validCms(value: unknown): CmsBundle {
  if (!value || typeof value !== "object") return emptyCms;
  const v = value as Partial<CmsBundle>;
  return { globals: v.globals && typeof v.globals === "object" ? v.globals : undefined, sections: Array.isArray(v.sections) ? v.sections.filter(s => s && s._type === "siteSection") : [], pages: Array.isArray(v.pages) ? v.pages.filter(p => p && p._type === "sitePage") : [], contact: v.contact && typeof v.contact === "object" ? v.contact : undefined };
}
