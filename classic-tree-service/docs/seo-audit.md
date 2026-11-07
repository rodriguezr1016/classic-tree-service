# Classic Tree Service SEO audit and implementation

Audit date: November 7, 2026. Changes are local and have not been deployed.

## Baseline and findings

User-provided Search Console baseline, August 6–November 5, 2026: 16 clicks, 1,720 impressions, 0.9% CTR, average position 19.2. No direct Search Console account inspection was performed.

The Next.js 16 App Router site already contained 14 indexable pages: homepage, About, Contact, four services and seven service areas. All marketing pages are prerendered; primary content and links appear in HTML without requiring client JavaScript. The shared client provider does not make server-rendered page content uncrawlable. Existing services, service areas, phone numbers and free estimates were supported by the live site and repository.

The highest-impact findings were:

- Service pages had mostly repeated generic copy, with little guidance about the particular service. City pages were near-identical except for city names. Oakdale already existed; no new city pages were needed.
- Homepage, About and Contact inherited generic social metadata, including the homepage Open Graph URL. City pages inherited generic Twitter metadata. Titles/descriptions needed clearer local intent.
- The homepage loaded an approximately 8 MB JPEG directly as a CSS background. Other responsive images lacked sizes hints; some CSS image sizing could distort the intended aspect ratio.
- Images had alt attributes, but several descriptions claimed services or locations the photos did not show. The stump image depicts a tree canopy, not grinding equipment or a completed job.
- Business schema included an unsupported TreeService type and unverified payment methods, hours, legal name and locality-only business address. No fabricated reviews were found or added.
- Sitemap lastmod values represented build time rather than a known content modification date.
- Main navigation has Home/About/Contact; services and cities are crawlable through homepage and footer links. Service pages lacked contextual links to other services.
- Live robots.txt allows crawling and advertises the www sitemap; the sitemap contains the expected 14 URLs. The non-www homepage returns a temporary 307 redirect to www. Indexing eligibility is not proof of Google index inclusion.

## Implemented changes, in priority order

1. **Local relevance and conversion (high impact, modest effort):** adopted the requested homepage title and H1, named Modesto and Oakdale in the introduction, improved the service section heading, and retained existing call/free-estimate actions and affordability content. Added original service-specific guidance about scope, access, cleanup, estimate inputs and related services to all four service pages. Expanded the existing Oakdale page with removal, grinding and trimming planning guidance plus an estimate CTA. No project histories or location photos were invented.
2. **Metadata consistency (high impact, low effort):** shared typed metadata helper emits explicit branded titles, unique descriptions, self-referencing www canonicals, complete Open Graph fields and matching Twitter cards/images. Applied to all 14 pages. Removed the layout-wide homepage canonical and unused keyword list. Kept city titles distinct from the homepage.
3. **Trust and schema (high impact, low effort):** use HomeAndConstructionBusiness, a LocalBusiness subtype; retain stable business and Service IDs. Removed unverified legal name, address, currency and promotional price-range claims. Replaced the original unsupported hours with the owner-supplied Google Business Profile schedule: Monday–Saturday 8 AM–6 PM, Sunday closed; displayed the same hours on Contact. The owner confirmed insurance and cash/check/Zelle payments; removed unconfirmed licensing claims from homepage, header and About, added payment information visibly on About and in business schema. No ratings, reviews, license details or street address were added. Service schema names match the service headings.
4. **Image delivery and layout (high impact, low effort):** replaced the raw hero CSS image with a preloaded responsive next/image while preserving its crop, gradient and layout. Added responsive sizes hints to homepage/service/About images and auto heights for relevant image aspect ratios. Corrected alt text after inspecting actual photos. The hero is decorative and intentionally has empty alt text; the same photo has descriptive alt in its service card.
5. **Crawl hygiene (moderate impact, low effort):** removed unsupported sitemap lastmod timestamps. Kept existing routes, sitemap inventory, robots directives and static generation. Added descriptive city-to-service and related-service links; About now uses a main landmark.

## Files created or modified

