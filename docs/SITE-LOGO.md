# Sanity-managed site logo

Deployed to https://web.beinterior.com.bd on 2 November 2026.

## Change the logo

1. Open https://web.beinterior.com.bd/beinterior/studio/structure/siteSettings and sign in.
2. Open **Site Settings → Site Logo**. Use the image options menu to upload a replacement, or select an existing asset.
3. Set **Alternative Text** (normally `BE Interior`) and click **Publish**.
4. Refresh the website. Existing open pages also check for changes once per minute.

Use a transparent PNG or WebP with minimal surrounding empty space. JPEG is also accepted. The image keeps its aspect ratio; the existing 140px mobile and 180px desktop logo widths remain in place. The same component supplies the header, mobile menu and footer branding. The footer Facebook promotional picture is separate content and was not changed.

Removing the logo and publishing restores the original bundled logo. Missing settings, invalid asset URLs, failed requests and image loading errors also retain the bundled fallback. Draft changes do not appear publicly.

## Exact source files changed

- `sanity.config.ts`: prevent extra Site Settings templates and duplicate/delete actions.
- `src/sanity/structure.ts`: direct singleton editor at document ID `siteSettings`.
- `src/sanity/schemaTypes/index.ts`: register the new schema.
- `src/sanity/schemaTypes/SiteSettings.ts`: optional `logo` image and `logo.alt` fields.
- `src/lib/site-logo.ts`: published singleton query, configured dataset, bounded request timeout and validated Sanity asset/dimensions.
- `src/components/Header/NavLogo.tsx`: shared managed logo, original fallback, image-error recovery and periodic refresh.
- `scripts/verify-logo.cjs`: validation and request/fallback regression checks.
- `docs/SITE-LOGO.md`: this handover.

Navbar and Footer already use NavLogo, so neither required source changes. Existing Website Settings/contact documents were not modified.

## Verification

- Production build, including TypeScript: passed.
- Targeted ESLint and `git diff --check`: passed.
- Logo checks: valid asset, invalid/foreign URLs, empty document, missing/invalid dimensions, published perspective, singleton selection, request timeout and network failure: passed.
- Existing lead-validation and tracking checks: passed; no external enquiries submitted.
- Local and staging fallback logo: loaded at the original desktop dimensions, 180 × 176.25px.
- Uploaded the original `BEI-Logo.png` through deployed Studio and published `siteSettings`. Header and footer then loaded the Sanity CDN asset, retaining 180 × 176.25px dimensions.
- Staging homepage and Studio: HTTP 200. Sampled staging browser warnings/errors: none.
- A temporary mobile viewport override did not change the reported viewport, so no new browser mobile-layout pass is claimed. Responsive width classes were preserved.

## Deployment and recovery

Working copy: `C:\Users\hp\.codex\.chatgpt-projects\g-p-6ab41721ed28819190a09c033bd2eaf3\be-interior`, cloned from the requested main GitHub remote at `76180758cb579990618f897a4f5e1374ccb30d14`. The supplied `D:\be\_interior\be-interior` path was absent. An older copy at `D:\Website\BE INTERIOR WEB` was inspected but not edited.

Deployed build: `ZHItlJqXlA99xvwS_x8xq`.
Archive SHA256: `19eb10801d7f417107e78ac9d8167be0a2e02be54564dcd0daa352513b477ec5` (verified on server).

Server-private backup/release directory: `/home/robilea1/be-release-backups/logo-20261102/`.
Previous active build: `next.active-before`; previous startup file: `server.js.before`. The previous static assets were retained for already-open browsers. Only staging `.next` and `server.js` were activated; existing server dependencies, environment, public assets and main-domain files were retained.

To roll back, move the current `.next` into a new private backup location, restore `next.active-before` as the application's `.next`, restore `server.js.before` as `server.js`, then touch the application's `tmp/restart.txt`. The Sanity document is optional and can remain safely in the dataset.

The repository changes remain in this working copy; no GitHub push was performed.

## Footer layout and favicon update — 2 November 2026

The user replaced the logo with a 1200 × 260px image. The old footer had a -68px translation and -32px paragraph margin designed around the padded original image. Removed both offsets, added a 24px branding-column gap and bounded the shared logo slot to 140 × 48px on mobile / 180 × 56px on desktop with object containment. The user's published replacement logo was preserved.

Added **Site Settings → Favicon** (`siteSettings.favicon`). Upload a square PNG, ideally 512 × 512px, then Publish and refresh/reopen the website tab. No favicon was chosen on the user's behalf; the original icon remains until one is published. `/favicon.ico` now reads the published singleton, serves a 64px square PNG, and returns the original icon if settings or the asset are unavailable. The response uses no-store caching. No website rebuild is required for subsequent favicon changes.

Additional files changed in this update: `src/components/Footer/Footer.tsx`, `src/app/layout.tsx`, `src/app/favicon.ico/route.ts`, `scripts/verify-favicon.cjs`; the original `src/app/favicon.ico` was relocated unchanged to `public/favicon-default.ico`. Also updated `src/components/Header/NavLogo.tsx`, `src/lib/site-logo.ts`, `src/sanity/schemaTypes/SiteSettings.ts` and this document.

Production build/TypeScript, targeted lint, logo and favicon regression checks passed. Live footer verification: 180 × 56px logo slot with a 24px gap before the paragraph, image loaded, no overlap. Live favicon response: HTTP 200, image/x-icon; bytes match the original fallback. New Favicon field is visible in deployed Studio. Sampled website browser warnings/errors: none. Managed PNG generation was covered by regression checks; a custom favicon has not been published end-to-end.

Current build: `7UQBfB0bgxnPh5EX5etWn`. Incremental release archive SHA256: `c0875126ddd2aedb035b303538aa7fa0f0f6b196e8fabc97ea649483088f055a`, verified on the server. Unchanged static chunks were reused. Current rollback directory: `/home/robilea1/be-release-backups/favicon-20261102/`, with `next.before` and `server.js.before`. Public fallback icon was added; existing assets, environments and dependencies were retained. Source changes are local and have not been pushed to GitHub.
