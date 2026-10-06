import { Flame } from "lucide-react";
import { defineField, defineType } from "sanity";

export const BlogSchemtype = defineType({
  name: "blogs",
  title: "Blogs",
  type: "document",
  icon: Flame,
  fields: [
    defineField({ name: "seo", title: "SEO (optional)", type: "seo" }),
    defineField({
      name: "blogname",
      title: "Blog Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "blogname",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "blogcover",
      title: "Blog Cover",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "blogcategory",
      title: "Blog Category",
      type: "string",
      options: {
        list: [
          {
            title: "home interior",
            value: "home-interior",
          },
          {
            title: "styling",
            value: "styling",
          },
          {
            title: "tips&tricks",
            value: "tips",
          },
          {
            title: "office interior",
            value: "office",
          },
          {
            title: "design trends",
            value: "design-trends",
          },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authorname",
      title: "Author name",
      type: "string",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "authorimage",
      title: "Author Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "authorrole",
      title: "Author Role",
      type: "string",
      validation: (R) => R.required(),
    }),
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
    {
      name: "readTime",
      title: "Read Time (e.g., 5 min read)",
      type: "string",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "publishedDate",
      title: "Published Date",
      type: "date",
      options: {
        dateFormat: "MMMM D, YYYY",
        calendarTodayLabel: "Today",
      },
      validation: (r) => r.required(),
    },
  ],
  preview: {
    select: {
      title: "blogname",
      subtitle: "authorname",
      media: "blogcover",
    },
    prepare(selection) {
      const { media, title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
