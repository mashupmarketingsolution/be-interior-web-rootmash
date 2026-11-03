"use client";
import React, { type ComponentProps, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCmsSection } from "./ContentProvider";
import { safeContentImage, safeContentLink, textKey } from "@/lib/cms";
import { imageKeys } from "@/content/image-registry";

export function CmsText({ section, entryKey, fallback, original }: { section: string; entryKey?: string; fallback: ReactNode; original?: ReactNode }) {
  const doc = useCmsSection(section);
  if (typeof fallback !== "string") return <>{fallback}</>;
  const entry = doc?.texts?.find(t => t.key === (entryKey || textKey(fallback)));
  if (entry?.value === undefined || entry.value === fallback.trim()) return <>{original ?? fallback}</>;
  const prefix = /^\s/.test(fallback) ? " " : "";
  const suffix = /\s$/.test(fallback) ? " " : "";
  return <>{prefix + entry.value + suffix}</>;
}
export function CmsSection({ section, children }: { section: string; children: ReactNode }) {
  const doc = useCmsSection(section);
  return doc?.enabled === false ? null : <div data-cms-section={section} style={{ display: "contents" }}>{children}</div>;
}
export function CmsImage({ section, ...props }: ComponentProps<typeof Image> & { section: string }) {
  const doc = useCmsSection(section);
  const rawSrc = typeof props.src === "string" ? props.src : "src" in props.src ? props.src.src : props.src.default.src;
  const key = imageKeys[rawSrc];
  const card = doc?.lists?.flatMap(list => list.items).find(item => item.url === rawSrc || (!!key && item.fallbackUrl?.includes(key)));
  const entry = doc?.images?.find(i => i.key === key) || card;
  const src = safeContentImage(entry?.url) ? entry.url : props.src;
  return <Image {...props} src={src} alt={entry?.alt || props.alt} />;
}
export function CmsLink({ section, entryKey, ...props }: ComponentProps<typeof Link> & { section: string; entryKey?: string }) {
  const doc = useCmsSection(section);
  const entry = doc?.links?.find(l => l.key === (entryKey || textKey(String(props.href))));
  const href = safeContentLink(entry?.page) && entry.page !== "custom" ? entry.page : entry?.href;
  return <Link {...props} href={safeContentLink(href) ? href : props.href} />;
}
export function CmsInput({ section, ...props }: ComponentProps<"input"> & { section: string }) {
  const doc = useCmsSection(section);
  const entry = props.placeholder ? doc?.texts?.find(t => t.key === textKey(props.placeholder!)) : undefined;
  return <input {...props} placeholder={entry?.value ?? props.placeholder} />;
}
export function CmsTextarea({ section, ...props }: ComponentProps<"textarea"> & { section: string }) {
  const doc = useCmsSection(section);
  const entry = props.placeholder ? doc?.texts?.find(t => t.key === textKey(props.placeholder!)) : undefined;
  return <textarea {...props} placeholder={entry?.value ?? props.placeholder} />;
}
export function useCmsList<T extends Record<string, unknown>>(section: string, key: string, fallback: T[]): T[] {
  const list = useCmsSection(section)?.lists?.find(l => l.key === key);
  if (!list) return fallback;
  return list.items.filter(i => i.enabled !== false).map((item, index) => {
    const base = fallback[item.templateIndex ?? index] || fallback[0] || {};
    const result: Record<string, unknown> = { ...base };
    const assign = (keys: string[], value: unknown) => { if (value !== undefined) for (const k of keys) if (k in base) result[k] = value; };
    assign(["title", "name", "heading", "topText"], item.title);
    assign(["subtitle", "slogan", "boldText"], item.subtitle);
    assign(["description", "desc", "body", "text"], item.body);
    assign(["points", "features", "items", "details"], item.points);
    assign(["href", "link", "url"], safeContentLink(item.href) ? item.href : undefined);
    assign(["img", "image", "src"], safeContentImage(item.url) ? item.url : undefined);
    assign(["isPopular", "isFeatured"], item.featured);
    if ("id" in base) result.id = item._key || String(index);
    for (const k of ["id", "step", "number", "num"]) if (typeof base[k] === "string" && /^\d+$/.test(base[k] as string)) result[k] = String(index + 1).padStart((base[k] as string).length, "0");
    return result as T;
  });
}
