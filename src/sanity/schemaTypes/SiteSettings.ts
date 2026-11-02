import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { appearanceField, menuField, menuCtaField } from "./SiteDesign";

export const SiteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: ImageIcon,
  groups: [{ name: "branding", title: "Logo & favicon", default: true }, { name: "appearance", title: "Appearance" }, { name: "navigation", title: "Navigation" }],
  fields: [
    appearanceField,
    menuField,
    menuCtaField,
    defineField({
      name: "favicon",
      group: "branding",
      title: "Favicon",
      description: "Browser tab icon. Upload a square PNG (recommended: 512 × 512px) and Publish. Leave empty to use the original favicon. You may need to refresh or reopen the browser tab to see the change.",
      type: "image",
      options: { accept: "image/png" },
    }),
    defineField({
      name: "logo",
      group: "branding",
      title: "Site Logo",
      description: "Used in the header, mobile menu and footer. Upload a transparent PNG or WebP with minimal empty space. Leave empty to use the original BE Interior logo. Publish to apply changes.",
      type: "image",
      options: { accept: "image/png,image/webp,image/jpeg" },
      fields: [defineField({
        name: "alt",
        title: "Alternative Text",
        type: "string",
        initialValue: "BE Interior",
      })],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
