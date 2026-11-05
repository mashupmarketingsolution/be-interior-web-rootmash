import { getLanguage } from "@/lib/language-server";
import { translate } from "@/lib/language";
import { notFound } from "next/navigation";
import { getBlog } from "@/lib/content-seo";
import { contentMetadata } from "@/lib/seo";
import BlogDetails from "./BlogDetails";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
 const { slug } = await params; const blog = await getBlog(slug); if (!blog) notFound();
 const language = await getLanguage() ?? "en";
 return contentMetadata(blog.blogname + " | BE Interior", (blog.description || translate(language, "Interior design ideas from BE Interior.")).replace(/\s+/g, " ").slice(0, 160), "/blogs/" + encodeURIComponent(slug), blog.coverImage || undefined, blog.seo, language);
}
export default async function Page({ params }: Props) {
 const blog = await getBlog((await params).slug); if (!blog) notFound();
 return <BlogDetails initialBlog={blog} />;
}
