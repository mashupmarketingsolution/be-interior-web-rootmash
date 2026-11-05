import { LocalizedText } from "@/components/Language";
import { localizeContent } from "@/lib/localized-content";
import { getLanguage } from "@/lib/language-server";
import { notFound } from "next/navigation";
import { getCmsBundle, managedPageMetadata } from "@/lib/cms-server";
import { PageSections } from "@/components/cms/PageSections";
type Props = { params: Promise<{ "not-found": string[] }>; searchParams: Promise<{cmsPreview?: string}> };
export async function generateMetadata({ params }: Props) {
 return managedPageMetadata("/" + (await params)["not-found"].join("/"));
}
export default async function ManagedPage({ params, searchParams }: Props) {
 const path = "/" + (await params)["not-found"].join("/");
 const page = localizeContent((await getCmsBundle()).pages.find(p => p.path === path), await getLanguage());
 if (!page && (await searchParams).cmsPreview !== "1") notFound();
 return <main><h1 className="sr-only"><LocalizedText>{page?.title || "Page preview"}</LocalizedText></h1><PageSections path={path} slots={[]} /></main>;
}
