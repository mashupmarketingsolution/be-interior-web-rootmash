import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";
export const InteriorTeamType = defineType({
  name: "interior-team",
  title: "Interior-Team",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({name:"enabled",title:"Show on website",type:"boolean",initialValue:true}),
    defineField({name:"sortOrder",title:"Display order (smaller first)",type:"number",initialValue:0}),
    defineField({name:"featured",title:"Featured item",type:"boolean",initialValue:false}),

    defineField({
      name: "name",
      title: "Team Member Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "designation",
      title: "Team Member Designation",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "memberimage",
      title: "Team Member Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "memberimage",
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
