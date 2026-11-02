import { managedPageMetadata } from "@/lib/cms-server";
import { pageMetadata, staticPages } from "@/lib/seo";
import type { Metadata } from "next";




const seo = staticPages.find(([route]) => route === "/refund-policy")!;
export async function generateMetadata() { return managedPageMetadata("/refund-policy"); }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
