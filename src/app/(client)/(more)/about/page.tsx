import { LocalizedText } from "@/components/Language";
import { PageSections } from "@/components/cms/PageSections";
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
      <h1 data-heading-tone="dark" className="sr-only"><LocalizedText>{"About BE Interior"}</LocalizedText></h1>
      <PageSections path="/about" slots={[{ id: "section-f1fb928664c4", node: (<AboutFounders />) },
{ id: "section-c335e81ccd1b", node: (<HowitStarted />) }]} />
      {/* <ErrorBoundary fallback={<div className="text-black">haker</div>}>
        <Suspense fallback={<TeamSectionSkeleton/>}>
          <OurTeam />
        </Suspense>
      </ErrorBoundary> */}
    </div>
  );
};

export default AboutUS;
