"use client";
import { LocalizedText } from "@/components/Language";
import { ChevronDown, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/components/Language";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";
import { useSiteSettings } from "./useSiteSettings";

const itemClass = "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 xl:px-4 py-2 text-sm xl:text-base hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-primary";
export default function NavLinks() {
  const t = useTranslation();
  const { menu } = useSiteSettings();
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [searchModal, setSearchModal] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const active = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return (
    <nav ref={navRef} aria-label={t("Desktop navigation")} className="flex items-center gap-1 xl:gap-3 text-white/80 font-medium"
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null); }}
      onKeyDown={event => {
        if (event.key === "Escape" && openGroup) {
          navRef.current?.querySelector<HTMLButtonElement>('[aria-controls="desktop-' + openGroup + '"]')?.focus();
          setOpenGroup(null); event.stopPropagation();
        }
      }}>
      {menu.map(item => item.children ? (
        <div key={item.id} className="relative">
          <button type="button" aria-expanded={openGroup === item.id} aria-controls={"desktop-" + item.id}
            onClick={() => setOpenGroup(openGroup === item.id ? null : item.id)}
            className={itemClass + (item.children.some(link => active(link.href)) ? " text-primary bg-primary/10" : "")}>
            <span className="max-w-24 xl:max-w-28 truncate" title={item.label}>{item.label}</span><ChevronDown size={16} className={openGroup === item.id ? "rotate-180" : ""} />
          </button>
          <div id={"desktop-" + item.id} hidden={openGroup !== item.id} className="absolute top-full left-0 w-64 pt-3 z-50">
            <div className="flex max-h-[calc(100dvh-7rem)] flex-col overflow-y-auto overscroll-contain rounded-2xl bg-[#111111] border border-white/10 shadow-xl p-2">
              {item.children.map((link, index) => (
                <Link key={index} href={link.href} aria-current={active(link.href) ? "page" : undefined}
                  onClick={() => setOpenGroup(null)}
                  className={"rounded-xl px-4 py-3 text-sm hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary" + (active(link.href) ? " text-primary bg-primary/10" : "")}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Link key={item.id} href={item.href!} aria-current={active(item.href!) ? "page" : undefined}
          onClick={() => { setOpenGroup(null); if (item.href === "/" && pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={itemClass + (active(item.href!) ? " text-primary bg-primary/10" : "")}><span className="max-w-24 xl:max-w-28 truncate" title={item.label}>{item.label}</span></Link>
      ))}
      <button type="button" aria-label={t("Search projects")} aria-haspopup="dialog" aria-expanded={searchModal}
        onClick={() => { setOpenGroup(null); setSearchModal(true); }}
        className="inline-flex items-center gap-2 p-3 xl:px-4 rounded-full hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-primary">
        <Search size={20} /><span className="hidden xl:inline text-sm"><LocalizedText>{"Search projects"}</LocalizedText></span>
      </button>
      {searchModal && <SearchModal searchModal={searchModal} setSearchModal={setSearchModal} />}
    </nav>
  );
}
