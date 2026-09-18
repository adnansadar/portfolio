# SEO and AI search audit

Audited September 18, 2026. Audience: frontend engineering roles, full-stack engineering roles, and technical writing. Canonical origin: https://adnansadar.com. Changes below are local until deployed.

## Findings and implementation

| Priority | Finding | Action / status |
| --- | --- | --- |
| High | Live homepage and blog had no canonical URL. Both www and apex served HTTP 200. | Added self-canonicals and a host-specific 308 redirect preserving paths and queries. HTTP already redirects to HTTPS on the live host. Verify www again after deployment. |
| High | No JSON-LD identity or content graph. | Added Person, WebSite, ProfilePage, Blog, BlogPosting and BreadcrumbList data. Article authors refer to the same person and include a name and profile URL. No invented reviews, ratings or credentials. |
| High | LinkedIn pointed at the service homepage. | Replaced with the owner-confirmed profile and used it in Person.sameAs alongside GitHub. |
| High | Positioning emphasized frontend only. | Added full-stack positioning to the homepage description, hero, contact heading and author biography, supported by existing project experience. Retained the stated lead frontend job title. |
| Medium | Projects relied heavily on screenshots, tags and animated metrics. | Added readable summaries of existing project facts and stable project anchors. More detailed original case studies still need source material. |
| Medium | Posts lacked visible bylines, author context, section links and onward reading. | Added linked author bylines, semantic article wrappers, a table of contents when headings exist, section anchors, author bios and links to other posts/projects. |
| Medium | Generic blog title and inherited home social metadata. | Added descriptive blog metadata and explicit social image fallback; retained each article's generated card. Automated validation checks actual image responses. |
| Medium | Homepage/listing sitemap dates were build timestamps. | Removed unverifiable dates; articles use publication dates or an optional substantive modification date. Update the optional date only after editorial changes. |
| Medium | Portrait source was 11,062,655 bytes. | Added a 122,032-byte WebP (1600 × 2400), about 98.9% smaller, and switched the displayed portrait/schema reference. Original retained. Next/Image already optimized delivered images, so this is a source-size reduction, not a measured 98.9% page speed improvement. |
| Medium | Animated counters exposed zeroes to assistive technology until scrolled into view. | Added stable screen-reader values and hid the animated duplicate from accessibility APIs. Server-rendered values remain present. |
| Medium | SEO regressions had no repeatable check. | Added scripts/check-seo.mjs to crawl every sitemap page and check metadata, structured data, headings, fragment targets, image responses, robots and 404s. |

## What already works

The five public content pages are statically rendered. Article text is in server HTML, there is a sitemap and permissive robots.txt, images use Next/Image with dimensions/aspect ratios and alt text, and posts have publication dates and original-source credits. Unknown paths return real 404 responses. The layout already has a no-JavaScript fallback for reveal animations. Existing URLs were preserved.

## Remaining opportunities, ordered by value

1. **Deployment and indexing:** deploy the changes, run the smoke check against production, submit /sitemap.xml in Google Search Console and Bing Webmaster Tools, and inspect all five page URLs. Confirm crawler access through hosting/CDN controls, not just robots.txt. No account access or indexing status was available for this audit.
2. **Original project evidence:** turn Investors Engine and PeopleBlox into substantial standalone case studies when you can supply architecture decisions, your specific contribution, constraints, tradeoffs, screenshots, and how the reported metrics were measured. Explain the 30% API-call reduction's baseline and measurement window. Do not manufacture benchmarks. The present summaries deliberately reuse existing facts.
3. **Useful technical writing:** there are only three posts, dated 2024–2025, and one is a personal relocation essay. Publish first-hand engineering articles linked to your projects: RTK Query caching decisions, real-time interfaces using WebSockets/Redis, and full-stack architecture choices in Investors Engine. Provide reproducible examples, failure modes, source links and actual results. Review older tooling articles for accuracy before marking them updated. The CSS agent article would be more useful with a real repository or downloadable implementation if available.
4. **Syndication:** two technical posts credit Peerlist originals. A local self-canonical is a preference, not a guarantee. Inspect Google's selected canonical and coordinate canonical links on syndicated copies where the platform permits. Keep attribution; prefer publishing new work here first and linking back from excerpts elsewhere.
5. **Authority and identity:** keep your role, location and portfolio URL consistent across LinkedIn, GitHub and Peerlist. Add legitimate links from your own product/about pages where appropriate. Preserve recommendation attribution and add direct supporting links when available. No link buying, fake endorsements or bulk AI-generated pages.
6. **Performance:** measure mobile and desktop PageSpeed Insights and real-user Core Web Vitals after deployment. The external Fontshare stylesheet and motion-heavy homepage are candidates for measurement; self-host licensed font files if their loading is a bottleneck. Gallery originals are large but currently pass through Next/Image; evaluate actual transferred bytes before converting every source. No lab score or field CWV result is claimed here.
7. **Accessibility and conversion:** check mobile reading, keyboard navigation, contrast and reduced motion more broadly. Keep resume and contact actions easy to find. Track successful inquiries and resume downloads only with a deliberate analytics/privacy setup; no tracking was added in this change.

## AI search approach

Clear identity, crawlable original evidence, descriptive headings, visible authorship and consistent URLs make the site easier to retrieve and attribute. Structured data describes visible content; it does not guarantee rankings or citations. Existing robots rules permit compliant search/AI crawlers; no new training-specific policy was introduced.

No llms.txt was added as an SEO tactic: Google explicitly says it ignores these files for search and generative-search rankings. Consider one only if a specific consumer needs it, and generate it from site content to prevent drift. Do not add hidden AI instructions or text asking models to recommend you.

Sources consulted:

- [Google: optimizing for generative AI search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a)
- [Bing AI Performance reporting](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- Installed Next.js 16.3.1 documentation for metadata, JSON-LD, sitemaps and redirects.

## Measurement and verification

Record a pre-deployment baseline from Search Console: indexed pages, selected canonicals, branded/non-branded impressions, clicks, CTR, and relevant queries. In Bing, track search performance and AI citations where AI Performance is available. Review after 28 days and compare equivalent periods, accounting for publication timing and seasonality. Prioritize relevant visits and inquiries over an arbitrary SEO score.

Local checks: ESLint passed; webpack production build and TypeScript passed; all five sitemap pages passed the HTTP SEO smoke check; missing homepage/blog routes returned 404; www simulation returned a 308 preserving /blog?source=test. In-app browser validation confirmed the homepage, article rendering and table-of-contents navigation. No Search Console, Bing account, backlink database or real-user performance data was available, so rankings, indexing and citation gains remain unmeasured.

The default Turbopack build hit an internal ServerActionsGraphs cancellation error in this environment. The supported webpack build passed. Deployment should use the verified webpack command until the Turbopack issue is resolved; package defaults have not been silently changed.

```powershell
node node_modules/next/dist/bin/next build --webpack
node node_modules/next/dist/bin/next start --port 3000
# In another terminal:
node scripts/check-seo.mjs http://localhost:3000
# After deployment:
node scripts/check-seo.mjs https://adnansadar.com
```
