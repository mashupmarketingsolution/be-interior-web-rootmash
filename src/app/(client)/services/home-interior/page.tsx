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
      <h1 className="sr-only">Home Interior Design in Dhaka</h1>
      <ErrorBoundary fallback={<div>প্রজেক্ট লোড করতে সমস্যা হয়েছে।</div>}>
        <HomeInteriorSlider />
      </ErrorBoundary>
      <HomeSolution />
      <HomeOurPackage />
      <ErrorBoundary fallback={""}>
        <HomeDream />
      </ErrorBoundary>
      <ErrorBoundary fallback={<BeInteriorError />}>
        <HomeInteriorProjects />
      </ErrorBoundary>
      <HomePromise />

      <ErrorBoundary fallback={<HappyCustomererr />}>
        <HomeCustomerReview />
      </ErrorBoundary>
      <HomeComment />
    </div>
  );
};

export default HomeInterior;
