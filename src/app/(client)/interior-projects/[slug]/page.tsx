import { getLanguage } from "@/lib/language-server";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/content-seo";
import { contentMetadata } from "@/lib/seo";
import ProjectDetails from "./ProjectDetails";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
 const { slug } = await params; const project = await getProject(slug); if (!project) notFound();
 const language = await getLanguage() ?? "en";
 const description = language === "bn" ? `${project.name}${project.location ? `, ${project.location}` : ""}। বিই ইন্টেরিয়রের প্রকল্পের ছবি ও নকশার বিস্তারিত দেখুন।` : "Explore " + project.name + (project.location ? " in " + project.location : "") + ". View interior project photos and design details by BE Interior.";
 return contentMetadata(project.name + " | BE Interior", description.slice(0, 160), "/interior-projects/" + encodeURIComponent(slug), project.coverImage || undefined, project.seo, language);
}
export default async function Page({ params }: Props) {
 const project = await getProject((await params).slug); if (!project) notFound();
 return <ProjectDetails initialProject={project} />;
}
