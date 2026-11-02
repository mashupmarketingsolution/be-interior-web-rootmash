const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
let managed = { url: 'https://cdn.sanity.io/images/project/production/icon.png' };
let imageError = false;
let requestedUrl;
const original = Buffer.from([0, 0, 1, 0]);
const png = Buffer.from([137, 80, 78, 71]);
const exported = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/app/favicon.ico/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, {
  exports: exported, URL, URLSearchParams, Uint8Array, Response, process,
  require: (id) => {
    if (id === 'node:fs/promises') return { readFile: async () => original };
    if (id === 'node:path') return { default: require('node:path') };
    if (id === '@/lib/site-logo') return { fetchSiteFavicon: async () => managed };
    if (id === 'axios') return { default: { get: async (url) => {
      requestedUrl = url;
      if (imageError) throw new Error('network unavailable');
      return { data: png, headers: { 'content-type': 'image/png' } };
    } } };
    throw new Error(id);
  },
});
(async () => {
  let result = await exported.GET();
  assert.equal(result.headers.get('content-type'), 'image/png');
  assert.equal(result.headers.get('cache-control'), 'no-store');
  assert.deepEqual(Buffer.from(await result.arrayBuffer()), png);
  assert.equal(new URL(requestedUrl).searchParams.get('w'), '64');
  assert.equal(new URL(requestedUrl).searchParams.get('fm'), 'png');
  for (const state of ['missing', 'network error']) {
    managed = state === 'missing' ? null : { url: 'https://cdn.sanity.io/images/project/production/icon.png' };
    imageError = state === 'network error';
    result = await exported.GET();
    assert.equal(result.headers.get('content-type'), 'image/x-icon');
    assert.deepEqual(Buffer.from(await result.arrayBuffer()), original);
  }
  console.log('PASS: managed favicon PNG response, bounded square transform, no-store cache and original-icon fallback for missing settings/network errors.');
})().catch(error => { console.error(error); process.exitCode = 1; });
