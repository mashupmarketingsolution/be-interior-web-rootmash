"use client";
import { CmsSection } from "@/components/cms/Editable";
import type { CSSProperties, ReactNode } from "react";
import { useSiteSettings } from "./Header/useSiteSettings";

export default function SiteTheme({ children }: { children: ReactNode }) {
  const { appearance } = useSiteSettings();
  const style = {
    "--site-font-family": appearance.font,
    "--color-primary": appearance.accent,
    "--site-heading-dark": appearance.headingDark,
    "--site-heading-light": appearance.headingLight,
  } as CSSProperties;
  return <CmsSection section="section-cb7269d8ccf2"><div className="site-typography" style={style}>{children}</div></CmsSection>;
}
