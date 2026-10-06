import { defineField, defineType } from "sanity";

export const SeoType = defineType({
  name: "seo",
  title: "SEO (optional)",
  type: "object",
  description: "Leave empty to use the post title, content and cover image automatically.",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string",
      description: "Optional full search title, including BE Interior if needed. Aim for about 50–60 characters; Google may show a different title.",
      validation: (rule) => rule.max(60).warning("This title may be shortened in search results.") }),
    defineField({ name: "description", title: "Search description", type: "text", rows: 3,
      description: "Summarize this specific page. Aim for about 140–160 characters. Leave empty for an automatic summary.",
      validation: (rule) => rule.max(160).warning("This description may be shortened in search results.") }),
    defineField({ name: "image", title: "Social sharing image", type: "image", options: { hotspot: true },
      description: "Optional. Uses the post cover when empty. A 1200 × 630 image works well." }),
    defineField({ name: "noIndex", title: "Hide this page from search engines", type: "boolean", initialValue: false,
      description: "Normally leave OFF. Turning this on requests no indexing and removes the page from the sitemap. The page remains publicly accessible." }),
  ],
});
