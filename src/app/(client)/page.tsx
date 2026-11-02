import { PageSections } from "@/components/cms/PageSections";
import Navbar from "@/components/Header/Navbar";
import BeinteriorProject from "@/components/home/beinteriorproj/BeinteriorProject";
import Competition from "@/components/home/competetion/Competition";
import Calculator from "@/components/home/dream-calculate/Calculator";
import HappyCustomers from "@/components/home/happycustomers/HappyCustomers";
import HomeSection from "@/components/home/Home-section/HomeSection";
import JustClick from "@/components/home/justclick/JustClick";
import Officeproject from "@/components/home/officeproject/Officeproject";
import Whatwedo from "@/components/home/whatwedo/Whatwedo";
import Whychooseus from "@/components/home/WhyChooseUS/Whychooseus";
import OurWorkFlow from "@/components/home/work-flow/OurWorkFlow";
import { ErrorBoundary } from "react-error-boundary";
import Image from "next/image";
import { Suspense } from "react";

import BeInteriorError from "@/components/home/beinteriorproj/BeInteriorError";
import OfficeProjectErr from "@/components/home/officeproject/OfficeProjectError";
import HappyCustomererr from "@/components/home/happycustomers/HappyCustomererr";
import JustClickSuspense from "@/components/skeleton/JustClickSuspense";

export default function Home() {
  return (
    <div className="">
      <PageSections path="/" slots={[{ id: "section-d036fe38185d", node: (<HomeSection />) },
{ id: "section-895eb710140e", node: (<Whatwedo />) },
{ id: "section-b90b0c348627", node: (<OurWorkFlow />) },
{ id: "section-994fa32343da", node: (<Whychooseus />) },
{ id: "section-37b8a2c22aa5", node: (<ErrorBoundary fallback={<BeInteriorError />}>
        <BeinteriorProject />
      </ErrorBoundary>) },
{ id: "section-8ac0a3caab4b", node: (<Calculator />) },
{ id: "section-39381f4c733d", node: (<ErrorBoundary fallback={<OfficeProjectErr />}>
          <Officeproject />
      </ErrorBoundary>) },
{ id: "section-8829bda372d5", node: (<Competition />) },
{ id: "section-6bda2feda9af", node: (<ErrorBoundary fallback={<HappyCustomererr />}>
          <HappyCustomers />
      </ErrorBoundary>) },
{ id: "section-adb0c734da06", node: (<ErrorBoundary fallback={<div>প্রজেক্ট লোড করতে সমস্যা হয়েছে।</div>}>
        <Suspense fallback={<JustClickSuspense />}>
          <JustClick />
        </Suspense>
      </ErrorBoundary>) }]} />
    </div>
  );
}
