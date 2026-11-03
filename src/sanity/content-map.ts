import defaults from "../content/default-content.json";
export const pageNames: Record<string,string> = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/blogs": "Blogs",
  "/hire-architect": "Hire Architect",
  "/interior-projects": "Projects",
  "/services/home-interior": "Home Interior",
  "/services/office-interior": "Office Interior",
  "/services/budget-calculator": "Budget Calculator",
  "/privacy-policy": "Privacy Policy",
  "/terms": "Terms and Conditions",
  "/refund-policy": "Refund Policy"
};
const names:Record<string,[string,string]> = {
  "section-d036fe38185d": [
    "Hero slider",
    "The large images, headings and buttons at the top of the homepage."
  ],
  "section-895eb710140e": [
    "Service cards",
    "The Home Interior and Office Interior cards on the homepage."
  ],
  "section-b90b0c348627": [
    "Workflow",
    "The steps from consultation to final handover."
  ],
  "section-994fa32343da": [
    "Why choose us",
    "The benefits and promises shown on the homepage."
  ],
  "section-37b8a2c22aa5": [
    "Residential projects",
    "Edit this section heading here. Manage project photos and details under Projects."
  ],
  "section-8ac0a3caab4b": [
    "Budget calculator invitation",
    "The Invest in your ideal space section and its calculator button."
  ],
  "section-39381f4c733d": [
    "Office projects",
    "Edit this section heading here. Manage project photos and details under Projects."
  ],
  "section-8829bda372d5": [
    "Comparison",
    "The comparison between BE Interior and other providers."
  ],
  "section-6bda2feda9af": [
    "Customer reviews",
    "The Trusted by visionaries heading. Manage individual reviews under Reviews."
  ],
  "section-adb0c734da06": [
    "WhatsApp invitation",
    "The Your dream interior section and contact button near the bottom of the homepage."
  ],
  "section-4d67118a0e1e": [
    "Hero slider",
    "The large images, headings and buttons at the top of the Home Interior page."
  ],
  "section-8c426c953f30": [
    "Design process",
    "The process section on the Home Interior page."
  ],
  "section-bef92f830c4e": [
    "Home packages section",
    "Edit this heading and button text here. Manage package names, features and prices under Packages."
  ],
  "section-0fb53cd24278": [
    "WhatsApp invitation",
    "The contact invitation on the Home Interior page."
  ],
  "section-7d2161405ba7": [
    "Residential projects",
    "Edit section text here. Manage project photos and details under Projects."
  ],
  "section-64ef308122c5": [
    "Our promises",
    "The benefits and promises for home interior services."
  ],
  "section-b308599ab361": [
    "Customer reviews",
    "Edit section headings here. Manage individual reviews under Reviews."
  ],
  "section-f0e0d8d7c3c1": [
    "Enquiry form",
    "The heading, image and form labels on the Home Interior page."
  ],
  "section-ada934298a1e": [
    "Hero slider",
    "The large images, headings and buttons at the top of the Office Interior page."
  ],
  "section-8abdd6e09c4b": [
    "Office services",
    "The list of services on the Office Interior page."
  ],
  "section-0173da3c8617": [
    "Our promises",
    "The summary of benefits on the Office Interior page."
  ],
  "section-1cef778566e8": [
    "Office packages section",
    "Edit this heading and button text here. Manage package prices, features and images under Packages."
  ],
  "section-03eac0d150b1": [
    "Work process",
    "The detailed work process and promises for office interiors."
  ],
  "section-11179bfeccff": [
    "Office projects",
    "Edit section text here. Manage project photos and details under Projects."
  ],
  "section-c4c19a2b7607": [
    "Customer reviews",
    "Edit section headings here. Manage individual reviews under Reviews."
  ],
  "section-e1663bf0af5e": [
    "Enquiry form",
    "The heading, image and form labels on the Office Interior page."
  ],
  "section-f1fb928664c4": [
    "Founder profile",
    "The founder photo, name and introduction on the About page."
  ],
  "section-c335e81ccd1b": [
    "Company story",
    "The company story and introduction on the About page."
  ],
  "section-16c0083fc386": [
    "Team introduction",
    "Edit section text here. Manage individual members under Team."
  ],
  "section-08e64b4ac0a4": [
    "Contact introduction",
    "The introductory image and text on the Contact page. Manage phone and email details under Shared settings."
  ],
  "section-b6bcd931a809": [
    "Address and map",
    "Edit section text here. Manage the address under Shared settings > Contact information."
  ],
  "section-63787ee750fd": [
    "Enquiry form",
    "The heading, image and form labels on the Contact page."
  ],
  "section-39bbb4c8a8d9": [
    "Booking form",
    "The heading, image and form labels on the Hire Architect page."
  ],
  "section-e7c2c0e3c691": [
    "Consultation invitation",
    "The contact invitation on the Hire Architect page."
  ],
  "section-5fb9f68eddec": [
    "Custom services",
    "The introduction and details for custom services."
  ],
  "section-89892e803d65": [
    "Blog banner",
    "The heading and introduction at the top of the Blogs page."
  ],
  "section-720af0ba771b": [
    "Blog listing",
    "Edit section text here. Create and edit articles under Blogs."
  ],
  "section-31892f5d6fc3": [
    "Project listing",
    "Edit section text here. Manage project photos and details under Projects."
  ],
  "section-0808fc405263": [
    "Budget calculator",
    "Calculator text, labels and images. Manage prices and calculation rules under Packages and Site Settings."
  ],
  "section-ca3a3a105e62": [
    "Privacy policy text",
    "The text on the Privacy Policy page."
  ],
  "section-02902e7dadb4": [
    "Terms and conditions text",
    "The text on the Terms and Conditions page."
  ],
  "section-fcf319c9ba82": [
    "Refund policy text",
    "The text on the Cancellation and Refund Policy page."
  ],
  "section-784ee3257dd1": [
    "Footer",
    "The introduction, links and Facebook image at the bottom of every page. Manage the logo and contact information separately under Shared settings."
  ],
  "section-7907e92a6df3": [
    "Shared call to action",
    "The Ready to transform? section before the footer. Changes apply to every page."
  ],
  "section-aeb845e27560": [
    "Mobile bottom menu",
    "The Booking, Calculator and Call labels and links shown on mobile."
  ],
  "section-afe2ab55e2bf": [
    "Office clients",
    "The text in the office clients section."
  ]
};
export type SectionField = "texts"|"slides"|"images"|"links"|"lists";
export type EditorDocument = {_id?:string;[key:string]:unknown};
export function sectionInfo(id?:string){const clean=id?.replace(/^drafts\./,"");const original=defaults.sections.find(s=>s._id===clean);const pair=clean?names[clean]:undefined;return {id:clean,title:pair?.[0]||original?.title||"Website section",description:pair?.[1]||"Edit the text and images in this section.",path:original?.previewPath||"/",original};}
export function sectionHas(document:EditorDocument|undefined,field:SectionField){const original=sectionInfo(document?._id).original as unknown as Record<string,unknown>|undefined;return (Array.isArray(original?.[field])&&original[field].length>0)||(Array.isArray(document?.[field])&&document[field].length>0);}
export function sectionLocations(id?:string){const clean=id?.replace(/^drafts\./,"");return defaults.pages.filter(p=>p.sections.some(s=>s.section._ref===clean)).map(p=>({title:pageNames[p.path]||p.title,path:p.path}));}
export const sharedSections=["section-784ee3257dd1","section-7907e92a6df3","section-aeb845e27560"];
