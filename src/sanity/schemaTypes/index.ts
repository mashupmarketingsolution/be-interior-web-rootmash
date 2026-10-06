import { SeoType } from "./SeoType";
import { type SchemaTypeDefinition } from "sanity";
import { HomeProjectType } from "./HomeProjectType";
import { OfficeProjectType } from "./OfficeProjecttype";
import { ClientType } from "./ClientTypes";
import { WebsiteSettingsType } from "./WebsiteSettings";
import { InteriorTeamType } from "./interiorTeamType";
import { LeadType } from "./LeadType";
import { BlogSchemtype } from "./BlogSchema";
import { PackageSchema } from "./calculatorSchema";
import { OfficePackageSchema } from "./officeCalculatorSchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    SeoType,
    HomeProjectType,
    OfficeProjectType,
    PackageSchema,
    OfficePackageSchema,
    BlogSchemtype,
    ClientType,
    WebsiteSettingsType,
    InteriorTeamType,
    LeadType,
  ],
};
