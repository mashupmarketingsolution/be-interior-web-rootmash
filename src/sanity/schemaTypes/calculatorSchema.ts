import { banglaText, banglaList } from "./banglaFields";
import { defineField, defineType } from "sanity";
import { Package, Subtitles } from "lucide-react";

export const PackageSchema = defineType({
  name: "packageType",
  title: "Package Type",
  type: "document",
  icon: Package,
  fields: [
    defineField({name:"enabled",title:"Show package",type:"boolean",initialValue:true}),
    defineField({name:"sortOrder",title:"Display order",type:"number",initialValue:0}),
    defineField({name:"featured",title:"Highlight package",type:"boolean"}),
    banglaList("marketingFeatures", "Website package features"),
    defineField({name:"marketingFeatures",title:"Website package features",type:"array",of:[{type:"string"}]}),
    defineField({name:"marketingImage",title:"Website package image",type:"image",options:{hotspot:true}}),

    defineField({
      name: "packagename",
      title: "Package Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "packageitems",
      title: "Package Items",
      type: "array",
      of: [
        {
          type: "object",
          title: "Package Item",
          fields: [
            banglaText("slogan", "Item description"),
            banglaList("furniture", "Furniture"),
            banglaList("accessories", "Accessories"),
            {
              name: "name",
              title: "Item Name",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "slogan",
              title: "Item Slogan",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "price",
              title: "Item Price",
              type: "string",
              validation: (r) => r.required(),
            },
            defineField({
              name: "furniture",
              title: "Furnitures",
              type: "array",
              of: [
                {
                  type: "string",
                },
              ],
              validation: (r) => r.required(),
            }),
            defineField({
              name: "accessories",
              title: "Accessories",
              type: "array",
              of: [
                {
                  type: "string",
                },
              ],
              validation: (r) => r.required(),
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
                title: title,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),
  ],
});