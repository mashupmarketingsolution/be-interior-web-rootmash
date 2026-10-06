"use client";
import { ChevronDown, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

const groups = [
  { id: "services", label: "Our Services", links: [
    { label: "Home Interior", href: "/services/home-interior" },
    { label: "Office Interior", href: "/services/office-interior" },
    { label: "Portfolio", href: "/interior-projects" },
  ] },
  { id: "more", label: "More", links: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Hire an Architect", href: "/hire-architect" },
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Cancellation & Refund", href: "/refund-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ] },
];
const itemClass = "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 xl:px-4 py-2 text-sm xl:text-base hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-primary";

export default function NavLinks() {
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
    <nav ref={navRef} aria-label="Desktop navigation" className="flex items-center gap-1 xl:gap-3 text-white/80 font-medium"
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null); }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && openGroup) {
          navRef.current?.querySelector<HTMLButtonElement>('[aria-controls="desktop-' + openGroup + '"]')?.focus();
          setOpenGroup(null);
          event.stopPropagation();
        }
      }}>
      {[{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }].map((item) => (
        <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}
          onClick={() => { setOpenGroup(null); if (item.href === "/" && pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={itemClass + (active(item.href) ? " text-primary bg-primary/10" : "")}>{item.label}</Link>
      ))}
      {groups.map((group) => (
        <div key={group.id} className="relative">
          <button type="button" aria-expanded={openGroup === group.id} aria-controls={"desktop-" + group.id}
            onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
            className={itemClass + (group.links.some((item) => active(item.href)) ? " text-primary bg-primary/10" : "")}>
            {group.label}<ChevronDown size={16} className={openGroup === group.id ? "rotate-180" : ""} />
          </button>
          <div id={"desktop-" + group.id} hidden={openGroup !== group.id}
            className="absolute top-full left-0 w-64 pt-3 z-50">
            <div className="flex flex-col rounded-2xl bg-[#111111] border border-white/10 shadow-xl p-2">
              {group.links.map((item) => (
                <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}
                  onClick={() => setOpenGroup(null)}
                  className={"rounded-xl px-4 py-3 text-sm hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary" + (active(item.href) ? " text-primary bg-primary/10" : "")}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button type="button" aria-label="Search projects" aria-haspopup="dialog" aria-expanded={searchModal}
        onClick={() => { setOpenGroup(null); setSearchModal(true); }}
        className="inline-flex items-center gap-2 p-3 xl:px-4 rounded-full hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-primary">
        <Search size={20} /><span className="hidden xl:inline text-sm">Search projects</span>
      </button>
      {searchModal && <SearchModal searchModal={searchModal} setSearchModal={setSearchModal} />}
    </nav>
  );
}