| File | Change |
|---|---|
| `lib/metadata.ts` (new) | Shared canonical, SEO title, description, Open Graph and Twitter metadata builder. |
| `lib/service-content.ts` (new) | Unique headings, descriptions and practical guidance for four services. |
| `lib/site.ts` | Accurate photo descriptions; Oakdale included in business description. |
| `lib/schema.ts` | Supported business type, verified payment methods, removed unsupported facts, aligned service names. |
| `app/page.tsx` | Modesto title/H1 and local introduction, optimized hero and card images. |
| `app/services/[slug]/page.tsx` | Service-specific metadata/content, related links, estimate CTA, responsive hero. |
| `app/service-areas/[city]/page.tsx` | Complete local metadata, descriptive links, expanded Oakdale content. |
| `app/about/page.tsx` | Unique metadata, main landmark, corrected alt text and responsive sizing, insurance/payment facts. |
| `app/contact/page.tsx` | Local estimate metadata, matching social cards and confirmed business hours. |
| `app/components/Header/index.tsx` | Removed unconfirmed licensing claim; retained confirmed insurance. |
| `app/layout.tsx` | Removed inherited homepage canonical and unnecessary keyword list. |
| `app/globals.css` | Hero overlay/image styling, image aspect ratios and service guidance heading sizes. |
| `app/sitemap.ts` | Removed build-generated lastmod claims. |
| `docs/seo-audit.md` (new) | Audit, implementation record, validation, keyword mapping and monitoring plan. |

No dependencies, new marketing routes, API behavior or form submission logic were changed. The pre-existing parent `.DS_Store` change was left untouched.

## Keyword mapping

| Page | Primary target | Supporting intent |
|---|---|---|
| `/` | tree service modesto ca | tree service modesto, modesto tree service, affordable tree service |
| `/services/tree-trimming` | tree trimming modesto ca | tree trimming modesto, local trimming service / near-me intent |
| `/services/tree-removal` | tree removal modesto | tree removal modesto ca, local removal / near-me intent |
| `/services/stump-grinding` | stump grinding oakdale | stump grinding modesto ca, stump removal oakdale (explains grinding versus excavation) |
| `/services/palm-tree-care` | palm tree care modesto | palm trimming modesto |
| `/service-areas/oakdale` | tree service oakdale | tree removal oakdale, stump grinding oakdale |
| `/service-areas/modesto` | affordable tree service modesto | existing city coverage; monitor overlap with homepage |
| `/service-areas/merced` | tree service merced | existing service coverage |
| `/service-areas/ceres` | tree service ceres | existing service coverage |
| `/service-areas/turlock` | tree service turlock | existing service coverage |
| `/service-areas/riverbank` | tree service riverbank | existing service coverage |
| `/service-areas/salida` | tree service salida | existing service coverage |
| `/contact` | tree service estimate modesto | free estimate, Oakdale inquiries |
| `/about` | Classic Tree Service | business identity, insurance, payments |

These are intended page roles, not claims about rankings. City pages other than Oakdale received metadata/link improvements rather than invented local stories.

## Validation and limits

- ESLint, explicit `tsc --noEmit`, production build and `git diff --check` passed.
- Production build prerenders all 14 marketing pages. A local HTTP crawl checked all sitemap pages for unique titles/descriptions, correct canonical/OG URLs, matching social titles, one H1, indexable directives, image alt attributes, JSON-LD syntax and unique top-level graph IDs.
- All 14 unique internal page destinations resolve. Unknown service/city routes return HTTP 404. Sitemap XML parses; robots allows crawling and references the www sitemap.
- Browser review covered mobile homepage at 390px, desktop stump-grinding page at 1440px, Oakdale mobile layout and its contact CTA. Oakdale had no document horizontal overflow at 390px; the contact form renders after navigation.
- An actual Next image request returned HTTP 200 and a 596,290-byte 1080px WebP versus the roughly 8 MB raw hero source. This is evidence of lower transfer cost, not a measured Core Web Vitals score.
- System fonts were already used, with no webfont download. Client JavaScript still supports navigation, uploads, contact forms and analytics; no speculative provider/form rewrite was made for marginal bundle savings.
- No real inquiry was submitted and no database/upload integration was changed. Field LCP, INP and CLS, Google index inclusion, rich-result eligibility and ranking changes require production follow-up. JSON syntax checks do not replace Google's Rich Results Test.
- Build emits an existing workspace-root warning because parent and project both contain lockfiles. Build succeeds; repository structure was not changed to silence it.

