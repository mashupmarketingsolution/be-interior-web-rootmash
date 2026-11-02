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
   <Text size={2} weight="bold">{isSection?info.title:pageNames[pagePath]||String(value?.title||'নতুন পেজ')}</Text>
   <Text size={1}>{isSection?info.description:'Section-এর নাম খুলে লেখা ও ছবি বদলান। নতুন অংশ যোগ করতে Add item; সাজাতে drag করুন। Search / SEO আলাদা tab-এ আছে।'}</Text>
   {isSection&&<Text size={1} muted>{shared?'সব পেজে ব্যবহার হয় — এখানে বদলালে সব পেজে বদলাবে।':used.length?'যে পেজে আছে: '+used.map(p=>(pageNames[p.path]||p.title)+' ('+p.path+')').join(' · '):'এখন কোনো পেজের section তালিকায় নেই। পেজে যোগ করলে দেখা যাবে।'}</Text>}
   <Text size={1} muted>আগে Preview দেখুন, তারপর Publish করুন। সাময়িক সরাতে দেখান/লুকান switch ব্যবহার করুন।</Text>
  </Stack></Card>
  {props.renderDefault(props)}
 </Stack>;
}
