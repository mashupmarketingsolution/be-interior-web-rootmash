import { useEffect, useState } from "react";
import { Card, Stack, Text } from "@sanity/ui";
import { useClient, type ObjectInputProps } from "sanity";
import { pageNames, sectionInfo, sectionLocations, sharedSections, type EditorDocument } from "../content-map";

type Location={title:string;path:string};
export function ContentGuide(props:ObjectInputProps){
 const value=props.value as EditorDocument|undefined;
 const id=value?._id?.replace(/^drafts\./,"");
 const isSection=props.schemaType.name==='siteSection';
 const info=sectionInfo(id);
 const client=useClient({apiVersion:'2026-06-03'});
 const [locations,setLocations]=useState<{id:string;items:Location[]}>();
 useEffect(()=>{if(!isSection||!id)return;let active=true;client.fetch<Location[]>('*[_type == "sitePage" && references($id)]{title,path}',{id},{perspective:'drafts'}).then(items=>{if(active)setLocations({id,items});}).catch(()=>{});return()=>{active=false;};},[client,id,isSection]);
 const used=locations&&locations.id===id?locations.items:sectionLocations(id);
 const shared=!!id&&sharedSections.includes(id);
 const pagePath=typeof value?.path==='string'?value.path:info.path;
 return <Stack space={4}>
  <Card padding={4} radius={2} tone="primary" border><Stack space={3}>
   <Text size={2} weight="bold">{isSection?info.title:pageNames[pagePath]||String(value?.title||"New page")}</Text>
   <Text size={1}>{isSection?info.description:"Open a section to edit its text and images. Use Add item to add a section and drag to reorder. Search and SEO settings have a separate tab."}</Text>
   {isSection&&<Text size={1} muted>{shared?"Shared across all pages. Changes here apply to every page.":used.length?"Used on: "+used.map(p=>(pageNames[p.path]||p.title)+' ('+p.path+')').join(' · '):"Not currently included in a page. Add it to a page to display it."}</Text>}
   <Text size={1} muted>Check Preview before publishing. Use Show on website to hide or restore this section.</Text>
  </Stack></Card>
  {props.renderDefault(props)}
 </Stack>;
}