## Facts confirmed and still needed

The owner confirmed the business is insured and accepts cash, check and Zelle. Contractor licensing is unknown, so licensing claims have been removed. There are no Oakdale-specific photos available; no completed Oakdale projects are claimed.

The owner subsequently supplied a Google Business Profile screenshot confirming Monday–Saturday 8 AM–6 PM and Sunday closed. These hours are now displayed on Contact and included in business schema. The screenshot warns holiday hours might differ but gives no special schedule, so no holiday exception was invented. If a public business address, legal entity name, license details or Google Business Profile URL is supplied later, verify before adding it. Existing phone numbers and seven service areas were retained from the public site; confirm if they have changed.

## Remaining opportunities

1. **High priority:** deploy, inspect the new live output, then use Search Console URL Inspection and submit the sitemap. No deployment or Search Console changes were performed here.
2. **High priority, requires genuine business assets:** add permission-cleared photos and useful project details from actual jobs, especially stump grinding. Replace the generic canopy photo when a real service photo is available. Add Oakdale examples only when documented.
3. **Medium priority:** review city-page landing-page/query data. The Modesto city page overlaps the homepage and other city pages remain repetitive. Decide whether to differentiate or consolidate based on actual traffic/backlinks and genuine local information; avoid mass city expansion or speculative redirects.
4. **Medium priority, hosting change:** change the existing apex-to-www redirect from temporary 307 to permanent 308 if www is confirmed as the permanent domain. Verify deep paths and HTTP redirects at deployment level. Canonicals already use www.
5. **Medium priority:** measure mobile LCP/INP/CLS after deployment. The tall sticky mobile header and sitewide upload/form JavaScript are follow-up candidates if measurement identifies a problem. Retain layout and form usability when optimizing.
6. **Medium priority:** measure successful inquiries and phone clicks separately from traffic. The existing analytics component does not itself establish lead attribution. Use privacy-conscious events and exclude staff/test submissions.
7. **Lower effort usability follow-up:** improve explicit form labels and mobile input behavior in a separate form-focused change; avoid expanding this SEO patch into an upload/API rewrite.

## Search Console monitoring

Preserve the supplied August 6–November 5 baseline and record the actual deployment date. After deployment, inspect the homepage, trimming, removal, grinding and Oakdale URLs; confirm crawling/indexing eligibility and Google's selected canonical, then request indexing for the key changed pages. Submit or recheck `https://www.classic-tree-service.com/sitemap.xml`.

Compare equal 28-day periods after recrawling, followed by an 8–12 week trend review. Filter Search results by page, query and device. Track clicks, impressions, CTR and position for Modesto service queries and Oakdale removal/grinding queries separately. Compare the homepage and Modesto city page for the same queries to detect overlap. With only 16 baseline clicks, avoid interpreting small weekly changes as conclusive.

Review Page indexing and Core Web Vitals alongside performance. Keep a separate count of qualified calls and estimate requests: increased impressions alone do not meet the business objective. This workflow uses the crawl/index/performance tools described in [Google's Search Console guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start).

Implementation references: [Next.js Image documentation](https://nextjs.org/docs/app/api-reference/components/image) for responsive sizes/preload; [Schema.org HomeAndConstructionBusiness](https://schema.org/HomeAndConstructionBusiness) for the LocalBusiness subtype; [Google LocalBusiness documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) for production validation and eligibility. Without a verified address, schema can describe the service business without claiming eligibility for Google's address-dependent LocalBusiness rich results.
