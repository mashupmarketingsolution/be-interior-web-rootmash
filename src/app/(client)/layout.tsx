import { getLanguage } from "@/lib/language-server";
import ClientGlobalWrapper from "@/globalwrapper/ClientGlobalWrapper";
import { getCmsBundle, managedPageMetadata } from "@/lib/cms-server";




export async function generateMetadata() { return managedPageMetadata("/"); }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cms, language] = await Promise.all([getCmsBundle(), getLanguage()]);
  return (
    <>
      <ClientGlobalWrapper initialCms={cms} initialLanguage={language}>{children}</ClientGlobalWrapper>
    </>
  );
}
