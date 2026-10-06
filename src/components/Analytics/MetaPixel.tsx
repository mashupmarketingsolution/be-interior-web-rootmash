"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { pushToDataLayer } from "./dataLayer";

// Direct Pixel owns Meta events. Do not install a duplicate Pixel tag in GTM.
export default function MetaPixel() {
  const pathname = usePathname();
  const configuredPixel = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
  const pixelId = /^\d+$/.test(configuredPixel) ? configuredPixel : "";
  const configuredGtm = process.env.NEXT_PUBLIC_GTM_ID || "";
  const gtmId = process.env.NEXT_PUBLIC_GTM_ENABLED === "true" && /^GTM-[A-Z0-9]+$/.test(configuredGtm) ? configuredGtm : "";
  const [pixelReady, setPixelReady] = useState(false);
  const lastPage = useRef<string | null>(null);
  const lastPixelPage = useRef<string | null>(null);
  const isStudio = pathname.startsWith("/beinterior");
  useEffect(() => {
    if (isStudio || lastPage.current === pathname) return;
    lastPage.current = pathname;
    pushToDataLayer({ event: "page_view", page_path: pathname });
  }, [pathname, isStudio]);
  useEffect(() => {
    if (isStudio || !pixelReady || !window.fbq || lastPixelPage.current === pathname) return;
    lastPixelPage.current = pathname;
    window.fbq("track", "PageView");
  }, [pathname, pixelReady, isStudio]);
  if (isStudio) return null;
  return <>
    {gtmId && <Script id="google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" + gtmId + "');" }} />}
    {pixelId && <Script id="meta-pixel" strategy="afterInteractive" onReady={() => setPixelReady(true)} dangerouslySetInnerHTML={{ __html: "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','" + pixelId + "');" }} />}
  </>;
}
