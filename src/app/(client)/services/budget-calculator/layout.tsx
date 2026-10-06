import { pageMetadata, staticPages } from "@/lib/seo";
import type { Metadata } from "next";




const seo = staticPages.find(([route]) => route === "/services/budget-calculator")!;
export const metadata: Metadata = pageMetadata(seo[1], seo[2], seo[0]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
