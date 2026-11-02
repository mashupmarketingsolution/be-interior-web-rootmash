export interface MenuLink { label: string; href: string }
export interface MenuItem { id: string; label: string; href?: string; children?: MenuLink[] }

export const defaultMenu: MenuItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "services", label: "Our services", children: [
    { label: "Home interior", href: "/services/home-interior" },
    { label: "Office interior", href: "/services/office-interior" },
    { label: "Portfolio", href: "/interior-projects" },
  ] },
  { id: "more", label: "More", children: [
    { label: "About us", href: "/about" }, { label: "Contact us", href: "/contact" },
    { label: "Hire an architect", href: "/hire-architect" },
    { label: "Terms and conditions", href: "/terms" },
    { label: "Cancellation & refund", href: "/refund-policy" },
    { label: "Privacy policy", href: "/privacy-policy" },
  ] },
];
export const defaultCta = { label: "Calculate estimate", href: "/services/budget-calculator" };

export const sitePages = [
  { title: "Home", value: "/" }, { title: "Blogs", value: "/blogs" },
  { title: "Home interior", value: "/services/home-interior" },
  { title: "Office interior", value: "/services/office-interior" },
  { title: "Projects", value: "/interior-projects" },
  { title: "About us", value: "/about" }, { title: "Contact us", value: "/contact" },
  { title: "Hire an architect", value: "/hire-architect" },
  { title: "Budget calculator", value: "/services/budget-calculator" },
  { title: "Terms and conditions", value: "/terms" },
  { title: "Cancellation & refund", value: "/refund-policy" },
  { title: "Privacy policy", value: "/privacy-policy" },
];

export function getDefaultMenu() {
  const link = (item: MenuLink, index: number) => ({ ...item, enabled: true, page: item.href, _key: `link-${index}`, _type: "menuLink" });
  return defaultMenu.map(({ id, ...item }) => ({
    ...item, enabled: true, page: item.href, _key: id, _type: "menuItem",
    children: item.children?.map(link),
  }));
}

export function menuItemHref(item: Record<string, unknown>): unknown {
  return sitePages.some(page => page.value === item.page) ? item.page : item.href;
}

export function safeMenuHref(value: unknown): value is string {
  if (typeof value !== "string" || /[\s\\\u0000-\u001f]/.test(value)) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; }
  catch { return false; }
}
const label = (value: unknown) => typeof value === "string" ? value.trim().slice(0, 60) : "";
function parseLink(value: unknown): MenuLink | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const href = menuItemHref(item);
  return label(item.label) && safeMenuHref(href) ? { label: label(item.label), href } : null;
}
export function parseMenu(value: unknown): MenuItem[] {
  if (!Array.isArray(value) || value.length === 0) return defaultMenu;
  const parsed: MenuItem[] = [];
  const visible = value.filter(raw => !raw || typeof raw !== "object" || raw.enabled !== false).slice(0, 6);
  for (const [index, raw] of visible.entries()) {
    if (!raw || typeof raw !== "object") return defaultMenu;
    const item = raw as Record<string, unknown>;
    if (!label(item.label)) return defaultMenu;
    if (Array.isArray(item.children) && item.children.length) {
      const visibleChildren = item.children.filter(child => !child || typeof child !== "object" || child.enabled !== false).slice(0, 12);
      if (!visibleChildren.length) continue;
      const children = visibleChildren.map(parseLink).filter((link): link is MenuLink => !!link);
      if (children.length !== visibleChildren.length) return defaultMenu;
      parsed.push({ id: `menu-${index}`, label: label(item.label), children });
      continue;
    }
    const link = parseLink(item);
    if (!link) return defaultMenu;
    parsed.push({ id: `menu-${index}`, ...link });
  }
  return parsed;
}
export function parseSiteSettings(value: unknown) {
  const item = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const appearance = item.appearance && typeof item.appearance === "object" ? item.appearance as Record<string, unknown> : {};
  const color = (key: string, fallback: string) => typeof appearance[key] === "string" && /^#[0-9a-f]{6}$/i.test(appearance[key] as string) ? appearance[key] as string : fallback;
  return {
    menu: parseMenu(item.menu),
    cta: parseLink(item.menuCta) || defaultCta,
    appearance: {
      font: appearance.font === "geist" ? "var(--font-geist-sans)" : "var(--font-poppins)",
      accent: color("accent", "#e46e00"),
      headingDark: color("headingDark", "#111111"),
      headingLight: color("headingLight", "#ffffff"),
    },
  };
}
