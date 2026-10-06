import { defineField, defineType } from "sanity";
import { DesktopIcon } from "@sanity/icons";

export const OfficeProjectType = defineType({
  name: "office-projects",
  title: "Office-Projects",
  type: "document",
  icon: DesktopIcon,
  fields: [
    defineField({ name: "seo", title: "SEO (optional)", type: "seo" }),
    defineField({
      name: "name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectCategory",
      title: "Project Category",
      type: "string",
      options: {
        list: [
          {
            title: "Top Office Interior",
            value: "top",
          },
          {
            title: "Normal Office Interior",
            value: "normal",
          },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverimage",
      title: "Project Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [{ type: "image" }],
      options: { layout: "grid" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoLink",
      title: "Project Video Link (ex : yt)",
      type: "url",
    }),
    defineField({
      name: "size",
      title: "Project Size",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Project Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
