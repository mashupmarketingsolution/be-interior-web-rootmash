import { managedPageMetadata } from "@/lib/cms-server";
import { pageMetadata, staticPages } from "@/lib/seo";
import type { Metadata } from "next";




const seo = staticPages.find(([route]) => route === "/services/office-interior")!;
export async function generateMetadata() { return managedPageMetadata("/services/office-interior"); }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
