/* eslint-disable @typescript-eslint/no-explicit-any -- Dynamic Sanity preview documents are schema validated. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useClient } from "sanity";
import { Card, Stack, Text } from "@sanity/ui";
import { cmsQuery, emptyCms, validCms, type CmsBundle } from "../../lib/cms";
import { urlFor } from "../lib/image";

type Raw = Record<string, any>; // Sanity document structures are validated by their schemas.
function imageUrl(image: Raw | undefined) { try { return image?.asset ? urlFor(image as never).url() : undefined; } catch { return undefined; } }
function project(raw: Raw): Raw {
  if (raw._type === "sitePage") return { ...raw, _id: raw._id.replace(/^drafts\./, ""), seo: raw.seo ? { ...raw.seo, image: imageUrl(raw.seo.image) } : undefined, sections: raw.sections?.map((b: Raw) => ({ ...b, sectionId: b.section?._ref, url: imageUrl(b.image), pictures: b.pictures?.map((p: Raw) => ({ ...p, url: imageUrl(p) })) })) };
  return { ...raw, _id: raw._id.replace(/^drafts\./, ""), images: raw.images?.map((i: Raw) => ({ ...i, url: imageUrl(i.image) })), slides: raw.slides?.map((s: Raw) => ({ ...s, url: imageUrl(s.image), mobileUrl: imageUrl(s.mobileImage) })), lists: raw.lists?.map((l: Raw) => ({ ...l, items: l.items?.map((i: Raw) => ({ ...i, url: imageUrl(i.image) })) })) };
}
export function ContentPreview({ document }: { document: { displayed: Raw } }) {
  const client = useClient({ apiVersion: "2026-06-03" });
  const frame = useRef<HTMLIFrameElement>(null);
  const [bundle, setBundle] = useState<CmsBundle>(emptyCms);
  const current = document.displayed;
  const snapshot = useMemo(() => {
    const projected = project(current);
    const key = current._type === "sitePage" ? "pages" : "sections";
    return { ...bundle, [key]: [...bundle[key].filter(d => d._id !== projected._id), projected] };
  }, [bundle, current]);
  const rawPath = current._type === "sitePage" ? current.path : current.previewPath;
  const path = typeof rawPath === "string" && rawPath.startsWith("/") && !rawPath.startsWith("//") ? rawPath : "/";
  const send = useCallback(() => frame.current?.contentWindow?.postMessage({ type: "be-cms-preview", bundle: snapshot }, location.origin), [snapshot]);
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = validCms(await client.fetch(cmsQuery.replaceAll(' && !(_id in path("drafts.**"))', ""), {}, { perspective: "raw" }));
        const overlay = <T extends { _id: string }>(docs: T[]) => { const map = new Map<string, T>(); for (const d of [...docs.filter(d => !d._id.startsWith("drafts.")), ...docs.filter(d => d._id.startsWith("drafts."))]) map.set(d._id.replace(/^drafts\./, ""), { ...d, _id: d._id.replace(/^drafts\./, "") }); return [...map.values()]; };
        if (active) setBundle({ ...result, pages: overlay(result.pages), sections: overlay(result.sections) });
      } catch { /* Current edited document can still be previewed. */ }
    };
    void load(); const timer = setInterval(load, 5000);
    return () => { active = false; clearInterval(timer); };
  }, [client]);
  useEffect(() => {
    const handler = (event: MessageEvent) => { if (event.origin === location.origin && event.source === frame.current?.contentWindow && event.data?.type === "be-cms-preview-ready") send(); };
    window.addEventListener("message", handler); send(); const timer = setInterval(send, 1000);
    return () => { window.removeEventListener("message", handler); clearInterval(timer); };
  }, [send]);
  return <Stack space={2} style={{ height: "100%" }}><Card padding={3} tone="primary"><Text size={1}>Draft preview. Publishing is not required to review this content. Enquiry submissions are disabled here.</Text></Card><iframe ref={frame} title="Website draft preview" src={path + (path.includes("?") ? "&" : "?") + "cmsPreview=1"} onLoad={send} style={{ width: "100%", height: "75vh", border: 0, background: "white" }} /></Stack>;
}
