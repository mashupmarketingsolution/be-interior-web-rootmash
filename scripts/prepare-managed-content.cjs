/* One-time migration of existing copy/assets into structured CMS defaults. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ts = require('typescript');
if (fs.existsSync('src/content/default-content.json')) throw new Error('Content migration already prepared. Do not regenerate identifiers after editors start using them.');
const hash = text => crypto.createHash('sha1').update(text).digest('hex').slice(0, 12);
const scope = file => 'section.' + hash(file);
const copyKey = text => { let h=2166136261; for(const c of text.trim()) h=Math.imul(h^c.charCodeAt(0),16777619); return 'copy-'+(h>>>0).toString(16); };
const files = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(dir+'/'+e.name):[dir+'/'+e.name]);
const title = value => value.replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const assets={};
fs.mkdirSync('src/content',{recursive:true}); fs.mkdirSync('public/cms-assets',{recursive:true});
let registry='// Stable mapping for original website images. Replacement images live in Sanity.\n';
for(const [index,file] of files('src/logo').filter(f=>/\.(png|jpe?g|webp|gif|avif)$/i.test(f)).entries()) {
  const key='image-'+hash(file),url='/cms-assets/'+key+path.extname(file).toLowerCase();
  fs.copyFileSync(file,'public'+url);assets[file]={key,url};
  registry+=`import asset${index} from ${JSON.stringify('@/'+file.slice(4))};\n`;
}
registry+='export const imageKeys: Record<string,string> = {\n';
Object.entries(assets).forEach(([file,a],index)=>{registry+=` [asset${index}.src]: ${JSON.stringify(a.key)},\n`;});registry+='};\n';
fs.writeFileSync('src/content/image-registry.ts',registry);

const pagePaths={
 'src/app/(client)/page.tsx':'/',
 'src/app/(client)/services/home-interior/page.tsx':'/services/home-interior',
 'src/app/(client)/services/office-interior/page.tsx':'/services/office-interior',
 'src/app/(client)/services/budget-calculator/page.tsx':'/services/budget-calculator',
 'src/app/(client)/interior-projects/page.tsx':'/interior-projects',
 'src/app/(client)/(more)/about/page.tsx':'/about',
 'src/app/(client)/(more)/contact/page.tsx':'/contact',
 'src/app/(client)/(more)/hire-architect/page.tsx':'/hire-architect',
 'src/app/(client)/(more)/blogs/page.tsx':'/blogs',
 'src/app/(client)/(more)/privacy-policy/page.tsx':'/privacy-policy',
 'src/app/(client)/(more)/terms/page.tsx':'/terms',
 'src/app/(client)/(more)/refund-policy/page.tsx':'/refund-policy',
};
const listFiles=new Set([
 'src/components/home/whatwedo/Whatwedo.tsx','src/components/home/WhyChooseUS/Whychooseus.tsx','src/components/home/work-flow/OurWorkFlow.tsx','src/components/home/competetion/Competition.tsx',
 'src/components/home-interior/home-solution/HomeSolution.tsx','src/components/home-interior/home-promise/HomePromise.tsx',
 'src/components/office-interior/office-choose/OfficeChoose.tsx','src/components/office-interior/office-service/OfficeService.tsx','src/components/office-interior/office-work/OfficeWork.tsx',
]);
const heroFiles={
 'src/components/home/Home-section/Slider.tsx':{path:'/',label:'Home — Hero slider',heading:'Home and office interior design in Dhaka — BE Interior',slides:[
  ['Gemini_Generated_Image_home1.png','Redefine your space with modern minimalism','','Transform your home into a clutter-free sanctuary. Be Interior brings you sleek, functional designs with effortless execution.','Start your transformation','/services/home-interior','link'],
  ['Gemini_Generated_Image_home2.png','100% Yours.','Crafting your dream home','From modern kitchens to cozy bedrooms—we design and execute every corner just for you.','Explore home interior','/services/home-interior','link'],
  ['Gemini_Generated_Image_home3.png','Workspaces people love.','','Smart, ergonomic, and stunning interiors that your employees will genuinely enjoy walking into.','Get a free quote','/services/budget-calculator','link'],
 ]},
 'src/components/home-interior/home-interior-slider/HomeInteriorSlider.tsx':{path:'/services/home-interior',label:'Home interior — Hero slider',slides:[
  ['Gemini_Generated_Image_interior1.png','The art of luxury living','','Bespoke interiors for your living, dining, bedroom, and kitchen spaces.','Chat with us','','whatsapp'],
  ['Gemini_Generated_Image_interior2.png','No hidden charges','Plan your investment','Discover the true value of your dream space with our smart estimation tool.','Get a free estimate','/services/budget-calculator?type=home','link'],
 ]},
 'src/components/office-interior/Office-Slider/OfficeInteriorSlider.tsx':{path:'/services/office-interior',label:'Office interior — Hero slider',slides:[
  ['Gemini_Generated_Image_office1.png','Stress-free','','Relocation to your new professional space','Talk to our designer','','whatsapp'],
  ['Gemini_Generated_Image_office2.png','Get premium','Office interior','That your employees will love','Consult now','/contact','link'],
 ]},
};
const originals = new Map();
const componentFiles=files('src/components').filter(f=>f.endsWith('.tsx')&&!/(?:Header|Analytics|skeleton|cms)\//.test(f)&&!/(?:Error|err|Suspense|Skeleton)\.tsx$/i.test(f));
const targets=[...new Set([...componentFiles,...Object.keys(pagePaths)])];
targets.forEach(f=>originals.set(f,fs.readFileSync(f,'utf8')));
const docs={}; const defaults={sections:[],pages:[]};
const sectionLabels={
 'Slider':'Home — Hero slider','Whatwedo':'Home — Service cards','Whychooseus':'Home — Why choose us','OurWorkFlow':'Home — Workflow','Competition':'Home — Comparison',
 'Calculator':'Home — Calculator promotion','HappyCustomers':'Home — Customer reviews','JustClick':'Home — WhatsApp call to action','BeinteriorProject':'Home — Residential projects','Officeproject':'Home — Office projects',
 'AboutFounders':'About — Founder photo and profile','HowitStarted':'About — Company story','Footer':'Shared — Footer text, image and links','BlogDirect':'Shared — Bottom call to action',
 'HomeInteriorSlider':'Home interior — Hero slider','OfficeInteriorSlider':'Office interior — Hero slider','HomePackage':'Home interior — Package cards','OfficePackage':'Office interior — Package cards',
 'HomePromise':'Home interior — Promises','OfficeChoose':'Office interior — Promises','HomeSolution':'Home interior — Process','OfficeService':'Office interior — Services','OfficeWork':'Office interior — Process',
 'ContactForm':'Contact — Form labels','HireForm':'Hire an architect — Form labels','BudgetCalculatorStep1':'Calculator — Labels and pictures',
};
for(const file of targets){
 const name=path.basename(file,'.tsx');
 docs[file]={_id:scope(file),_type:'siteSection',title:sectionLabels[name]||title(name),previewPath:'/',enabled:true,texts:[],images:[],links:[],lists:[]};
}
function resolveImport(file,value){let p=value.startsWith('@/')?'src/'+value.slice(2):path.posix.normalize(path.posix.join(path.posix.dirname(file),value));if(!path.posix.extname(p))p+='.tsx';return p;}
function importsOf(file,s,tree){const map={};for(const st of tree.statements)if(ts.isImportDeclaration(st)&&st.importClause?.name){const module=st.moduleSpecifier.text;map[st.importClause.name.text]={module,file:resolveImport(file,module)};}return map;}
function jsxValue(raw){const lines=raw.split(/\r\n|\n|\r/);let last=0;lines.forEach((l,i)=>{if(/[^\t ]/.test(l))last=i;});let result='';lines.forEach((l,i)=>{l=l.replace(/\t/g,' ');if(i!==0)l=l.replace(/^ +/,'');if(i!==lines.length-1)l=l.replace(/ +$/,'');if(l)result+=l+(i!==last?' ':'');});return result.replace(/&(#x[\da-f]+|#\d+|quot|apos|amp|lt|gt|nbsp|mdash|ndash|hellip|copy);/gi,(_,e)=>{const m={quot:'"',apos:"'",amp:'&',lt:'<',gt:'>',nbsp:' ',mdash:'—',ndash:'–',hellip:'…',copy:'©'};return e[0]==='#'?String.fromCodePoint(e[1].toLowerCase()==='x'?parseInt(e.slice(2),16):parseInt(e.slice(1),10)):m[e.toLowerCase()];});}
function mainFunction(tree){let name;for(const st of tree.statements){if(ts.isFunctionDeclaration(st)&&st.modifiers?.some(m=>m.kind===ts.SyntaxKind.DefaultKeyword))return st;if(ts.isExportAssignment(st)&&ts.isIdentifier(st.expression))name=st.expression.text;}if(name)for(const st of tree.statements)if(ts.isVariableStatement(st))for(const d of st.declarationList.declarations)if(d.name.getText(tree)===name&&(ts.isArrowFunction(d.initializer)||ts.isFunctionExpression(d.initializer)))return d.initializer;return null;}
function staticCopy(n){if(ts.isJsxText(n))return jsxValue(n.text);if(ts.isJsxExpression(n))return n.expression&&ts.isStringLiteral(n.expression)?n.expression.text:null;if(ts.isJsxSelfClosingElement(n))return n.tagName.getText()==='br'?' ':null;if(ts.isJsxElement(n)){let value='';for(const c of n.children){const part=staticCopy(c);if(part===null)return null;value+=part;}return value;}return null;}
function dataValue(n,imps){if(!n)return undefined;if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))return n.text;if(ts.isNumericLiteral(n))return Number(n.text);if(n.kind===ts.SyntaxKind.TrueKeyword)return true;if(n.kind===ts.SyntaxKind.FalseKeyword)return false;if(ts.isIdentifier(n)&&imps[n.text]&&assets[imps[n.text].file])return {asset:assets[imps[n.text].file]};if(ts.isArrayLiteralExpression(n))return n.elements.map(e=>dataValue(e,imps)).filter(v=>v!==undefined);if(ts.isObjectLiteralExpression(n)){const out={};for(const p of n.properties)if(ts.isPropertyAssignment(p)){const key=p.name.getText().replace(/^['"]|['"]$/g,'');const v=dataValue(p.initializer,imps);if(v!==undefined)out[key]=v;}return out;}return undefined;}
function canonical(item,index){return {_key:'card-'+index,_type:'contentCard',enabled:true,templateIndex:index,title:item.title??item.name??item.heading??item.topText,subtitle:item.subtitle??item.slogan??item.boldText,body:item.description??item.desc??item.body??item.text,points:item.points??item.features??item.items??item.details,href:item.href??item.link??item.url,fallbackUrl:(item.img??item.image??item.src)?.asset?.url,featured:item.isPopular??item.isFeatured};}

for(const file of targets){
 if(heroFiles[file])continue;
 const s=originals.get(file),tree=ts.createSourceFile(file,s,99,true,ts.ScriptKind.TSX),imps=importsOf(file,s,tree),doc=docs[file],edits=[],uses=new Set(),textIds=new Set();let hasHook=false;
 const edit=(start,end,text)=>edits.push({start,end,text});
 function addCopy(value,key,label){if(!value.trim()||textIds.has(key))return;doc.texts.push({_key:key,_type:'copy',key,label:label+' — '+value.trim().slice(0,65),value:value.trim()});textIds.add(key);}
 function addImage(asset,alt){if(asset&&!doc.images.some(i=>i.key===asset.key))doc.images.push({_key:asset.key,_type:'picture',key:asset.key,label:alt||'Website image '+(doc.images.length+1),fallbackUrl:asset.url,alt:alt||''});}
 function addLink(href,key,label){if(href&&/^\/(?!\/)|^https:\/\//.test(href)&&!doc.links.some(l=>l.key===key))doc.links.push({_key:key,_type:'buttonLink',key,label:label||href,href});}
 // Seed text in local business-content objects for dynamic card/list labels.
 function seed(n){if(ts.isPropertyAssignment(n)){const key=n.name.getText(tree).replace(/^['"]|['"]$/g,'');if(/^(?:title|name|heading|subtitle|slogan|description|desc|body|text|label|topText|boldText)$/.test(key)&&ts.isStringLiteral(n.initializer))addCopy(n.initializer.text,copyKey(n.initializer.text),title(key));if(/^(?:points|features|items|details)$/.test(key)&&ts.isArrayLiteralExpression(n.initializer))for(const v of n.initializer.elements)if(ts.isStringLiteral(v))addCopy(v.text,copyKey(v.text),'List text');if(/^(?:href|link|url)$/.test(key)&&ts.isStringLiteral(n.initializer))addLink(n.initializer.text,copyKey(n.initializer.text),'Card link');if(['img','image','src'].includes(key)&&ts.isIdentifier(n.initializer))addImage(assets[imps[n.initializer.text]?.file],undefined);}ts.forEachChild(n,seed);}seed(tree);
 function visit(n){
  if(ts.isJsxElement(n)&&/^h[1-6]$/.test(n.openingElement.tagName.getText(tree))){const value=staticCopy(n);if(value&&value.trim()){const key='heading-'+hash(file+':'+n.pos);addCopy(value.trim(),key,'Heading');const a=n.openingElement.end,b=n.closingElement.getStart(tree);edit(a,b,`<CmsText section=${JSON.stringify(doc._id)} entryKey=${JSON.stringify(key)} fallback={${JSON.stringify(value.trim())}} original={< >${s.slice(a,b)}</ >} />`.replace('< >','<>').replace('</ >','</>'));uses.add('CmsText');return;}}
  if(ts.isJsxText(n)){const value=jsxValue(n.text);if(/[\p{L}\p{N}]/u.test(value)&&value.trim().length>1){let p=n.parent;const tag=ts.isJsxElement(p)?p.openingElement.tagName.getText(tree):'';if(!['option','style','script','title'].includes(tag)){const key='text-'+hash(file+':'+n.pos);addCopy(value,key,/button|Link|label/.test(tag)?'Label':'Text');edit(n.pos,n.end,`<CmsText section=${JSON.stringify(doc._id)} entryKey=${JSON.stringify(key)} fallback={${JSON.stringify(value)}} />`);uses.add('CmsText');}}return;}
  if(ts.isJsxExpression(n)&&ts.isJsxElement(n.parent)&&n.expression){const exp=n.expression;let wrap=false;if(ts.isIdentifier(exp))wrap=/^(?:item|feature|point|step|promise|benefit|option|text|title|subtitle|description|label|name)$/.test(exp.text);if(ts.isPropertyAccessExpression(exp))wrap=/^(?:title|name|heading|subtitle|slogan|description|desc|body|text|label|topText|boldText)$/.test(exp.name.text);if(ts.isConditionalExpression(exp)&&ts.isStringLiteral(exp.whenTrue)&&ts.isStringLiteral(exp.whenFalse)){for(const v of [exp.whenTrue.text,exp.whenFalse.text])addCopy(v,copyKey(v),'Button label');wrap=true;}if(wrap){edit(n.getStart(tree),n.end,`<CmsText section=${JSON.stringify(doc._id)} fallback={${exp.getText(tree)}} />`);uses.add('CmsText');return;}}
  if(ts.isJsxOpeningElement(n)||ts.isJsxSelfClosingElement(n)){
   const tag=n.tagName.getText(tree),module=imps[tag]?.module;
   if(module==='next/image'){
    uses.add('CmsImage');edit(n.tagName.getStart(tree),n.tagName.end,'CmsImage');edit(n.tagName.end,n.tagName.end,` section=${JSON.stringify(doc._id)}`);
    const src=n.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.getText(tree)==='src');const alt=n.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.getText(tree)==='alt');
    const altText=alt&&ts.isStringLiteral(alt.initializer)?alt.initializer.text:'';
    if(src&&ts.isJsxExpression(src.initializer)&&src.initializer.expression&&ts.isIdentifier(src.initializer.expression))addImage(assets[imps[src.initializer.expression.text]?.file],altText);
   }
   if(module==='next/link'){
    const href=n.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.getText(tree)==='href');let key;
    if(href&&ts.isStringLiteral(href.initializer)){key='link-'+hash(file+':'+n.pos);addLink(href.initializer.text,key,'Button destination');}
    else if(href&&ts.isJsxExpression(href.initializer)&&href.initializer.expression&&ts.isStringLiteral(href.initializer.expression)){key='link-'+hash(file+':'+n.pos);addLink(href.initializer.expression.text,key,'Button destination');}
    uses.add('CmsLink');edit(n.tagName.getStart(tree),n.tagName.end,'CmsLink');edit(n.tagName.end,n.tagName.end,` section=${JSON.stringify(doc._id)}${key?' entryKey='+JSON.stringify(key):''}`);
   }
   if(['input','textarea'].includes(tag)){
    const ph=n.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.getText(tree)==='placeholder');
    if(ph&&ts.isStringLiteral(ph.initializer)){addCopy(ph.initializer.text,copyKey(ph.initializer.text),'Input placeholder');uses.add(tag==='input'?'CmsInput':'CmsTextarea');edit(n.tagName.getStart(tree),n.tagName.end,tag==='input'?'CmsInput':'CmsTextarea');edit(n.tagName.end,n.tagName.end,` section=${JSON.stringify(doc._id)}`);}
   }
  }
  if(ts.isJsxClosingElement(n)){const module=imps[n.tagName.getText(tree)]?.module;if(module==='next/image')edit(n.tagName.getStart(tree),n.tagName.end,'CmsImage');if(module==='next/link')edit(n.tagName.getStart(tree),n.tagName.end,'CmsLink');if(n.tagName.getText(tree)==='textarea'){const op=n.parent.openingElement;const ph=op.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.getText(tree)==='placeholder');if(ph&&ts.isStringLiteral(ph.initializer))edit(n.tagName.getStart(tree),n.tagName.end,'CmsTextarea');}}
  ts.forEachChild(n,visit);
 }
 visit(tree);
 const fn=mainFunction(tree);
 if(listFiles.has(file)&&fn&&ts.isBlock(fn.body))for(const st of fn.body.statements)if(ts.isVariableStatement(st))for(const d of st.declarationList.declarations)if(d.initializer&&ts.isArrayLiteralExpression(d.initializer)){
  const value=dataValue(d.initializer,imps);
  if(value?.length&&value.every(v=>v&&typeof v==='object'&&!Array.isArray(v))){
   const key=d.name.getText(tree);doc.lists.push({_key:key,_type:'contentList',key,label:title(key),items:value.map(canonical)});
   edit(d.initializer.getStart(tree),d.initializer.getStart(tree),`useCmsList(${JSON.stringify(doc._id)}, ${JSON.stringify(key)}, `);edit(d.initializer.end,d.initializer.end,')');uses.add('useCmsList');hasHook=true;
  }
 }
 if(fn&&ts.isBlock(fn.body)){
  function returns(n){if(n!==fn.body&&(ts.isArrowFunction(n)||ts.isFunctionExpression(n)||ts.isFunctionDeclaration(n)))return;if(ts.isReturnStatement(n)&&n.expression){let expr=n.expression;while(ts.isParenthesizedExpression(expr))expr=expr.expression;if(ts.isJsxElement(expr)||ts.isJsxSelfClosingElement(expr)||ts.isJsxFragment(expr)){edit(expr.getStart(tree),expr.getStart(tree),`<CmsSection section=${JSON.stringify(doc._id)}>`);edit(expr.end,expr.end,'</CmsSection>');uses.add('CmsSection');}}ts.forEachChild(n,returns);}returns(fn.body);
 }
 if(uses.size){let out=s;for(const e of edits.sort((a,b)=>b.start-a.start||b.end-a.end))out=out.slice(0,e.start)+e.text+out.slice(e.end);out=`import { ${[...uses].join(', ')} } from "@/components/cms/Editable";\n`+out;if(hasHook||s.trimStart().startsWith('"use client"')||s.trimStart().startsWith("'use client'")){out=out.replace(/(?:"use client"|'use client');?\s*/,'');out='"use client";\n'+out;}fs.writeFileSync(file,out);}
}

