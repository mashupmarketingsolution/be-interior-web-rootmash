import type { StructureResolver } from "sanity/structure";
import { ContentPreview } from "./components/ContentPreview";
import { pageNames, sectionInfo, sharedSections } from "./content-map";

type PageMenu = { title?:string; path?:string; sections?:{_key:string;kind?:string;title?:string;enabled?:boolean;sectionId?:string}[] };
export const structure: StructureResolver = (S, context) => {
 const edit = (id:string,type:string,title:string) => {
  const pane=S.document().schemaType(type).documentId(id).title(title);
  return ["sitePage","siteSection"].includes(type) ? pane.views([S.view.form().title("Edit content"),S.view.component(ContentPreview).id("preview").title("Preview")]) : pane;
 };
 const documentItem=(id:string,type:string,title:string)=>S.listItem().id(id).title(title).child(edit(id,type,title));
 const pages=S.documentTypeList('sitePage').title("Choose a page").defaultOrdering([{field:'title',direction:'asc'}]).child(async id=>{
  let page:PageMenu|undefined;
  try {page=await context.getClient({apiVersion:'2026-06-03'}).withConfig({useCdn:false,perspective:'drafts'}).fetch<PageMenu>('*[_type == "sitePage" && _id == $id][0]{title,path,sections[]{_key,kind,title,enabled,"sectionId":section._ref}}',{id:id.replace(/^drafts\./,'')});} catch {return edit(id,'sitePage',"Edit page");}
  const name=pageNames[page?.path||'']||page?.title||"New page";
  return S.list().id('page-menu-'+id).title(name).items([
   documentItem(id,'sitePage',"Section order, new sections and SEO"),
   S.divider(),
   ...(page?.sections||[]).map((block,index)=>{
    const title=String(index+1).padStart(2,'0')+'. '+(block.kind==='existing'?sectionInfo(block.sectionId).title:block.title||({faq:"Questions and answers",gallery:"Image gallery",cta:"Call to action",text:"Text section"}[block.kind||'text']||"Website section"))+(block.enabled===false?" - Hidden":'');
    return S.listItem().id(block._key).title(title).child(block.kind==='existing'&&block.sectionId?edit(block.sectionId,'siteSection',title):edit(id,'sitePage',"Edit this item in the page section list"));
   })
  ]);
 });
 return S.list().id('content').title("Manage website").items([
  S.listItem().id('sitePage').title("Pages").child(pages),
  S.listItem().id('siteSettings').title("Shared settings / Header and Footer").child(S.list().id('common-settings').title("Shared website settings").items([
   documentItem('siteSettings','siteSettings',"Logo, favicon, menu, font and colours"),
   S.documentTypeListItem('website-settings').title("Phone, WhatsApp, email and address"),
   ...sharedSections.map(id=>documentItem(id,'siteSection',sectionInfo(id).title)),
  ])),
  S.divider(),
  S.listItem().id('projects').title("Projects").child(S.list().id('project-types').title("Project type").items([S.documentTypeListItem('home-projects').title("Home projects"),S.documentTypeListItem('office-projects').title("Office projects")])),
  S.documentTypeListItem('blogs').title("Blogs"),
  S.listItem().id('packages').title("Packages and pricing").child(S.list().id('package-types').title("Package settings").items([S.documentTypeListItem('packageType').title("Home packages / room prices"),S.documentTypeListItem('officePackageType').title("Office packages / price per sqft"),documentItem('siteSettings','siteSettings',"Calculator rules - open Calculation rules")])),
  S.documentTypeListItem('clients').title("Reviews"),
  S.documentTypeListItem('interior-team').title("Team"),
  S.documentTypeListItem('leads').title("Enquiries and follow-up"),
  S.divider(),
  S.documentTypeListItem('siteSection').title("All sections / Advanced"),
 ]);
};
