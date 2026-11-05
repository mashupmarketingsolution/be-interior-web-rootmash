import { LocalizedText } from "@/components/Language";
import { PageSections } from "@/components/cms/PageSections";
import HomeComment from "@/components/home-interior/home-comment/HomeComment";
import HomeInteriorProjects from "@/components/home-interior/home-interior-projects/HomeInteriorProject";
import HomeInteriorSlider from "@/components/home-interior/home-interior-slider/HomeInteriorSlider";
import HomeSliderSkeleton from "@/components/home-interior/home-interior-slider/HomeSliderSkeleton";
import WhatsappErrorFallback from "@/components/home-interior/home-interior-slider/WhastappErrorFallback";
import HomeOurPackage from "@/components/home-interior/home-package/HomePackage";
import HomePromise from "@/components/home-interior/home-promise/HomePromise";
import HomeCustomersSuspense from "@/components/home-interior/home-review/HomeCustomerSuspense";
import HomeCustomerReview from "@/components/home-interior/home-review/HomeReviewCustomer";
import HomeSolution from "@/components/home-interior/home-solution/HomeSolution";
import HomeDream from "@/components/home-interior/HomeDream.tsx/HomeDream";
import HomeDreamSuspense from "@/components/home-interior/HomeDream.tsx/HomeDreamSuspense";
import BeInteriorError from "@/components/home/beinteriorproj/BeInteriorError";
import HappyCustomererr from "@/components/home/happycustomers/HappyCustomererr";
import HomeProjectSuspense from "@/components/skeleton/HomeProjectSuspense";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const HomeInterior = () => {
  return (
    <div className="">
      <h1 data-heading-tone="dark" className="sr-only"><LocalizedText>{"Home interior design in Dhaka"}</LocalizedText></h1>
      <PageSections path="/services/home-interior" slots={[{ id: "section-4d67118a0e1e", node: (<ErrorBoundary fallback={<div><LocalizedText>Failed to load projects.</LocalizedText></div>}>
        <HomeInteriorSlider />
      </ErrorBoundary>) },
{ id: "section-8c426c953f30", node: (<HomeSolution />) },
{ id: "section-bef92f830c4e", node: (<HomeOurPackage />) },
{ id: "section-0fb53cd24278", node: (<ErrorBoundary fallback={""}>
        <HomeDream />
      </ErrorBoundary>) },
{ id: "section-7d2161405ba7", node: (<ErrorBoundary fallback={<BeInteriorError />}>
        <HomeInteriorProjects />
      </ErrorBoundary>) },
{ id: "section-64ef308122c5", node: (<HomePromise />) },
{ id: "section-b308599ab361", node: (<ErrorBoundary fallback={<HappyCustomererr />}>
        <HomeCustomerReview />
      </ErrorBoundary>) },
{ id: "section-f0e0d8d7c3c1", node: (<HomeComment />) }]} />
    </div>
  );
};

export default HomeInterior;
