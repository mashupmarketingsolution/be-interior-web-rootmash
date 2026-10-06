# Production release findings — 2026-10-01

The public domain https://beinterior.com.bd currently serves a different site from this Next.js project. Home page title: beinterior.com.bd - Berlin. Public sitemap has 11 URLs. Cloudflare is in front of the origin; this does not identify the actual hosting provider.

Added permanent migration redirects: /about-us to /about; /privacy to /privacy-policy.

Before replacing the existing site, review/preserve these remaining legacy pages and their content:
- /service
- /legal-notice
- /why-choose-us-single-page-layout/budget-friendly-planning
- /why-choose-us-single-page-layout/customized-design-solutions
- /why-choose-us-single-page-layout/experienced-professionals
- /why-choose-us-single-page-layout/imported-premium-materials
- /why-choose-us-single-page-layout/reliable-after-sales-support

No blanket redirect has been added for these pages because equivalent content has not been verified.

Release blockers: origin hosting/provider and deployment access are not configured in this repository; Google Search Console requires sign-in. Production deployment, property verification, sitemap submission and Business Profile management are not complete.

Current tracking decision: direct Meta Pixel only. GTM and server-side tracking remain disabled/deferred by owner choice.

## Authenticated account checks

- Google Search Console domain property is accessible. Existing sitemap https://beinterior.com.bd/sitemap.xml shows Success, last read Sep 30, 2026, 11 discovered pages. Reports are still processing. No duplicate submission made.
- cPanel has a running production Node.js 24 app on web.beinterior.com.bd, startup server.js. Main domain still serves the older website. Deployment destination awaits owner clarification.
- Standard cPanel Backup reports no automatically generated account backups available. A targeted backup must be created and verified before replacement; JetBackup has not yet been checked.
- Google Business Profile Manager for the signed-in business account shows zero businesses. Existing Maps listing/ownership must be identified before creating a profile.
- No remote files, application settings or live content were changed in these checks.

## Subdomain backup completed

Owner confirmed web.beinterior.com.bd is the current deployment target; main-domain migration is deferred until work is finished.

Created server-private archive /home/robilea1/be-release-backups/web-before-update-20261001.tar.gz (355 MB). tar completed successfully, gzip integrity check passed, archive permissions are owner-only (600). It contains application files and existing build, excluding node_modules and .next/cache. Dependencies were excluded because some existing dependency directories returned permission denied. This is an application backup, not a complete account/database or dependency backup. Current running application was not replaced or restarted.

## Subdomain release deployed — 2026-10-01

Deployed the tested local standalone build to https://web.beinterior.com.bd using existing Next.js 16.2.6 / React 19.2.4 dependencies. Build and TypeScript passed. Release archive SHA256: 9a79491fe11109f81479c695cdd8d749537c35bb0d08aab7c8cb866ca0332c6d. No secret .env was uploaded; existing server environment retained.

The release startup sets NEXT_PUBLIC_SITE_URL to https://web.beinterior.com.bd and SEO_ALLOW_INDEXING=false. X-Robots-Tag noindex,nofollow and robots Disallow / keep this testing site out of search. Rebuild with final domain and SEO_ALLOW_INDEXING=true when migrating. Main domain was not changed.

Validation: 21 sitemap URLs returned 200 with canonical URLs and noindex header; /about-us redirects 308 to /about. Browser images loaded, one direct Pixel loader and zero GTM loaders observed. Mobile menu opens/closes, page width 384 at viewport 390. Studio login page loads; authenticated editing was not tested. One explicitly marked deployment test enquiry returned success (eventId 255fd9c8-3044-46e9-b603-3e88c258a4f9), no follow-up needed. Meta dashboard receipt was not verified. Browser console had Swiper insufficient-slide loop warnings, no errors observed in sampled logs.

Rollback: original application archive remains in /home/robilea1/be-release-backups/web-before-update-20261001.tar.gz. Previous .next is retained as previous-next-20261001 and startup as previous-server-20261001.js in that private directory. Existing dependencies were not changed.

## Admin SEO end-to-end test — 2026-10-03

