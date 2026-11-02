import { defineField, defineType } from "sanity";
import { User, UserIcon } from "lucide-react";

export const LeadType = defineType({
  name: "leads",
  title: "Leads",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({name:"receivedAt",title:"Enquiry received",type:"datetime",readOnly:true}),
    defineField({name:"status",title:"Follow-up status",type:"string",initialValue:"new",options:{list:["new","contacted","quoted","won","lost"]}}),
    defineField({name:"assignedTo",title:"Assigned team member",type:"string"}),
    defineField({name:"followUpAt",title:"Next follow-up",type:"datetime"}),
    defineField({name:"internalNotes",title:"Internal notes",type:"text",rows:6}),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "projectInfo",
      title: "Project-Info",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle,
      };
    },
  },
});
