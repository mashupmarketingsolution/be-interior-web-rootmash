import { LocalizedText } from "@/components/Language";
import { PageSections } from "@/components/cms/PageSections";
import OfficeChoose from "@/components/office-interior/office-choose/OfficeChoose";
import OfficeClients from "@/components/office-interior/office-clients/OfficeClients";
import OfficeReview from "@/components/office-interior/office-customers/OfficeReview";
import Officeform from "@/components/office-interior/office-form/Officeform";
import OfficePackage from "@/components/office-interior/office-package/OfficePackage";
import OfficeProjects from "@/components/office-interior/office-projects/OfficeProjects";
import OfficeService from "@/components/office-interior/office-service/OfficeService";
import OfficeInteriorSlider from "@/components/office-interior/Office-Slider/OfficeInteriorSlider";
import OfficeWork from "@/components/office-interior/office-work/OfficeWork";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";
import HomeCustomersSuspense from "@/components/home-interior/home-review/HomeCustomerSuspense";
import HappyCustomererr from "@/components/home/happycustomers/HappyCustomererr";
import OfficeProjectErr from "@/components/home/officeproject/OfficeProjectError";

const OfficePage = () => {
  return (
    <div>
      <h1 data-heading-tone="dark" className="sr-only"><LocalizedText>{"Office interior design in Dhaka"}</LocalizedText></h1>
      <PageSections path="/services/office-interior" slots={[{ id: "section-ada934298a1e", node: (<OfficeInteriorSlider />) },
{ id: "section-8abdd6e09c4b", node: (<OfficeService />) },
{ id: "section-0173da3c8617", node: (<OfficeChoose />) },
{ id: "section-1cef778566e8", node: (<OfficePackage />) },
{ id: "section-03eac0d150b1", node: (<OfficeWork />) },
{ id: "section-11179bfeccff", node: (<ErrorBoundary fallback={<OfficeProjectErr/>}>
        <OfficeProjects />
      </ErrorBoundary>) },
{ id: "section-c4c19a2b7607", node: (<ErrorBoundary fallback={<HappyCustomererr />}>
          <OfficeReview />
      </ErrorBoundary>) },
{ id: "section-e1663bf0af5e", node: (<Officeform />) }]} />
    </div>
  );
};

export default OfficePage;
