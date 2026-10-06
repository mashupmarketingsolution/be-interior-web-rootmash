import AboutFounders from "@/components/about/About-founders/AboutFounders";
import HowitStarted from "@/components/about/howitstarted/HowitStarted";
import OurTeam from "@/components/about/OurTeam/OurTeam";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";
import TeamSectionSkeleton from "@/components/about/OurTeam/OurTeamSuspense";
import TeamSectionErrorFallback from "@/components/about/OurTeam/OurTeamError";

const AboutUS = () => {
  return (
    <div className="mt-25">
      <h1 className="sr-only">About BE Interior</h1>
      <AboutFounders />
      <HowitStarted />
      {/* <ErrorBoundary fallback={<div className="text-black">haker</div>}>
        <Suspense fallback={<TeamSectionSkeleton/>}>
          <OurTeam />
        </Suspense>
      </ErrorBoundary> */}
    </div>
  );
};

export default AboutUS;
