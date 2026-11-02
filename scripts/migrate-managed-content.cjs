// Run on the staging server with its existing private .env. Never put tokens in this file.
const fs=require('node:fs'),path=require('node:path');
require('dotenv').config({quiet:true});
const defaults=require('../src/content/default-content.json');
const marketing=require('../src/content/package-defaults.json');
const project=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||'production',token=process.env.SANITY_WRITE_TOKEN;
if(!project||!token)throw Error('Server CMS configuration is missing.');
const base='https://'+project+'.api.sanity.io/v2026-06-03/data/';
async function api(endpoint,body){const response=await fetch(base+endpoint,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+token,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error('CMS request failed: '+response.status);return response.json();}
(async()=>{
 const query='*[_type in ["sitePage","siteSection","siteSettings","website-settings","officePackageType","packageType","leads"]]';
 const before=(await api('query/'+dataset+'?perspective=raw&query='+encodeURIComponent(query))).result;
 const backup=process.env.CMS_BACKUP_DIR;if(!backup||!path.isAbsolute(backup))throw Error('Set CMS_BACKUP_DIR to a private absolute backup directory.');
 fs.mkdirSync(backup,{recursive:true,mode:0o700});const file=path.join(backup,'content-before-'+Date.now()+'.json');fs.writeFileSync(file,JSON.stringify(before,null,2),{mode:0o600});
 const mutations=[...defaults.sections,...defaults.pages].map(doc=>({createIfNotExists:doc}));
 // Keep enquiries as authenticated, unpublished records; draft edits win over older published copies.
 for(const lead of before.filter(d=>d._type==='leads'&&!d._id.startsWith('drafts.'))){const draft=before.find(d=>d._id==='drafts.'+lead._id);const doc={...lead,...draft,_id:'drafts.'+lead._id,status:draft?.status||lead.status||'new',receivedAt:lead.receivedAt||lead._createdAt};for(const key of ['_rev','_createdAt','_updatedAt'])delete doc[key];mutations.push({createOrReplace:doc},{delete:{id:lead._id}});}

 for(const doc of before.filter(d=>!d._id.startsWith('drafts.'))){if(['packageType','officePackageType'].includes(doc._type)){const fallback=marketing.find(m=>m.type===doc._type&&m.name.toLowerCase()===doc.packagename?.toLowerCase());mutations.push({patch:{id:doc._id,setIfMissing:{enabled:true,sortOrder:marketing.filter(m=>m.type===doc._type).findIndex(m=>m.name.toLowerCase()===doc.packagename?.toLowerCase()),featured:doc.packagename?.toLowerCase()==='premium',...(fallback?{marketingFeatures:fallback.features}:{})}}});}}
 mutations.push({patch:{id:'siteSettings',setIfMissing:{pricing:{_type:'pricing',interiorMultiplier:0.65,furnitureMultiplier:0.4,completeMultiplier:1},announcement:{_type:'announcement',enabled:false}}}});
 for(let i=0;i<mutations.length;i+=40)await api('mutate/'+dataset,{mutations:mutations.slice(i,i+40)});
 const verify=(await api('query/'+dataset+'?perspective=published&query='+encodeURIComponent('{"pages":count(*[_type == "sitePage"]),"sections":count(*[_type == "siteSection"])}'))).result;
 console.log('CMS_CONTENT_READY',JSON.stringify(verify));
})().catch(()=>{console.error('CMS migration failed; private backup was retained.');process.exitCode=1;});
