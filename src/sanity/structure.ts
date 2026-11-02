import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().id('siteSettings').title('Site Settings').child(
        S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')
      ),
      S.documentTypeListItem('sitePage').title('Pages — text, sections & SEO'),
      S.documentTypeListItem('siteSection').title('Designed sections — images & content'),
      ...S.documentTypeListItems().filter((item) => !['siteSettings', 'sitePage', 'siteSection'].includes(item.getId() || '')),
    ])
