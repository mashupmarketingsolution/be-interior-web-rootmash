import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().id('siteSettings').title('Site Settings').child(
        S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')
      ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'siteSettings'),
    ])
