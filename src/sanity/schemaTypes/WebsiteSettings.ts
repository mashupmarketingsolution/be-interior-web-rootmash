import { defineField, defineType, defineArrayMember } from "sanity";
import { WrenchIcon } from "@sanity/icons";

export const WebsiteSettingsType = defineType({
  name: "website-settings",
  title: "Website Settings",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({name:"openingHours",title:"Opening hours",type:"string"}),
    defineField({name:"whatsappMessage",title:"Default WhatsApp greeting",type:"text",rows:3}),
    defineField({
      name: "WebSiteSettings",
      title: "WebSite Settings",
      type: "string",
    }),
    defineField({
      name: "WhatsAppNumber",
      title: "Contact WhatsApp",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footercontactnumber1",
      title: "Footer Contact Number 1",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footercontactnumber2",
      title: "Footer Contact Number 2",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footercontactemail",
      title: "Footer Contact email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerlocation",
      title: "Footer location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialLink",
          type: "object",
          fields: [
            {
              name: "platformName",
              title: "Platform Name (e.g Facebook)",
              type: "string",
            },
            {
              name: "url",
              title: "URL link",
              type: "url",
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
