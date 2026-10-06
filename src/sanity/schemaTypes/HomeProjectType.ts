import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const HomeProjectType = defineType({
  name: "home-projects",
  title: "Home-Projects",
  type: "document",
  icon: HomeIcon,
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
      name : "videoLink",
      title: "Project Video Link (ex : yt)",
      type:'url',
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
  preview: {
    select: {
      title: "name",
      subtitle: "size",
      media: "coverimage",
    },
    prepare(selection) {
      const { media, subtitle, title } = selection;
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
