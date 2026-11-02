"use client";
import { CmsText, useCmsList, CmsSection } from "@/components/cms/Editable";
import React from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BiBuildingHouse } from "react-icons/bi";
import { MdOutlineCamera } from "react-icons/md";

const OfficeService = () => {
  const services = useCmsList("section-8abdd6e09c4b", "services", [
    {
      title: "New Office Design",
      desc: "Modern, functional office designs tailored for productivity and style.",
      icon: <HiOutlineLightBulb className="text-3xl text-primary" />,
    },
    {
      title: "Build A Project",
      desc: "We construct inspiring office spaces with the provided designs.",
      icon: <BiBuildingHouse className="text-3xl text-primary" />,
    },
    {
      title: "Renovation",
      desc: "Revitalize your office with fresh designs and space optimization.",
      icon: <MdOutlineCamera className="text-3xl text-primary" />,
    },
  ]);

  return (
    <CmsSection section="section-8abdd6e09c4b"><section className="w-full bg-ivory py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Simple & Clean Header */}
        <div className="text-center mb-16">
          <h2 data-heading-tone="dark" className="text-3xl md:text-5xl font-montagu font-bold text-[#111111]"><CmsText section="section-8abdd6e09c4b" entryKey="heading-0e5ecd8383d4" fallback={"Services we offer"} original={<>
            Services <span className="text-inherit">we offer</span>
          </>} /></h2>
          <div className="w-20 h-1 bg-primary mt-4 rounded-full mb-14 mx-auto" />
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 md:p-10 rounded-2xl border border-[#111111]/5 flex flex-col items-center text-center transition-colors duration-300 hover:border-primary/20"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-[#FAF5E9] rounded-full flex items-center justify-center mb-6">
                {service.icon}
              </div>

              {/* Text Content */}
              <h3 data-heading-tone="dark" className="text-lg md:text-xl font-bold text-[#111111] mb-3 font-montagu">
                <CmsText section="section-8abdd6e09c4b" fallback={service.title} />
              </h3>

              <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                <CmsText section="section-8abdd6e09c4b" fallback={service.desc} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section></CmsSection>
  );
};

export default OfficeService;
