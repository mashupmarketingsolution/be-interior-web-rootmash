import { pageMetadata, staticPages } from "@/lib/seo";
import type { Metadata } from "next";
import ClientGlobalWrapper from "@/globalwrapper/ClientGlobalWrapper";
import { getCmsBundle, managedPageMetadata } from "@/lib/cms-server";




const seo = staticPages.find(([route]) => route === "/")!;
export async function generateMetadata() { return managedPageMetadata("/"); }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientGlobalWrapper initialCms={await getCmsBundle()}>{children}</ClientGlobalWrapper>
    </>
  );
}
