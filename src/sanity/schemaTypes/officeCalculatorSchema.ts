import { defineField, defineType } from "sanity";
import { Building2 } from "lucide-react";

export const OfficePackageSchema = defineType({
  name: "officePackageType",
  title: "Office Package Type",
  type: "document",
  icon: Building2,

  fields: [
    defineField({
      name: "packagename",
      title: "Package Name",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "ratePerSft",
      title: "Rate Per Sft",
      type: "number",
      validation: (r) => r.required().min(0),
    }),

    defineField({
      name: "description",
      title: "Package Description",
      type: "text",
    }),

    defineField({
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "exclusions",
      title: "Exclusions",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "addOns",
      title: "Optional Add-ons",
      type: "array",
      of: [
        {
          type: "object",
          title: "Add-on",
          fields: [
            defineField({
              name: "name",
              title: "Add-on Name",
              type: "string",
              validation: (r) => r.required(),
            }),

            defineField({
              name: "price",
              title: "Add-on Price",
              type: "number",
              validation: (r) => r.required().min(0),
            }),
          ],

          preview: {
            select: {
              title: "name",
              subtitle: "price",
            },

            prepare(selection) {
              const { title, subtitle } = selection;

              return {
                title,
                subtitle: subtitle ? `৳${subtitle}` : "",
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "packagename",
      subtitle: "ratePerSft",
    },

    prepare(selection) {
      const { title, subtitle } = selection;

      return {
        title,
        subtitle: subtitle ? `৳${subtitle}/sft` : "",
      };
    },
  },
});
