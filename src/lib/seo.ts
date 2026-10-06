import type { Metadata } from "next";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://beinterior.com.bd").replace(/\/$/, "");
export function pageMetadata(title: string, description: string, route: string, image = "/opengraph-image"): Metadata {
  return { title, description, metadataBase: new URL(siteUrl), alternates: { canonical: route },
    openGraph: { type: "website", siteName: "BE Interior", title, description, url: route, images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] } };
}
export const staticPages = [
  ["/", "Interior Design in Dhaka | BE Interior", "Explore home and office interior design in Dhaka with BE Interior. View our projects, estimate your budget and discuss your space with our team."],
  ["/about", "About BE Interior | Our Design Team", "Meet BE Interior and learn about our approach to planning, designing and delivering home and office interiors in Dhaka."],
  ["/contact", "Contact BE Interior | Discuss Your Project", "Contact BE Interior to discuss your home or office interior project. Send an enquiry, call our team or connect on WhatsApp."],
  ["/hire-architect", "Hire an Architect in Dhaka | BE Interior", "Discuss your space with BE Interior's architecture and interior design team. Tell us your requirements and request a consultation."],
  ["/blogs", "Interior Design Ideas & Guides | BE Interior", "Read BE Interior's articles on home and office design, space planning, materials and ideas for your next interior project."],
  ["/interior-projects", "Home & Office Interior Projects | BE Interior", "Browse BE Interior's residential and office interior portfolio. Explore project photos, locations and design details."],
  ["/services/home-interior", "Home Interior Design in Dhaka | BE Interior", "Plan your home interior with BE Interior. Explore residential design services, room ideas, packages and completed home projects."],
  ["/services/office-interior", "Office Interior Design in Dhaka | BE Interior", "Create a functional workspace with BE Interior. Explore office design services, project examples and options for your team and budget."],
  ["/services/budget-calculator", "Interior Cost Calculator | BE Interior", "Estimate your home or office interior budget. Choose your space, requirements and package, then request a detailed quote from BE Interior."],
  ["/terms", "Terms and Conditions | BE Interior", "Read the terms and conditions for using BE Interior's website and services."],
  ["/privacy-policy", "Privacy Policy | BE Interior", "Learn how BE Interior handles personal information, enquiries and website data in our privacy policy."],
  ["/refund-policy", "Cancellation & Refund Policy | BE Interior", "Read BE Interior's cancellation and refund policy before booking interior design services."],
] as const;

export type SeoOverrides = { title?: string; description?: string; image?: string; noIndex?: boolean };
export function contentMetadata(title: string, description: string, route: string, coverImage?: string, seo?: SeoOverrides | null): Metadata {
  const clean = (value?: string) => value?.replace(/\s+/g, " ").trim();
  return {
    ...pageMetadata(clean(seo?.title) || title, clean(seo?.description) || description, route, clean(seo?.image) || coverImage || undefined),
    robots: { index: seo?.noIndex !== true, follow: true },
  };
}
