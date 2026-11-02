# BE Interior Admin audit — 3 November 2026

Scope: read-only review of the current Sanity schemas/front-end source and twelve live pages: Home, home/office services, About, Contact, Blogs, Projects, Calculator, Hire an architect, Privacy, Terms and Refund. This is a content-management audit, not a claim that every form, integration or security control was retested. No live content/settings were changed during this audit.

## Already managed in Admin

- Site Settings: logo/alternative text, favicon, approved font choices, heading colours, button/active-menu colour, header button and desktop/mobile navigation. Navigation includes visibility, ordering, dropdowns, page selection and default restoration.
- Website Settings: WhatsApp, phone numbers, email, address and social links. The map already derives its address from this content.
- Home and office projects: names, images/gallery, video, size/location, slug and optional SEO. Office projects already have a top/normal category.
- Blogs: content, category, author, images, tags, date and optional SEO.
- Clients: customer review content, review category, name/designation and photo.
- Team: member name, designation and photo.
- Home calculator packages/items and office calculator package rate/inclusions/exclusions/add-ons.
- Leads: basic name, email, phone and project information; the dashboard shows basic project/lead counts and recent enquiries.

## Priority roadmap

| Priority | Improvement | Practical benefit |
| --- | --- | --- |
| 1 | Homepage editor: hero slides, images, title/subtitle, buttons/links, visibility, ordering and selected featured projects | Routine campaigns and portfolio changes without editing code |
| 1 | One pricing source for service-page cards and calculator; managed package images/features, rates and approved calculation factors | A rate change stays consistent across the website |
| 1 | Lead workflow: New/Contacted/Quotation sent/Won/Lost, assigned person, follow-up date, notes and filtered/exportable lists | Easier follow-up and visibility of pending enquiries |
| 2 | Page content: About/founder image/story, service descriptions, workflow, differentiators, warranty/timeline copy and call-to-action sections | Business information can be updated without deployment |
| 2 | Unified Contact & Footer area: current contact/social controls, plus opening hours, WhatsApp greeting, footer introduction/menus and Facebook preview image | A clear single place for business details and footer updates |
| 2 | SEO settings for Home/About/service/contact/listing pages, with sharing-image defaults | These static-page titles/descriptions currently live in code; blog/project SEO already exists |
| 2 | Common Show/Hide, ordering and featured placement for projects/reviews/team; add image alt/caption fields | Reusable content can be curated without deleting records |
| 3 | FAQs and policy-page content with last-updated date | Routine customer questions and approved policy updates become easier to maintain |
| 3 | Preview before publishing and section-specific restore options | Editors can review appearance and recover section content; existing Draft/Publish and menu restoration remain useful |
| 3 | Optional announcement/offer strip with start/end dates and visibility | Time-limited announcements can be scheduled without code changes |

## Evidence behind the highest priorities

1. `src/components/home/Home-section/Slider.tsx` imports fixed image files and contains the hero titles/buttons. Home workflow/differentiators and service cards also use local content arrays.
2. `src/components/office-interior/office-package/OfficePackage.tsx` stores displayed package prices/features in a local array. `src/components/calculator/BudgetCalculatorStep1.tsx` reads `ratePerSft` from office package documents; calculation scope multipliers remain in code. This is separate configuration, so a CMS rate edit does not automatically update the marketing card price.
3. `src/sanity/schemaTypes/LeadType.ts` has four basic fields; follow-up status, assignee, notes and dates are not defined. Existing dashboard counts are not a follow-up workflow.
4. `src/components/about/About-founders/AboutFounders.tsx` imports the founder photo and stores the quote/profile text in the component. Company-history copy is also local.
5. `src/components/Footer/Footer.tsx` already reads contact/social content but contains local footer introduction and quick-link lists, plus a bundled Facebook preview picture.
6. `src/lib/seo.ts` contains the static-page metadata list. Blog/project documents already have the reusable `seo` object, so this is an extension to remaining pages, not a replacement for existing SEO.

## Suggested Admin organization

- **Site Settings:** Branding, Appearance, Navigation, Contact & Footer.
- **Pages:** Home, About, Services, Contact/Hire content, FAQs, Policies and page SEO.
- **Content:** Projects, Blogs, Reviews, Team.
- **Pricing:** Home packages and Office packages.
- **Leads:** Inbox, follow-ups and status filters.

Rename ambiguous labels such as Clients → Reviews and Package Type → Home packages. Keep existing documents/data while reorganizing the navigation; avoid making a second copy of the same phone number or package rate.

Do not add a public-facing editor for arbitrary JavaScript/CSS, server passwords or API secrets. Business content should use structured fields and approved design options. Technical credentials and deployment configuration remain outside content editing.

Suggested first delivery: homepage content management, pricing consistency and lead follow-up. Then page/footer content and remaining-page SEO. New functionality has not been implemented as part of this audit.
