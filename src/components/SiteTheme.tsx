"use client";
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
  return <div className="site-typography" style={style}>{children}</div>;
}
