const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('src/lib/site-logo.ts', 'utf8');
let request;
let response;
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
} }).outputText, {
  exports: exportsObject,
  require: () => ({ default: { get: async (url, options) => {
    request = { url, options };
    if (response instanceof Error) throw response;
    return { data: { result: response } };
  } } }),
  URL, process: { env: { NEXT_PUBLIC_SANITY_PROJECT_ID: 'project', NEXT_PUBLIC_SANITY_DATASET: 'production' } },
});
const { parseSiteLogo, fetchSiteLogo, siteLogoQuery } = exportsObject;
const valid = { url: 'https://cdn.sanity.io/images/project/production/logo.png', width: 900, height: 300, alt: ' New logo ' };
assert.equal(parseSiteLogo(valid, 'project', 'production').alt, 'New logo');
assert.equal(parseSiteLogo({ ...valid, alt: '' }, 'project', 'production').alt, 'BE Interior');
for (const invalid of [null, {}, { ...valid, url: 'javascript:alert(1)' },
  { ...valid, url: 'https://evil.example/logo.png' },
  { ...valid, url: 'https://cdn.sanity.io/images/other/production/logo.png' },
  { ...valid, width: 0 }, { ...valid, height: NaN }]) {
  assert.equal(parseSiteLogo(invalid, 'project', 'production'), null);
}
(async () => {
  response = valid;
  assert.equal((await fetchSiteLogo()).url, valid.url);
  assert.equal(request.options.params.perspective, 'published');
  assert.equal(request.options.timeout, 10000);
  assert.match(siteLogoQuery, /_id == "siteSettings"/);
  response = null;
  assert.equal(await fetchSiteLogo(), null);
  response = new Error('network unavailable');
  await assert.rejects(fetchSiteLogo(), /network unavailable/);
  console.log('Logo validation, empty-document fallback, published singleton query and network failure checks passed.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
