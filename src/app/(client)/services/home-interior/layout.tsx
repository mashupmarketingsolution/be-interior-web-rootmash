import { managedPageMetadata } from "@/lib/cms-server";
import { pageMetadata, staticPages } from "@/lib/seo";
import type { Metadata } from "next";




const seo = staticPages.find(([route]) => route === "/services/home-interior")!;
export async function generateMetadata() { return managedPageMetadata("/services/home-interior"); }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
