const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function load(relativePath) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  const resolve = id => require(id.startsWith("@/") ? path.join(__dirname, "../src", id.slice(2)) : id);
  new Function("module", "exports", "require", source)(module, module.exports, resolve);
  return module.exports;
}

const { parseLanguage, translate } = load("src/lib/language.ts");
const { localizeContent } = load("src/lib/localized-content.ts");

assert.equal(parseLanguage(undefined), undefined);
assert.equal(parseLanguage("bn-BD"), undefined);
assert.equal(parseLanguage("bn"), "bn");
assert.equal(parseLanguage("en"), "en");
assert.equal(translate("en", "Next", "অগ্রসর হোন"), "Next");
assert.equal(translate("bn", " Next "), " পরবর্তী ");
assert.equal(translate("bn", "Next", "অগ্রসর হোন"), "অগ্রসর হোন");
assert.equal(translate("bn", "Next", " "), "পরবর্তী");
assert.equal(translate("bn", "A new CMS value"), "A new CMS value");
assert.equal(translate("bn", "constructor"), "constructor");

const english = {
  slug: "an-existing-blog",
  title: "A blog post",
  titleBn: "একটি ব্লগ",
  content: [{ _type: "block", children: [{ text: "English content" }] }],
  contentBn: [],
  seo: { description: "Search description", descriptionBn: "অনুসন্ধানের বিবরণ", noIndex: true },
  texts: [{ key: "stable", value: "Next", valueBn: "এগিয়ে যান" }],
};
assert.equal(localizeContent(english, "en"), english);
const bangla = localizeContent(english, "bn");
assert.equal(bangla.slug, english.slug);
assert.equal(bangla.title, english.titleBn);
assert.equal(english.title, "A blog post");
assert.deepEqual(bangla.content, english.content);
assert.equal(bangla.seo.description, english.seo.descriptionBn);
assert.equal(bangla.seo.noIndex, true);
assert.equal(bangla.texts[0].value, english.texts[0].value);
assert.deepEqual(localizeContent({ ...english, contentBn: [{ _type: "block", children: [{ text: "বাংলা লেখা" }] }] }, "bn").content, [
  { _type: "block", children: [{ text: "বাংলা লেখা" }] },
]);
console.log("PASS: language cookie values, dictionary, CMS translation and English fallback, preserved identifiers and SEO settings.");
