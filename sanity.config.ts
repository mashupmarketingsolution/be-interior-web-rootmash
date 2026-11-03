"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\beinterior\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { dashboardTool } from "@sanity/dashboard";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { LeadDesk } from "./src/sanity/components/LeadDesk";
import { ContentPreview } from "./src/sanity/components/ContentPreview";
import { RestoreContentAction } from "./src/sanity/components/RestoreContentAction";
import { structure } from "./src/sanity/structure";
import { customStatsWidgetPlugin } from "./src/sanity/widgets/CustomStatsWidget";
export default defineConfig({
  basePath: "/beinterior/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    templates: (templates) => templates.filter((template) => !["siteSettings", "siteSection"].includes(template.schemaType)),
  },
  document: {
    actions: (actions, context) => context.schemaType === "siteSettings"
      ? actions.filter(({ action }) => action !== "delete" && action !== "duplicate")
      : context.schemaType === "leads" ? actions.filter(({action}) => !["publish", "duplicate"].includes(action || "")) : ["sitePage", "siteSection"].includes(context.schemaType) ? [...actions.filter(({action}) => action !== "duplicate" && !(context.schemaType === "siteSection" && action === "delete")), RestoreContentAction] : actions,
  },
  plugins: [
    {name:"enquiry-follow-up",tools:[{name:"enquiries",title:"Enquiries",component:LeadDesk}]},
    structureTool({ structure, defaultDocumentNode: (S, { schemaType }) => ["sitePage", "siteSection"].includes(schemaType) ? S.document().views([S.view.form().title("Edit content"), S.view.component(ContentPreview).id("preview").title("Preview")]) : S.document().views([S.view.form()]) }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    dashboardTool({ widgets: [
      customStatsWidgetPlugin()
    ] }),
  ],
});
