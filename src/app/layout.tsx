import { pageMetadata, staticPages, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montagu_Slab, Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import MetaPixel from "@/components/Analytics/MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // সব ধরণের ওয়েট
});

const montaguSlab = Montagu_Slab({
  subsets: ["latin"],
  variable: "--font-montagu",
  weight: ["100", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = pageMetadata(staticPages[0][1], staticPages[0][2], "/");

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${geistSans.variable} ${geistMono.variable} ${montaguSlab.variable} ${poppins.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col custom-scrollbar">
        <MetaPixel />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", "@id": siteUrl + "/#organization", name: "BE Interior", url: siteUrl }).replace(/</g, "\\u003c") }} />
        {children}
      </body>

    </html>
  );
}
