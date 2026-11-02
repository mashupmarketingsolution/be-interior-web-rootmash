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
    defineField({name:"announcement",title:"Announcement / offer",type:"object",fields:[
      defineField({name:"enabled",title:"Show announcement",type:"boolean",initialValue:false}),
      defineField({name:"text",title:"Message",type:"string",validation:r=>r.max(180)}),
      defineField({name:"href",title:"Page link (optional)",type:"string",validation:r=>r.custom(v=>!v||(/^\/(?!\/)/.test(v)||/^https:\/\//.test(v))||"Use a page path or HTTPS address")}),
      defineField({name:"startsAt",title:"Start date / time (optional)",type:"datetime"}),
      defineField({name:"endsAt",title:"End date / time (optional)",type:"datetime"})
    ]}),
    defineField({name:"pricing",title:"Office calculation rules",type:"object",description:"Multiplier applied to the package rate per square foot. Changes affect new estimates immediately after Publish.",fields:[
      defineField({name:"interiorMultiplier",title:"Interior work only",type:"number",initialValue:0.65,validation:r=>r.min(0).max(5)}),
      defineField({name:"furnitureMultiplier",title:"Furniture only",type:"number",initialValue:0.4,validation:r=>r.min(0).max(5)}),
      defineField({name:"completeMultiplier",title:"Complete interior + furniture",type:"number",initialValue:1,validation:r=>r.min(0).max(5)})
    ]}),

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
