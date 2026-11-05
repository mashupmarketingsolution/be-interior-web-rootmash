import { defineField, defineArrayMember } from "sanity";
import { defaultCta, getDefaultMenu, menuItemHref, safeMenuHref, sitePages } from "../../lib/site-settings";
import { MenuInput, MenuVisibilityInput } from "../components/MenuInput";

const linkFields = [
  defineField({ name: "labelBn", title: "Menu name (Bangla)", type: "string", validation: rule => rule.max(60) }),
  defineField({ name: "label", title: "Menu name", type: "string", validation: rule => rule.required().max(60) }),
  defineField({ name: "page", title: "Choose a page", type: "string", description: "Pick a website page without typing its address. For a dropdown parent, leave this empty and add dropdown links below.", options: { list: [...sitePages, { title: "Custom link (paste below)", value: "custom" }] } }),
  defineField({ name: "href", title: "Custom link / existing link", type: "string", hidden: ({ parent }) => !!parent?.page && parent.page !== "custom", description: "Use a page path such as /about, or a full https:// link. A selected page above takes priority.", validation: rule => rule.custom(value => !value || safeMenuHref(value) || "Enter a page path or an HTTPS link.") }),
];
const visibilityField = defineField({ name: "enabled", title: "Show in menu", type: "boolean", initialValue: true, components: { input: MenuVisibilityInput }, description: "Turn off to hide this item without losing its name or link. Turn on again to bring it back." });
const visibleLimit = (items: unknown, max: number) => !Array.isArray(items) || items.filter(item => item?.enabled !== false).length <= max || `Keep at most ${max} visible items. Hide others instead of deleting them.`;
const menuPreview = {
  select: { title: "label", href: "href", page: "page", enabled: "enabled" },
  prepare: ({ title, href, page, enabled }: { title?: string; href?: string; page?: string; enabled?: boolean }) => ({
    title,
    subtitle: enabled === false ? "Hidden — turn on Show in menu to restore" : String(menuItemHref({ href, page }) || "Dropdown menu"),
  }),
};
const colorField = (name: string, title: string, initialValue: string) => defineField({
  name, title, type: "string", initialValue,
  description: "Six-digit colour, for example #111111. Clear to restore the original colour.",
  validation: rule => rule.custom(value => !value || /^#[0-9a-f]{6}$/i.test(value) || "Use a six-digit hex colour."),
});
export const appearanceField = defineField({
  name: "appearance", title: "Appearance", type: "object", group: "appearance",
  description: "Publish and refresh to apply. Heading sizes remain fixed; light/dark heading colours stay separate for readability.",
  fields: [
    defineField({ name: "font", title: "Website font", type: "string", initialValue: "poppins", options: { list: [{ title: "Poppins (recommended)", value: "poppins" }, { title: "Geist", value: "geist" }], layout: "radio" } }),
    colorField("accent", "Button and active menu colour", "#e46e00"),
    colorField("headingDark", "Heading colour on light backgrounds", "#111111"),
    colorField("headingLight", "Heading colour on dark backgrounds", "#ffffff"),
  ],
});
export const menuField = defineField({
  name: "menu", title: "Header menu", type: "array", group: "navigation",
  description: "Reorder items by dragging. Desktop and mobile use this same list. Hide items to keep them for later, or restore the original menu with the button below.",
  initialValue: getDefaultMenu(),
  components: { input: MenuInput },
  validation: rule => rule.max(20).custom(items => visibleLimit(items, 6)),
  of: [defineArrayMember({
    name: "menuItem", type: "object", title: "Menu item",
    fields: [visibilityField, ...linkFields, defineField({
      name: "children", title: "Dropdown links", type: "array", validation: rule => rule.max(30).custom(items => visibleLimit(items, 12)),
      of: [defineArrayMember({ name: "menuLink", type: "object", fields: [visibilityField, ...linkFields], preview: menuPreview, validation: rule => rule.custom(value => value?.enabled === false || safeMenuHref(menuItemHref(value || {})) || "Choose a page or add a valid link.") })],
    })],
    validation: rule => rule.custom(value => value?.enabled === false || (Array.isArray(value?.children) && value.children.length > 0) || safeMenuHref(menuItemHref(value || {})) || "Choose a page or add dropdown links."),
    preview: menuPreview,
  })],
});
export const menuCtaField = defineField({
  name: "menuCta", title: "Header button", type: "object", group: "navigation", initialValue: defaultCta,
  fields: linkFields,
  validation: rule => rule.custom(value => !value || safeMenuHref(menuItemHref(value)) || "Choose a page or add a valid button link."),
});
