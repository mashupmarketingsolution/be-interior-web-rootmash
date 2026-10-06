# BE Interior website audit and implementation

Status: implemented and tested in the local project at `D:\be_interior\be-interior`. These changes have not been deployed or published to GTM. Existing user changes were preserved; a source backup is in the task workspace's `audit-backup` directory.

## Completed

- Desktop/mobile navigation improvements from the earlier header work.
- Four enquiry forms now show request failures, block concurrent submissions and keep user input on failure. Calculator submission has the same protection and no longer uses a blocking success alert.
- Lead API validates and normalizes name/email/BD phone/project details, limits payload size, rejects malformed requests and foreign origins, uses stable submission IDs with Sanity `createIfNotExists`, returns safe errors, and avoids returning customer details in its success response.
- Per-process submission throttling is present. This is not a distributed anti-spam service or a substitute for deployment-level rate limits.
- DataLayer lead events and browser Pixel share an event ID. Repeated delivery of the same successful submission does not send another lead event during the current browser session. Page-view events now follow pathname changes independently of whether a Pixel ID exists.
- Meta Pixel ID `1078866724188850` is configured. The fresh browser page loaded one Pixel library. Ads Manager event receipt and attribution have not been independently verified.
- Unique metadata for static pages, dynamic metadata and server-provided initial content for blog/project details, canonical URLs, OG/Twitter share images, sitemap, robots, Organization structured data and studio noindex.
- Office projects can be opened using their canonical URL without the `?type=office-projects` query. Missing detail records return server-side 404.
- Corrected page heading structure, a nonfunctional home hero link, WhatsApp country-code formatting, unnamed/empty social links, input accessible names and a copied map title.
- Removed duplicate unused font loaders from nested layouts and nested html/body tags from the studio layout. Reduced home hero image quality from 100 to 75 without changing source images.
- Fixed source lint errors without disabling lint rules.

## Verification

- Production build: passed after final application edits.
- TypeScript: passed.
- ESLint source scan: 0 errors, 65 warnings (remaining warnings are non-blocking cleanup; original scan had 68 errors and 149 warnings).
- Production HTTP crawl: all 21 sitemap pages returned 200, had title/description/canonical/share metadata and one H1 each.
- Sitemap, robots and generated share image returned 200. Unknown route and unknown project returned 404.
- Mocked lead API tests cover validation, normalization, malformed/oversized requests, origins, idempotency, safe upstream failures and throttling. No real test lead was written to Sanity.
- DataLayer tests cover lead deduplication, shared Pixel event ID, contact-click events and absence of customer contact fields in emitted dataLayer events.
- Browser tests: blank contact form errors; office calculator selection through enquiry step; mobile calculator overflow; fresh page has one Pixel loader and no legacy GTM scripts.
- No claim is made that all external links, every calculation combination, real ad attribution or production Core Web Vitals have been tested.

## GTM finding requiring account access

The public published container `GTM-PMPH3F3R` was inspected. It contains:

- Meta Pixel `1078866724188850`, which would duplicate the website's direct Pixel installation.
- GA4 measurement ID `G-1212121212` (appears to be placeholder configuration; owner must supply the actual ID).
- `server_container_url` set to `https://shop.leniant.xyz`, an unrelated destination not identified by the owner as a BE Interior tracking server.
- Ecommerce purchase/cart/checkout tags, rather than the site's enquiry events.

The GTM ID is saved but loading is gated by `NEXT_PUBLIC_GTM_ENABLED=false`. Do not enable the current published container unchanged. No GTM account changes were made.

Required account-side work:

1. Confirm the real GA4 property/measurement ID and export the current GTM container as a backup.
2. Remove or pause unrelated ecommerce tags and the unrelated server destination.
3. Keep exactly one owner of Meta Pixel events. Current implementation owns them directly in the website; do not add parallel Meta tags in GTM.
4. Configure GA4 tags for the custom events below. Avoid automatic and custom page views both firing for the same navigation.
5. Verify in GTM Preview, GA4 DebugView and Meta Test Events before publishing the container and setting the enable flag to true in deployment configuration.

| dataLayer event | Parameters | Meaning |
| --- | --- | --- |
| page_view | page_path | Initial load and pathname navigation; no query-string contact data |
| generate_lead | lead_source, event_id | Successful server-confirmed enquiry |
| whatsapp_click | location | WhatsApp action, not proof of a submitted enquiry |
| phone_click | location | Phone action, not proof of a completed call |
| email_click | location | Email action, not proof of a sent message |

## Server-side tracking and release dependencies

The owner confirmed there is no existing server-side provider/setup. Meta CAPI and server GTM are **not active**. The shared event ID is groundwork, not a server integration. A provider/domain, billing decision where applicable, appropriate server credentials, event mapping, consent/data choices and delivery verification are still needed. Keep secret tokens in server-only hosting configuration, never in chat or NEXT_PUBLIC variables.

Deployment remains pending hosting access/instructions. Set the public tracking/site variables from `.env.tracking.example` and preserve the existing server-only Sanity write token. Verify actual successful lead storage using an explicitly identified test enquiry, then check production form failures, anti-spam limits, redirects, Search Console sitemap submission/indexing and live performance. Do not infer deployment or ad-account success from a passing local build.
