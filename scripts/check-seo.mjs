import assert from "node:assert/strict";

// Run against a production build: node scripts/check-seo.mjs http://localhost:3000
const base = process.argv[2] ?? "http://localhost:3000";
const origin = "https://adnansadar.com";
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const attr = (tag, name) => decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? "");
const get = async (path) => {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path}: HTTP status`);
  return response.text();
};
const sitemap = await get("/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
assert.ok(urls.length >= 5, "Sitemap includes home, blog and published articles");
const titles = new Set();
for (const url of urls) {
  assert.ok(url.startsWith(origin), `Canonical origin: ${url}`);
  const path = new URL(url).pathname;
  const html = await get(path);
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => match[0]);
  const canonical = links.filter((tag) => attr(tag, "rel") === "canonical");
  assert.equal(canonical.length, 1, `${path}: one canonical`);
  assert.equal(new URL(attr(canonical[0], "href")).pathname, path, `${path}: self canonical`);
  assert.equal(new URL(attr(canonical[0], "href")).origin, origin);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `${path}: unique title`);
  titles.add(title);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one h1`);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => match[0]);
  assert.ok(metas.some((tag) => attr(tag, "name") === "description" && attr(tag, "content")), `${path}: description`);
  assert.ok(!metas.some((tag) => attr(tag, "name") === "robots" && attr(tag, "content").includes("noindex")), `${path}: indexable`);
  const ogUrl = metas.find((tag) => attr(tag, "property") === "og:url");
  assert.equal(new URL(attr(ogUrl ?? "", "content")).pathname, path, `${path}: OG URL`);
  const image = metas.find((tag) => attr(tag, "property") === "og:image");
  assert.ok(image, `${path}: share image`);
  const imageResponse = await fetch(new URL(new URL(attr(image, "content")).pathname, base));
  assert.equal(imageResponse.status, 200, `${path}: share image resolves`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap((match) => {
    const data = JSON.parse(match[1]);
    assert.equal(data["@context"], "https://schema.org");
    return data["@graph"] ?? [data];
  });
  assert.ok(graphs.length, `${path}: parseable JSON-LD`);
  if (path.startsWith("/blog/")) {
    const article = graphs.find((node) => node["@type"] === "BlogPosting");
    assert.equal(article?.author?.name, "Adnan Sadar", `${path}: named author`);
    assert.ok(article?.datePublished && article?.image);
    assert.ok(html.includes('rel="author"') && html.includes("<article"), `${path}: visible authorship and semantic article`);
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => decode(match[1])));
  for (const match of html.matchAll(/<a\b[^>]*href="#([^"]+)"/g)) {
    assert.ok(ids.has(decode(match[1])), `${path}: anchor #${match[1]} resolves`);
  }
  console.log(`PASS ${path}`);
}
const robots = await get("/robots.txt");
assert.ok(robots.includes("Allow: /") && robots.includes(`${origin}/sitemap.xml`));
for (const path of ["/missing-seo-check", "/blog/missing-seo-check"]) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 404, `${path}: real 404`);
}
console.log(`PASS robots, sitemap, missing-page responses; ${urls.length} pages verified`);
