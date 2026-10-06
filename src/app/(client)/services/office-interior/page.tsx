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
      <h1 className="sr-only">Office Interior Design in Dhaka</h1>
      <OfficeInteriorSlider />
      <OfficeService />
      <OfficeChoose />
      <OfficePackage />
      <OfficeWork />
      <ErrorBoundary fallback={<OfficeProjectErr/>}>
        <OfficeProjects />
      </ErrorBoundary>

      <ErrorBoundary fallback={<HappyCustomererr />}>
          <OfficeReview />
      </ErrorBoundary>
      <Officeform />
    </div>
  );
};

export default OfficePage;
