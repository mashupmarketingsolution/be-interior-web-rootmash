"use client";
import { useLanguage } from "@/components/Language";
import React, { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCms } from "./ContentProvider";
import { safeContentImage, safeContentLink, type CmsPageBlock } from "@/lib/cms";
import { sectionComponents } from "./SectionRegistry";

function CustomBlock({ block }: { block: CmsPageBlock }) {
  return <section className="bg-ivory px-6 py-16 md:py-20" data-custom-section={block._key}>
    <div className="mx-auto max-w-6xl">
      {block.title && <h2 data-heading-tone="dark" className="mb-8 text-center">{block.title}</h2>}
      {block.body && <div className="mx-auto mb-8 max-w-3xl whitespace-pre-line text-zinc-600 leading-relaxed">{block.body}</div>}
      {block.kind === "faq" && <div className="mx-auto max-w-3xl space-y-4">{block.questions?.map(q => <details key={q._key} className="rounded-xl border border-zinc-200 bg-white p-5"><summary className="cursor-pointer font-semibold">{q.question}</summary><p className="mt-4 whitespace-pre-line text-zinc-600">{q.answer}</p></details>)}</div>}
      {safeContentImage(block.url) && <div className="relative mx-auto mb-8 aspect-video max-w-4xl overflow-hidden rounded-2xl"><Image src={block.url} alt={block.title || "BE Interior"} fill sizes="(max-width: 768px) 100vw, 1024px" className="object-cover" /></div>}
      {block.kind === "gallery" && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{block.pictures?.filter(p => safeContentImage(p.url)).map(p => <div key={p._key} className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={p.url} alt={p.alt || block.title || "BE Interior"} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div>)}</div>}
      {block.buttonLabel && safeContentLink(block.href) && <div className="mt-8 text-center"><Link href={block.href} className="inline-flex rounded-xl bg-primary px-7 py-3.5 font-semibold text-white">{block.buttonLabel}</Link></div>}
    </div>
  </section>;
}
export function PageSections({ path, slots }: { path: string; slots: { id: string; node: ReactNode }[] }) {
  const page = useCms().pages.find(p => p.path === path);
  if (!page?.sections) return <>{slots.map((slot, i) => <React.Fragment key={slot.id + i}>{slot.node}</React.Fragment>)}</>;
  return <>{page.sections.filter(b => b.enabled !== false).map(b => {
    if (b.kind !== "existing") return <CustomBlock key={b._key} block={b} />;
    const slot = slots.find(s => s.id === b.sectionId);
    const Component = sectionComponents[b.sectionId || ""];
    return <React.Fragment key={b._key}>{slot?.node ?? (Component ? <Component /> : null)}</React.Fragment>;
  })}</>;
}

export function CmsUpdatedDate({ path }: { path: string }) {
  const language = useLanguage();
  const page = useCms().pages.find(p => p.path === path);
  return <>{new Date((page?.updatedDate || "2026-11-03") + "T00:00:00Z").toLocaleDateString(language === "bn" ? "bn-BD" : "en-GB", { timeZone: "UTC" })}</>;
}
