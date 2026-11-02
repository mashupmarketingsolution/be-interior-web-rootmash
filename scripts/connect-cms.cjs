const fs=require('fs'),path=require('path'),c=require('crypto'),ts=require('typescript');const defaults=require('../src/content/default-content.json');
const hash=s=>c.createHash('sha1').update(s).digest('hex').slice(0,12);
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(d+'/'+e.name):[d+'/'+e.name]);
let registry='"use client";\nimport dynamic from "next/dynamic";\nimport type { ComponentType } from "react";\nexport const sectionComponents: Record<string,ComponentType> = {\n';
for(const file of [...files('src/components'),...files('src/app/(client)')].filter(f=>f.endsWith('.tsx')&&!f.includes('/cms/'))){const id='section.'+hash(file);if(defaults.sections.some(d=>d._id===id))registry+=JSON.stringify(id)+': dynamic(() => import('+JSON.stringify('@/'+file.slice(4,-4))+')),\n';}
registry+='};\n';fs.writeFileSync('src/components/cms/SectionRegistry.tsx',registry);
// All static-page SEO now comes from its page document, with the existing metadata as fallback.
for(const file of files('src/app/(client)').filter(f=>f.endsWith('/layout.tsx')&&f!=='src/app/(client)/layout.tsx')){
let source=fs.readFileSync(file,'utf8');const match=source.match(/route === ["']([^"']+)["']/);if(match&&source.includes('export const metadata')){source=source.replace(/export const metadata[^;]+;/,'export async function generateMetadata() { return managedPageMetadata('+JSON.stringify(match[1])+'); }');source='import { managedPageMetadata } from "@/lib/cms-server";\n'+source;fs.writeFileSync(file,source);}}
