"use client";
import { CmsText, CmsLink, CmsSection } from "@/components/cms/Editable";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { packageItemsApi } from "@/axios/axios";
import { FaCheckCircle, FaRegStar, FaCrown } from "react-icons/fa";
import { LuGem } from "react-icons/lu";

const HomeOurPackage = () => {
  const templates = [
    {
      name: "Essential",
      icon: <FaRegStar className="text-white text-3xl opacity-80" />,
      headerBg: "bg-primary",
      features: [
        "Budget-Friendly Material Selection",
        "Functional 2D Layout",
        "Convenient 3D Design",
        "Standard Accessories",
        "Durable Materials",
        "Execution",
      ],
      isPopular: false,
    },
    {
      name: "Premium",
      icon: <LuGem className="text-white text-4xl animate-pulse" />,
      headerBg: "bg-secondary",
      features: [
        "Balanced Material & Finish Selection",
        "Functional 2D Layout",
        "High-end 3D Design",
        "Wide Range Accessories",
        "High Grade Materials",
        "Laminate Finish",
        "Execution",
      ],
      isPopular: true,
    },
    {
      name: "Luxury",
      icon: <FaCrown className="text-white text-3xl opacity-80" />,
      headerBg: "bg-primary",
      features: [
        "Premium Material & Finish Selection",
        "Functional 2D Layout",
        "Luxury 3D Design",
        "Branded Accessories",
        "Premium Materials",
        "Laminate, Acrylic & Mirror Sheet Finish",
        "Designer Decorative Items",
        "Execution",
      ],
      isPopular: false,
    },
  ];

  const { data } = useQuery({queryKey:["home-package-items"],queryFn:async()=> (await packageItemsApi()).data.result as {packagename:string;ratePerSft?:number;marketingFeatures?:string[];marketingImage?:string;featured?:boolean}[],refetchInterval:60000});
  const packages = data ? data.map((item,index)=>{const base=templates.find(t=>t.name.toLowerCase()===item.packagename.toLowerCase()) || templates[index % templates.length];return {...base,name:item.packagename,features:item.marketingFeatures ?? base.features,isPopular:item.featured ?? base.isPopular};}) : templates;
  return (
    <CmsSection section="section-bef92f830c4e"><div className="w-full  py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-poppins">

      <div className="text-center mb-16">
        <h2 data-heading-tone="dark" className="text-3xl md:text-5xl font-black tracking-wide text-zinc-800 uppercase font-montagu"><CmsText section="section-bef92f830c4e" entryKey="heading-318092cf9e72" fallback={"Curated design solutions"} original={<>
          Curated <span className="text-inherit    ">design solutions</span>
        </>} /></h2>
        <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-center justify-center w-full max-w-6xl px-2 lg:px-0">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`w-full bg-white rounded-3xl border-zinc-100/80 overflow-hidden transition-all duration-500 ease-out flex flex-col cursor-pointer
              ${
                pkg.isPopular
                  ? "shadow-2xl md:-translate-y-4 z-10 md:scale-105 border-primary/20 md:min-h-145"
                  : "shadow-xl hover:shadow-2xl hover:-translate-y-4 md:translate-y-0 z-0 md:min-h-[530px]"
              }
            `}
          >
            <div className={`relative ${pkg.headerBg} pt-10 pb-16 px-8 text-white flex justify-between items-center overflow-hidden`}>
              <div>
                <h3 data-heading-tone="light" className="text-2xl sm:text-3xl font-black tracking-wide font-montagu">
                  <CmsText section="section-bef92f830c4e" fallback={pkg.name} />
                </h3>
              </div>
              <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                {pkg.icon}
              </div>

            </div>

            <div className="p-8 flex-1 flex flex-col justify-between bg-white pt-10">
              <ul className="flex flex-col gap-4">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-zinc-600 text-sm sm:text-base group">
                    <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="font-medium tracking-wide leading-tight"><CmsText section="section-bef92f830c4e" fallback={feature} /></span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-xs sm:text-sm text-zinc-500 leading-relaxed">
              <p>
                <span className="font-semibold text-zinc-700"><CmsText section="section-bef92f830c4e" entryKey="text-38c95a655f64" fallback={"Pricing:"} /></span>{" "}<CmsText section="section-bef92f830c4e" entryKey="text-fbbd9b261e75" fallback={"Based on your selected rooms, package and project scope."} /></p>

              <p className="mt-2">
                <span className="font-semibold text-zinc-700"><CmsText section="section-bef92f830c4e" entryKey="text-11bc176a662d" fallback={"Final Scope:"} /></span>{" "}<CmsText section="section-bef92f830c4e" entryKey="text-dcd57fd5e522" fallback={"Materials, brands, quantities, inclusions and exclusions are confirmed in the detailed quotation after site measurement."} /></p>
            </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full flex justify-center">
        <CmsLink section="section-bef92f830c4e" entryKey="link-3ccc05b46105" href="/services/budget-calculator?type=home"><button className="px-10 py-4 bg-primary  text-white font-extrabold text-lg sm:text-xl tracking-wide rounded-lg shadow-lg  hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer uppercase"><CmsText section="section-bef92f830c4e" entryKey="text-3bd9dbeff8d2" fallback={"Calculate your budget"} /></button></CmsLink>
      </div>

    </div></CmsSection>
  );
};

export default HomeOurPackage;
