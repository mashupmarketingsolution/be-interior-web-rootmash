import type { StructureResolver } from "sanity/structure";
import { ContentPreview } from "./components/ContentPreview";
import { pageNames, sectionInfo, sharedSections } from "./content-map";

type PageMenu = { title?:string; path?:string; sections?:{_key:string;kind?:string;title?:string;enabled?:boolean;sectionId?:string}[] };
export const structure: StructureResolver = (S, context) => {
 const edit = (id:string,type:string,title:string) => {
  const pane=S.document().schemaType(type).documentId(id).title(title);
  return ["sitePage","siteSection"].includes(type) ? pane.views([S.view.form().title("তথ্য বদলান"),S.view.component(ContentPreview).id("preview").title("Preview দেখুন")]) : pane;
 };
 const documentItem=(id:string,type:string,title:string)=>S.listItem().id(id).title(title).child(edit(id,type,title));
 const pages=S.documentTypeList('sitePage').title('কোন পেজ বদলাবেন?').defaultOrdering([{field:'title',direction:'asc'}]).child(async id=>{
  let page:PageMenu|undefined;
  try {page=await context.getClient({apiVersion:'2026-06-03'}).withConfig({useCdn:false,perspective:'drafts'}).fetch<PageMenu>('*[_type == "sitePage" && _id == $id][0]{title,path,sections[]{_key,kind,title,enabled,"sectionId":section._ref}}',{id:id.replace(/^drafts\./,'')});} catch {return edit(id,'sitePage','পেজ সম্পাদনা');}
  const name=pageNames[page?.path||'']||page?.title||'নতুন পেজ';
  return S.list().id('page-menu-'+id).title(name).items([
   documentItem(id,'sitePage','পেজ সাজান, নতুন section ও SEO'),
   S.divider(),
   ...(page?.sections||[]).map((block,index)=>{
    const title=String(index+1).padStart(2,'0')+'. '+(block.kind==='existing'?sectionInfo(block.sectionId).title:block.title||({faq:'প্রশ্ন ও উত্তর',gallery:'ছবির gallery',cta:'যোগাযোগের button',text:'লেখার অংশ'}[block.kind||'text']||'পেজের অংশ'))+(block.enabled===false?' — লুকানো':'');
    return S.listItem().id(block._key).title(title).child(block.kind==='existing'&&block.sectionId?edit(block.sectionId,'siteSection',title):edit(id,'sitePage','এই অংশ পেজের section তালিকায় সম্পাদনা করুন'));
   })
  ]);
 });
 return S.list().id('content').title('কী পরিবর্তন করবেন?').items([
  S.listItem().id('sitePage').title('পেজ সম্পাদনা / Pages').child(pages),
  S.listItem().id('siteSettings').title('সাধারণ সেটিংস / Header ও Footer').child(S.list().id('common-settings').title('সব পেজের সাধারণ তথ্য').items([
   documentItem('siteSettings','siteSettings','Logo, favicon, menu, font ও রং'),
   S.documentTypeListItem('website-settings').title('Phone, WhatsApp, email ও ঠিকানা'),
   ...sharedSections.map(id=>documentItem(id,'siteSection',sectionInfo(id).title)),
  ])),
  S.divider(),
  S.listItem().id('projects').title('Projects / কাজের ছবি ও তথ্য').child(S.list().id('project-types').title('কোন ধরনের project?').items([S.documentTypeListItem('home-projects').title('বাসার project / Home'),S.documentTypeListItem('office-projects').title('অফিসের project / Office')])),
  S.documentTypeListItem('blogs').title('Blogs / নতুন লেখা'),
  S.listItem().id('packages').title('Packages / দাম ও features').child(S.list().id('package-types').title('Package-এর তথ্য').items([S.documentTypeListItem('packageType').title('Home packages / Room-এর দাম'),S.documentTypeListItem('officePackageType').title('Office packages / প্রতি sqft-এর দাম'),documentItem('siteSettings','siteSettings','Calculator-এর হিসাবের নিয়ম — হিসাব tab খুলুন')])),
  S.documentTypeListItem('clients').title('Reviews / গ্রাহকের মতামত'),
  S.documentTypeListItem('interior-team').title('Team / টিমের সদস্য'),
  S.documentTypeListItem('leads').title('Enquiries / বিস্তারিত ও follow-up'),
  S.divider(),
  S.documentTypeListItem('siteSection').title('সব section / Advanced'),
 ]);
};
