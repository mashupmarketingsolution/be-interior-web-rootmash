import { UsersIcon } from "@sanity/icons";
import { banglaString, banglaText } from "./banglaFields";
import { defineField, defineType } from "sanity";

export const ClientType = defineType({
  name: "clients",
  title: "Clients",
  type: "document",
  icon: UsersIcon,
  fields: [
    banglaString("name", "Client name"),
    banglaText("review", "Review"),
    banglaString("designation", "Designation"),
    defineField({name:"enabled",title:"Show on website",type:"boolean",initialValue:true}),
    defineField({name:"sortOrder",title:"Display order (smaller first)",type:"number",initialValue:0}),
    defineField({name:"featured",title:"Featured item",type:"boolean",initialValue:false}),

    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name : "designation",
      title : "Client Designation",
      type : "string",
    }),
    defineField({
      name: "reviewCategory",
      title: "Review Category",
      type: "string",
      options: {
     list: [
            {
              title: "Home Interior",
              value: "home",
            },
            {
              title: "Office Interior",
              value: "office",
            },
            {
              title: "Home Renovation",
              value: "renovation",
            },
          ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientimage",
      title: "Client Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "review",
      title: "Review",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
   preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
      media: 'clientimage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
