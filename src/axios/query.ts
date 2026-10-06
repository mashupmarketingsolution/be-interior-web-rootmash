export const homeProjectQuery =
  encodeURIComponent(` *[_type == "home-projects"]{
  _id,
  name,
  _type,
  "slug": slug.current,
  "coverImage": coverimage.asset->url,
   "galleryImage" : gallery[].asset->url,
   videoLink,
   size,
   location
}`);

export const officeProjectQuery =
  encodeURIComponent(` *[_type == "office-projects"]{
  _id,
  name,
  _type,
  "slug": slug.current,
  "coverImage": coverimage.asset->url,
   "galleryImage" : gallery[].asset->url,
   videoLink,
   size,
   location
}`);

export const homePageClientReview = encodeURIComponent(`*[_type == "clients"]{
  _id,
  name,
  designation,
  review,
  "clientimage" : clientimage.asset->url
}`);

export const whatsAppNumber =
  encodeURIComponent(`*[_type == "website-settings"]{
  _id,
  WhatsAppNumber,
}`);

export const footerContactItems = encodeURIComponent(`
  *[_type == "website-settings"]{
  footercontactnumber1,
  footercontactnumber2,
  footercontactemail,
  footerlocation,
  links
}`);

export const homeInteriorPageClientReview = encodeURIComponent(`
  *[_type == "clients" && reviewCategory in ["home", "renovation"]]{
  _id,
  name,
  review,
  "clientimage" : clientimage.asset->url
}`);

export const officeInteriorPageClientReview = encodeURIComponent(`
  *[_type == "clients" && reviewCategory == "office"]{
  _id,
  name,
  designation,
  review,
  "clientimage" : clientimage.asset->url
}`);

export const interiorTeam = encodeURIComponent(`
  *[_type == "interior-team"]{
  name,
  designation,
  "memberImage" : memberimage.asset->url
}`);

export const contactItems = encodeURIComponent(`
  *[_type == "website-settings"]{
  WhatsAppNumber,
  footercontactemail,
  footercontactnumber1
}`);

export const contactLocation = encodeURIComponent(`
  *[_type == "website-settings"]{

  footerlocation
}`);

export const allinteriorItem = encodeURIComponent(`
 *[_type in ["home-projects", "office-projects"]] | order(_createdAt desc) {
  _id,
  _type,
  name,
  "slug": slug.current,
  "coverImage" : coverimage.asset->url,
  "galleryImages": gallery[].asset->url,
  size,
  location
} `);

export const allModalinteriorItem = encodeURIComponent(`
 *[_type in ["home-projects", "office-projects"]] | order(_createdAt desc) {
  _id,
  name,
  _type,
  "slug": slug.current,
} `);

export const topFiveOfficeProjects = encodeURIComponent(`
 *[_type == "office-projects" && projectCategory == "top"][0...4]{
  _id,
  name,
  _type,
  "slug": slug.current,
  "coverImage": coverimage.asset->url,
  "galleryImage" : gallery[].asset->url,
  size,
  location,
  projectCategory
}
  `);

export const allBlogQuery = encodeURIComponent(`*[_type == "blogs"]{
 blogname,
  "slug": slug.current,
  blogcategory,
  publishedAt,
  readTime,
  "coverImage": blogcover.asset->url,
  authorname,
  authorrole,
  readTime,
  "authorImage": authorimage.asset->url,
  tags,
  content,
  publishedDate
}`);

export const packageQuery = encodeURIComponent(`*[_type == "packageType"]{
  packagename,
  packageitems
}`);
export const officePackageQuery = encodeURIComponent(`
  *[_type == "officePackageType"]{
    packagename,
    ratePerSft,
    description,
    inclusions,
    exclusions,
    addOns
  }
`);