Authenticated Studio inspection passed for Blogs, Home Projects and Office Projects. Existing editors expose title, search description, social image and noindex fields. Existing unset noindex values appear indeterminate in Studio but are treated as false by metadata code.

With owner permission, temporarily published SEO title and description overrides for Modern Square. CMS confirmed publication; a reload retained the values. Live HTML subsequently showed both custom values and matching Open Graph title after approximately one minute of cache propagation. Then cleared the two test overrides using keyboard input and republished to restore automatic metadata. No project name, slug, images, category, size or location was changed. Image upload and per-document noindex publishing were not exercised in this test.

## Slider release — 2026-10-04

Current status: the subdomain deployment is complete; earlier hosting/access blocker notes above are historical. Main-domain migration remains deferred. Search Console access was verified; Business Profile management still requires the account that owns the existing listing.

Updated six project/review carousels: loop only when at least four records exist (maximum three visible plus one sliding); otherwise use rewind. Remount when the mode changes after a content refresh. Existing content and unrelated working-tree changes were preserved.

Build and TypeScript passed. Lead validation and tracking tests passed without sending new enquiries. SEO fallback/custom image/noindex unit checks passed. Targeted lint: zero errors, ten pre-existing unused-import warnings. Live sitemap crawl: all 21 URLs returned 200 with matching canonical and noindex headers. Live home, residential and office service pages showed no new browser warnings/errors; office images loaded. Home project slides advanced; the single office review renders without loop warnings. Local preview data calls returned a network error, while deployed pages loaded their content. Mobile viewport override did not take effect (reported width remained 1280), so this turn does not claim a fresh mobile pass; earlier mobile checks remain recorded above.

Release SHA256: 109cd12a7a7aff11ddffc1d7fb2f18f20d1ced22269263c67b5ed6d413a72e5e. Server verified checksum; deployed build ID ehEbIIt6u8NJ--L8wWmoN. Immediate previous .next and server.js retained at /home/robilea1/be-release-backups/before-slider-20261004. No public assets, secrets, dependencies or main-domain files changed in this release. Historical backup remains available.

Admin test restoration was also confirmed: Modern Square published SEO object is null and live title returned to Modern Square | BE Interior. Social-image upload and per-document noindex CMS publishing still have not been exercised end-to-end. Meta dashboard receipt and final-domain indexing are not verified/completed by this release.

## Homepage header design — 2026-10-04

Approved design deployed: desktop homepage header transparent with a dark readability gradient at the top; after 48px scroll it becomes solid #111111 and shrinks from 96px to 80px. Other pages and below-desktop breakpoints use solid background. Fixed positioning prevents document-layout shifts. Scroll listener is passive, initial scroll position is checked on mount, and reduced-motion preferences disable transitions.

Header lint, production build and TypeScript passed. Browser preview and live verification confirmed transparent 96px at the top and solid 80px fixed at y=0 after scrolling. Dropdown and navigation to a service page worked; service-page header remained solid. Mobile solid behavior is implemented with responsive CSS; no new mobile viewport pass is claimed here.

Build cn18smh0GvrvVkx7AMVsb; archive SHA256 1b9fcc1e6da3797e44054005137e15dea626ecc57e388986d54eb3ef8c7cb68c. Server checksum verified and RELEASE_OK returned. Immediate previous build/startup retained in /home/robilea1/be-release-backups/before-header-20261004. Main domain and indexing settings unchanged.

## Compact estimate CTA and final checks — 2026-10-05

Deployed the approved compact orange CTA: 48px height, 12px corner radius, calculator icon and original label, 24px desktop/32px wide-screen right margin. Build, TypeScript and targeted header lint passed. Server verified archive dd74d02eec6daea60d538a0b4646b0ad62037efa5f2da052772e687c5d51ea2b and deployed build X--Md5HXSmQuXiDGt-mr_. Previous build/startup retained in /home/robilea1/be-release-backups/before-cta-20261004.

Live browser confirmed 48px button height, 12px radius and 32px right gap. Clicking CTA opened the calculator; Home Interior selection opened Step 1. Scrolled desktop header stays at top=0 with 80px height and 48px CTA; sampled console contains no errors/warnings.

