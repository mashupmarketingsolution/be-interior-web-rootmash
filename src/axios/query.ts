export const homeProjectQuery =
  encodeURIComponent(` *[_type == "home-projects" && enabled != false] | order(sortOrder asc, featured desc, _createdAt desc){
  _id,
  name, nameBn,
  _type,
  "slug": slug.current,
  "coverImage": coverimage.asset->url,
   "galleryImage" : gallery[].asset->url,
   videoLink,
   size,
   location, locationBn
}`);

export const officeProjectQuery =
  encodeURIComponent(` *[_type == "office-projects" && enabled != false] | order(sortOrder asc, featured desc, _createdAt desc){
  _id,
  name, nameBn,
  _type,
  "slug": slug.current,
  "coverImage": coverimage.asset->url,
   "galleryImage" : gallery[].asset->url,
   videoLink,
   size,
   location, locationBn
}`);

export const homePageClientReview = encodeURIComponent(`*[_type == "clients" && enabled != false] | order(sortOrder asc, featured desc, _createdAt desc){
  _id,
  name, nameBn,
  designation, designationBn,
  review, reviewBn,
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
  footerlocation, footerlocationBn,
  links
}`);

export const homeInteriorPageClientReview = encodeURIComponent(`
  *[_type == "clients" && enabled != false && reviewCategory in ["home", "renovation"]] | order(sortOrder asc, featured desc, _createdAt desc){
  _id,
  name, nameBn,
  review, reviewBn,
  "clientimage" : clientimage.asset->url
}`);

export const officeInteriorPageClientReview = encodeURIComponent(`
  *[_type == "clients" && enabled != false && reviewCategory == "office"] | order(sortOrder asc, featured desc, _createdAt desc){
  _id,
  name, nameBn,
  designation, designationBn,
  review, reviewBn,
  "clientimage" : clientimage.asset->url
}`);

export const interiorTeam = encodeURIComponent(`
  *[_type == "interior-team" && enabled != false] | order(sortOrder asc, featured desc, _createdAt desc){
  name, nameBn,
  designation, designationBn,
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

  footerlocation, footerlocationBn
}`);

export const allinteriorItem = encodeURIComponent(`
 *[_type in ["home-projects", "office-projects"] && enabled != false] | order(sortOrder asc, featured desc, _createdAt desc) {
  _id,
  _type,
  name, nameBn,
  "slug": slug.current,
  "coverImage" : coverimage.asset->url,
  "galleryImages": gallery[].asset->url,
  size,
  location, locationBn
} `);

export const allModalinteriorItem = encodeURIComponent(`
 *[_type in ["home-projects", "office-projects"] && enabled != false] | order(sortOrder asc, featured desc, _createdAt desc) {
  _id,
  name, nameBn,
  _type,
  "slug": slug.current,
} `);

export const topFiveOfficeProjects = encodeURIComponent(`
 *[_type == "office-projects" && enabled != false && projectCategory == "top"][0...4] | order(sortOrder asc, featured desc, _createdAt desc){
  _id,
  name, nameBn,
  _type,
  "slug": slug.current,
  "coverImage": coverimage.asset->url,
  "galleryImage" : gallery[].asset->url,
  size,
  location, locationBn,
  projectCategory
}
  `);

export const allBlogQuery = encodeURIComponent(`*[_type == "blogs"]{
 blogname, blognameBn,
  "slug": slug.current,
  blogcategory,
  publishedAt,
  readTime, readTimeBn,
  "coverImage": blogcover.asset->url,
  authorname, authornameBn,
  authorrole, authorroleBn,
  "authorImage": authorimage.asset->url,
  tags, tagsBn,
  content, contentBn,
  publishedDate
}`);

export const packageQuery = encodeURIComponent(`*[_type == "packageType" && enabled != false] | order(sortOrder asc, _createdAt asc){
  packagename,
  packageitems, marketingFeatures, marketingFeaturesBn, featured
}`);
export const officePackageQuery = encodeURIComponent(`
  *[_type == "officePackageType" && enabled != false] | order(sortOrder asc, _createdAt asc){
    packagename,
    ratePerSft,
    description, descriptionBn,
    inclusions, inclusionsBn,
    exclusions, exclusionsBn,
    marketingFeatures, marketingFeaturesBn, "marketingImage": marketingImage.asset->url, featured,
    addOns
  }
`);
