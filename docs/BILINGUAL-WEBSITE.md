# English and Bangla on the BE Interior website

On a first visit, visitors choose English or বাংলা. The browser remembers their choice for a year. The desktop header and mobile menu each have a language button. Changing language reloads the current page, including its query string. In-progress form and calculator inputs reset on reload.

The same URLs and slugs serve both preferences. Visitors and crawlers without a preference receive English HTML and metadata. A saved Bangla preference sets the HTML language and translates the page and its metadata on the server. Each URL keeps one canonical. The sitemap lists each URL once. There are no separate locale URLs for hreflang.

## Edit content in Sanity Studio

Open [Sanity Studio](https://web.beinterior.com.bd/beinterior/studio) after this release is deployed. The editing interface remains in English.

1. In **Pages**, open the relevant page and section. Under **Text**, open the entry and edit **Website text** for English or **Website text (Bangla)** for Bangla. Hero slides, cards, custom sections and FAQ entries have their own fields marked **(Bangla)**.
2. In **Site Settings**, go to **Menu and header button** for the main menu, dropdown labels and header button. Edit **Menu name** for English or **Menu name (Bangla)** for Bangla. **Announcements and offers** has a Bangla message field. Under the contact settings document, the address, opening hours and WhatsApp greeting have Bangla fields.
3. For a blog, project, customer review or team member, open the same record you already use for English. Fill in the applicable **(Bangla)** fields and publish. For blogs, **Content (Bangla)** accepts formatted blocks and images. The current slugs and shared images still apply.
4. For a page, blog or project, open **Search and social sharing** or **SEO (optional)**. Use the title and description fields marked **(Bangla)** for search and social metadata. The social image and search visibility setting are shared.
5. For calculator package copy, open the home or office package and edit its Bangla description, features or item details. Pricing and the package and room names used by the calculator to match records are shared.
6. Click **Publish**. Switch the public website to Bangla and refresh to verify the change. Cached public content can take about a minute to refresh.

If a Bangla field is empty, the website uses its built-in Bangla wording when the English value matches the bundled copy. For custom content, it displays the existing English value until you add Bangla. For an untranslated blog body the entire existing English body is displayed. The schema change requires no migration of published documents.

## Verification

Run `node scripts/verify-language.cjs` for translation precedence and fallback. Use a fresh browser profile to exercise the first-visit chooser, then check both language choices, the header and mobile switcher, a calculator path, a form error, and an existing English-only Sanity record.


## Files changed

- `docs/BILINGUAL-WEBSITE.md`
- `scripts/verify-language.cjs`
- `src/app/(client)/(more)/about/page.tsx`
- `src/app/(client)/(more)/blogs/[slug]/BlogDetails.tsx`
- `src/app/(client)/(more)/blogs/[slug]/page.tsx`
- `src/app/(client)/(more)/contact/page.tsx`
- `src/app/(client)/(more)/hire-architect/page.tsx`
- `src/app/(client)/[...not-found]/page.tsx`
- `src/app/(client)/error.tsx`
- `src/app/(client)/interior-projects/[slug]/page.tsx`
- `src/app/(client)/interior-projects/[slug]/ProjectDetails.tsx`
- `src/app/(client)/interior-projects/page.tsx`
- `src/app/(client)/layout.tsx`
- `src/app/(client)/not-found.tsx`
- `src/app/(client)/page.tsx`
- `src/app/(client)/services/budget-calculator/page.tsx`
- `src/app/(client)/services/home-interior/page.tsx`
- `src/app/(client)/services/office-interior/page.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/axios/axios.ts`
- `src/axios/query.ts`
- `src/components/about/OurTeam/OurTeamError.tsx`
- `src/components/about/OurTeam/OurTeamSuspense.tsx`
- `src/components/blogs/BlogSection/BlogSection.tsx`
- `src/components/calculator/BudgetCalculatorStep1.tsx`
- `src/components/cms/CmsHero.tsx`
- `src/components/cms/ContentProvider.tsx`
- `src/components/cms/Editable.tsx`
- `src/components/cms/PageSections.tsx`
- `src/components/contact/contactform/ContactForm.tsx`
- `src/components/Header/Navbar.tsx`
- `src/components/Header/NavLinks.tsx`
- `src/components/Header/SearchModal.tsx`
- `src/components/Header/useSiteSettings.ts`
- `src/components/hire-architect/hireform/HireForm.tsx`
- `src/components/home-interior/home-comment/HomeComment.tsx`
- `src/components/home-interior/home-interior-slider/WhastappErrorFallback.tsx`
- `src/components/home-interior/home-review/HomeCustomerSuspense.tsx`
- `src/components/home-interior/HomeDream.tsx/HomeDreamSuspense.tsx`
- `src/components/home/beinteriorproj/BeInteriorError.tsx`
- `src/components/home/happycustomers/HappyCustomererr.tsx`
- `src/components/home/officeproject/OfficeProjectError.tsx`
- `src/components/Language.tsx`
- `src/components/office-interior/office-form/Officeform.tsx`
- `src/components/skeleton/HappyCustomersSuspense.tsx`
- `src/components/skeleton/HomeProjectSuspense.tsx`
- `src/components/skeleton/JustClickSuspense.tsx`
- `src/components/skeleton/OfficeProjectSuspense.tsx`
- `src/content/bangla.json`
- `src/globalwrapper/ClientGlobalWrapper.tsx`
- `src/lib/cms-server.ts`
- `src/lib/cms.ts`
- `src/lib/content-seo.ts`
- `src/lib/language-server.ts`
- `src/lib/language.ts`
- `src/lib/localized-content.ts`
- `src/lib/seo.ts`
- `src/lib/site-settings.ts`
- `src/sanity/schemaTypes/banglaFields.ts`
- `src/sanity/schemaTypes/BlogSchema.ts`
- `src/sanity/schemaTypes/calculatorSchema.ts`
- `src/sanity/schemaTypes/ClientTypes.ts`
- `src/sanity/schemaTypes/HomeProjectType.ts`
- `src/sanity/schemaTypes/interiorTeamType.ts`
- `src/sanity/schemaTypes/ManagedContent.ts`
- `src/sanity/schemaTypes/officeCalculatorSchema.ts`
- `src/sanity/schemaTypes/OfficeProjecttype.ts`
- `src/sanity/schemaTypes/SeoType.ts`
- `src/sanity/schemaTypes/SiteDesign.ts`
- `src/sanity/schemaTypes/SiteSettings.ts`
- `src/sanity/schemaTypes/WebsiteSettings.ts`