// Explicit hero data supports adding, hiding and reordering slides.
const heroes={};
for(const [file,h] of Object.entries(heroFiles)){
 const doc=docs[file];doc.title=h.label;doc.previewPath=h.path;
 doc.slides=h.slides.map((s,index)=>{const assetFile=Object.keys(assets).find(f=>f.toLowerCase().endsWith('/'+s[0].toLowerCase()));if(!assetFile)throw new Error('Missing hero image '+s[0]);return {_key:'slide-'+index,_type:'heroSlide',enabled:true,title:s[1],secondTitle:s[2],body:s[3],buttonLabel:s[4],href:s[5],action:s[6],fallbackUrl:assets[assetFile].url,alt:s[1]};});
 heroes[doc._id]=doc.slides;
 fs.writeFileSync(file,`"use client";\nimport { CmsHero } from "@/components/cms/CmsHero";\nexport default function ManagedHero() { return <CmsHero section=${JSON.stringify(doc._id)}${h.heading?' screenReaderHeading='+JSON.stringify(h.heading):''} />; }\n`);
}
fs.writeFileSync('src/content/hero-defaults.json',JSON.stringify(heroes,null,2));

// Preserve each page's original designed components while making their order/visibility editable.
for(const [file,pagePath] of Object.entries(pagePaths)){
 const original=originals.get(file),tree=ts.createSourceFile(file,original,99,true,ts.ScriptKind.TSX),imps=importsOf(file,original,tree),fn=mainFunction(tree);
 const page={_id:'page.'+(pagePath==='/'?'home':pagePath.slice(1).replaceAll('/','-')),_type:'sitePage',title:pagePath==='/'?'Home':title(pagePath.split('/').pop()),path:pagePath,lockedPath:true,updatedDate:'2026-11-03',sections:[]};
 if(!fn||!ts.isBlock(fn.body)){defaults.pages.push(page);continue;}
 const ret=fn.body.statements.find(st=>ts.isReturnStatement(st));let root=ret?.expression;while(root&&ts.isParenthesizedExpression(root))root=root.expression;
 if(!root||!ts.isJsxElement(root)){defaults.pages.push(page);continue;}
 function slotFile(n){if(ts.isJsxElement(n)||ts.isJsxSelfClosingElement(n)){const name=(ts.isJsxElement(n)?n.openingElement:n).tagName.getText(tree);if(imps[name]?.module.startsWith('@/components/'))return imps[name].file;if(ts.isJsxElement(n))for(const child of n.children){const found=slotFile(child);if(found)return found;}}return null;}
 const candidates=root.children.filter(n=>(ts.isJsxElement(n)||ts.isJsxSelfClosingElement(n))&&slotFile(n));
 if(candidates.length){
  const slots=[];
  for(const [i,n] of candidates.entries()){
   let target=slotFile(n);if(target==='src/components/home/Home-section/HomeSection.tsx')target='src/components/home/Home-section/Slider.tsx';
   const id=scope(target),name=docs[target]?.title||title(path.basename(target,'.tsx'));
   if(docs[target])docs[target].previewPath=pagePath;
   page.sections.push({_key:'section-'+i,_type:'pageSection',kind:'existing',section:{_type:'reference',_ref:id},title:name,enabled:true});slots.push(`{ id: ${JSON.stringify(id)}, node: (${n.getText(tree)}) }`);
  }
  // Apply to the original root. These app pages contain no additional business copy outside their sections except the screen-reader heading.
  let next=original;const start=candidates[0].getStart(tree),end=candidates.at(-1).end;
  next=next.slice(0,start)+`<PageSections path=${JSON.stringify(pagePath)} slots={[${slots.join(',\n')}]} />`+next.slice(end);
  next='import { PageSections } from "@/components/cms/PageSections";\n'+next;
  fs.writeFileSync(file,next);
 } else {
  const own=docs[file];own.previewPath=pagePath;page.sections.push({_key:'section-0',_type:'pageSection',kind:'existing',section:{_type:'reference',_ref:own._id},title:own.title,enabled:true});
  const current=fs.readFileSync(file,'utf8');
  // Policy pages keep their existing content component; its visibility and text are managed through the section document.
 }
 defaults.pages.push(page);
}
// Resolve preview paths for sections by category and remove wrapper-only empty documents.
for(const [file,doc] of Object.entries(docs)){
 if(doc.previewPath==='/'){
  if(file.includes('/home-interior/'))doc.previewPath='/services/home-interior';else if(file.includes('/office-interior/'))doc.previewPath='/services/office-interior';else if(file.includes('/about/'))doc.previewPath='/about';else if(file.includes('/contact/'))doc.previewPath='/contact';else if(file.includes('/hire-architect/'))doc.previewPath='/hire-architect';else if(file.includes('/blogs/')&&!file.includes('blogDirect'))doc.previewPath='/blogs';else if(file.includes('/calculator/'))doc.previewPath='/services/budget-calculator';else if(file.includes('/interior-project/'))doc.previewPath='/interior-projects';
 }
 if(doc.texts.length||doc.images.length||doc.links.length||doc.lists.length||doc.slides)defaults.sections.push(doc);
}
// Some designed wrappers have no copy of their own but are page section targets.
for(const page of defaults.pages)for(const block of page.sections)if(!defaults.sections.some(s=>s._id===block.section._ref)){const doc=Object.values(docs).find(s=>s._id===block.section._ref);if(doc)defaults.sections.push(doc);}
fs.writeFileSync('src/content/default-content.json',JSON.stringify(defaults,null,2));
console.log(JSON.stringify({sections:defaults.sections.length,pages:defaults.pages.length,textEntries:defaults.sections.reduce((n,d)=>n+d.texts.length,0),images:defaults.sections.reduce((n,d)=>n+d.images.length,0),assetCount:Object.keys(assets).length},null,2));