Fresh mobile checks now PASSED at viewport 390x844: homepage width 384 (no horizontal overflow), solid #111111 header height 80px, navigation drawer opens/closes and calculator first step loads. This supersedes earlier notes that mobile viewport testing was unavailable. Viewport override reset afterwards.

Latest sitemap crawl: 21 pages, all 200, correct canonicals and staging noindex headers. Meta dashboard receipt and Business Profile owner access still pending; requested account links from owner. Social-image/noindex CMS publishing end-to-end tests remain unperformed. Main-domain migration stays deferred per owner.

## Meta Events Manager verified — 2026-10-05

Authenticated account shows Be Interior Pixel dataset 1078866724188850. Overview range Sep 7-Oct 4: PageView, Lead, WhatsAppClick, PhoneClick and View content marked Active; EmailClick shows no recent activity. These are historical dataset events from multiple websites and do not independently prove every current lead flow.

Started Website Test Events with https://web.beinterior.com.bd/. Meta received a fresh PageView at 12:31:43 AM and marked it Processed, Browser, Manual Setup. Expanded event confirms URL https://web.beinterior.com.bd/ and action source website. Current subdomain-to-Meta PageView receipt is verified. No new lead submission, paid setup, CAPI integration or tracking setting changes were made. Existing direct-Pixel-only decision remains.

## Customer journey audit — 2026-10-05

Home validation blocks empty/negative area and missing package. Office blocks missing area. Office 2200 sft, 30 employees, Reception and Workstation Area, Essential, Complete Interior + Furniture returned 3,520,000 Tk. Back/Next preserved selections and contact values (phone/email are redacted in automation text snapshots but visually verified). One TEST QA OFFICE - NO FOLLOW UP record was observed in Studio with matching project summary.

Home 1200 sft, 3BHK, Master Bedroom and Kitchen, Essential returned 26,000 Tk. One TEST QA HOME - NO FOLLOW UP record was observed in Studio. Tests used the site's verified public business number and customer-test@example.com; do not follow up. An approval rejection initially misclassified the public business phone as private; read-only footer evidence established it was public and the reviewed retry succeeded.

Launch issues: Home Essential Master Bedroom output contains placeholder description and furniture/accessory text. Admin confirms Master Bedroom price 12000; actual business-approved rates/content are needed. Do not treat the resulting 26000 as a verified real quote. Home package cards are clickable divs without keyboard button semantics. Room dropdown overlays subsequent controls until closed. Calculate Again returns to the same project type, with no visible switch to Home/Office except page reload.

Meta received office Lead ID 55e246a8-9ce9-405f-848c-228fec00a8a7 as Deduplicated. Home Lead ID 8de9e8ee-f8bb-4c5f-afc8-cd6be8387593 showed two Processed rows plus one Deduplicated row. Exact source of duplicate receipts remains unresolved; do not claim exactly-one Meta delivery. Browser DOM has one fbevents.js loader and zero GTM loaders. Automatic SubscribedButtonClick events are also present in Meta. Both leads are visible once each in the Studio list. No tracking settings, package pricing or content changed during this audit.

## Calculator usability release - 2026-10-06

Deployed native keyboard-operable Home package buttons with pressed state and focus outline; in-flow Home/Office selection lists with expanded state, Escape dismissal/focus return and selected state; and explicit Start over / Change project type control (disabled during submission). Reset closes lists. Outside dismissal now uses click rather than mousedown after preview found the layout shift could swallow the first Next click.

Production build and TypeScript passed. Preview confirmed open-list Next advances in one click, Enter selects Essential, Escape closes/focuses the trigger, and reset returns to Home/Office selection. Live confirms new controls, non-overlapping room list and project selector reset. Fresh 21-page crawl passed status/canonical/staging-noindex checks. No lead submissions or business pricing/content changes in this release.

Archive release-calculator-20261006-v2.tar.gz SHA256 f6ce46f58eb2389f3aa028cb263f744ad0ce0086b8b7116a24c9b14b297e15c6. Server checksum and RELEASE_OK verified. Previous build/startup backed up at /home/robilea1/be-release-backups/before-calculator-20261006-v2. Main domain unchanged. Placeholder package content still needs owner-approved rates/furniture list. Meta duplicate receipt investigation remains separate and unresolved.
