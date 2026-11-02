# Website appearance and navigation

Admin: https://web.beinterior.com.bd/beinterior/studio/structure/siteSettings

## Heading and font rules

All public website text uses Poppins by default. Appearance settings can switch the whole website to Geist. Studio keeps its own interface typography.

- Main headings: 30px on mobile; 48px from 768px upwards.
- Card/subheadings: 20px on mobile; 24px on larger screens.
- Smaller headings: 16px; footer headings: 14px.
- All heading text, including previously highlighted words, uses bold weight 700.
- Heading fragments inherit the heading's colour, weight and main-heading size.
- Light sections use dark headings; dark sections use white headings.
- Orange buttons and the active Home/menu highlight remain in place.
- Static headings, labels and calls to action use sentence case. Published project names, article text and other authored CMS content retain their spelling/capitalization.

## Appearance controls

Open **Site Settings → Appearance**, change the fields and click **Publish**.

| Field | Default |
| --- | --- |
| Website font | Poppins |
| Button and active menu colour | `#e46e00` |
| Heading colour on light backgrounds | `#111111` |
| Heading colour on dark backgrounds | `#ffffff` |

Colour fields accept six-digit hex values. Clearing a setting restores its default. Heading sizes and bold weights are kept consistent in the website styles.

## Edit, hide or restore menu items

Open **Site Settings → Navigation**. The same menu drives desktop navigation and the mobile drawer.

1. Open an item to change its **Menu name**.
2. Use **Choose a page** to select an existing website page. Its URL is filled by the selection; no address needs to be memorized.
3. For another URL, select **Custom link (paste below)** and paste a page path or an HTTPS URL.
4. Use **Dropdown links** for a group, and drag items to change their order.
5. Click **Publish**, then refresh the website. Existing open pages also refresh settings about once per minute.

To remove an item temporarily, turn **Show in menu** off. Its name, page selection and custom URL stay saved. Turn it on and Publish to bring it back. This also works for individual dropdown links. Hiding a menu item does not delete the underlying page.

**Restore default menu** replaces the menu list with the original Home, Blogs, Our services and More menu. Confirm **Restore menu**, then **Publish**. It does not change the logo, favicon, appearance or header button. The restoration is a draft until published. This restores the original menu, not arbitrary deleted custom items; use Hide/Show to retain custom items for later, or add them again with the page picker/custom URL.

The header button's name and destination can be edited separately under **Header button**.

Up to six top-level items and twelve dropdown links can be visible. Additional hidden items can be kept in the editor. Larger menus use the drawer until a wider desktop viewport is available. Long labels are truncated visually with their full name available as a tooltip.

## Page link directory

| Page | URL path |
| --- | --- |
| Home | `/` |
| Blogs | `/blogs` |
| Home interior | `/services/home-interior` |
| Office interior | `/services/office-interior` |
| Projects | `/interior-projects` |
| About us | `/about` |
| Contact us | `/contact` |
| Hire an architect | `/hire-architect` |
| Budget calculator | `/services/budget-calculator` |
| Terms and conditions | `/terms` |
| Cancellation & refund | `/refund-policy` |
| Privacy policy | `/privacy-policy` |

For an individual project/article, open it on the website and copy its address into Custom link.

## Implementation and validation

Central source files: `src/app/globals.css`, `src/app/layout.tsx`, `src/globalwrapper/ClientGlobalWrapper.tsx`, `src/components/SiteTheme.tsx`, `src/components/Header/useSiteSettings.ts`, `src/lib/site-settings.ts`, `src/components/Header/NavLinks.tsx`, `Navbar.tsx`, `Navbtn.tsx`, `src/sanity/schemaTypes/SiteSettings.ts`, `SiteDesign.ts`, `src/sanity/components/MenuInput.tsx` and `scripts/verify-site-settings.cjs`. Public page components also receive heading foreground roles and sentence-case static copy. See `source-files-changed.txt` for the pending source inventory across this ongoing website work, including the earlier logo/favicon changes.

Published singleton settings are read with bounded request timeouts. Menu links are validated against safe internal paths/HTTPS URLs. Missing or invalid menu data uses the original menu; intentionally hidden items stay hidden. Only predefined font choices and valid hex colours are accepted.

Production build/TypeScript, targeted lint and source whitespace checks passed. Menu parsing tests cover ordering, dropdowns, hidden items, page selection, custom URLs, default restoration, malformed data and unsafe links. Existing logo/favicon, lead-validation and tracking checks passed without sending enquiries.

Browser checks confirmed Poppins, a single 48px main-heading size at desktop width, a single 30px size at 390px mobile width, uniform bold weight 700 across heading fragments, smaller footer headings and no horizontal overflow on sampled home, residential, office, contact and calculator pages. Desktop dropdowns and the mobile drawer were exercised.

Live Admin publishing was tested: a temporary More → Explore label reached the website and was restored; Blogs was hidden through Show in menu and disappeared from the live header; Restore default menu brought Blogs back. The page picker retained the Blogs selection. Tests ended with the default menu visible and published.

Latest build: `8LUal9oz5iMA3WKIKiZhV`. Archive SHA256: `6dee18405577141bf9988124547c7e0bbe8d72ef0a1b59fcbbb29d2861fbca5e`, verified on the server.

Rollback directory: `/home/robilea1/be-release-backups/menu-recovery-20261103/`, containing `next.before` and `server.js.before`. Server output was deployed cleanly, with previous static chunks retained for open browsers. Existing dependencies, environment, public assets, published logo/favicon and main-domain files were retained.

Source working copy remains in the project workspace under `be-interior`. No GitHub push has been performed.
