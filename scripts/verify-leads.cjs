const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const crypto=require('node:crypto');
const root=require('node:path').resolve(__dirname, '..');
const ts=require(root+'/node_modules/typescript');
function load(file,imports,env={}){
 const exports={};
 const code=ts.transpileModule(fs.readFileSync(root+'/'+file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{exports,require:name=>{if(!(name in imports))throw Error('Unexpected import '+name);return imports[name];},process:{env},console:{error(){}},Buffer,Date,Map,Set,URL,JSON});return exports;
}
const validation=load('src/lib/lead-validation.ts',{});
const sample={name:' Test Person ',email:'TEST@example.com',phone:'+88 01712-345678',projectInfo:'Test request; mocked storage only.'};
assert.equal(validation.validateLead(sample).data.phone,'01712345678');
assert.equal(validation.validateLead(sample).data.email,'test@example.com');
for(const bad of [null,[],{}, {...sample,phone:'abc'},{...sample,email:'bad'}, {...sample,name:' '},{...sample,projectInfo:'x'.repeat(10001)}, {...sample,eventId:'not-a-uuid'}]) assert.ok(validation.validateLead(bad).error);
const documents=new Map();let fail=false;
const route=load('src/app/api/lead/route.ts',{
 'next/server':{NextResponse:{json:(body,options)=>({body,...options})}},
 'next-sanity':{createClient:()=>({createIfNotExists:async doc=>{if(fail)throw Error('private upstream details');if(!documents.has(doc._id))documents.set(doc._id,doc);return documents.get(doc._id);}})},
 'node:crypto':crypto,
 '@/lib/lead-validation':validation,
},{SANITY_WRITE_TOKEN:'test-only'});
const request=(body,extra={})=>({url:'http://localhost:3000/api/lead',headers:new Headers({'content-type':'application/json',origin:'http://localhost:3000',...extra}),text:async()=>typeof body==='string'?body:JSON.stringify(body)});
(async()=>{
 assert.equal((await route.POST(request({}))).status,400);
 assert.equal((await route.POST(request('{bad'))).status,400);
 assert.equal((await route.POST(request(sample,{'content-type':'text/plain'}))).status,415);
 assert.equal((await route.POST(request(sample,{origin:'https://untrusted.example'}))).status,403);
 assert.equal((await route.POST(request('x'.repeat(25000)))).status,413);
 assert.equal(documents.size,0);
 const eventId=crypto.randomUUID();
 const result=await route.POST(request({...sample,eventId}));assert.equal(result.status,200);assert.equal(result.body.eventId,eventId);assert.equal(result.body.data,undefined);
 await route.POST(request({...sample,eventId}));assert.equal(documents.size,1);
 fail=true;const failure=await route.POST(request({...sample,email:'failure@example.com'}));assert.equal(failure.status,502);assert.ok(!failure.body.error.includes('private'));
 fail=false;for(let i=0;i<3;i++)await route.POST(request({...sample,eventId}));
 assert.equal((await route.POST(request({...sample,eventId}))).status,429);
 console.log('PASS: validation, normalization, content type, malformed/oversized body, origin, idempotency, safe errors, throttling. No external leads created.');
})().catch(error=>{console.error(error);process.exitCode=1;});
