"use client";
import { CmsText, CmsLink, CmsImage, useCmsList, CmsSection } from "@/components/cms/Editable";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Home, BriefcaseBusiness } from "lucide-react";
import React from "react";

import whatweOne from "@/logo/HomePage/home-interior.jpg";
import whatwetwo from "@/logo/HomePage/office-interior.jpg";

const Whatwedo = () => {
  const services = useCmsList("section-895eb710140e", "services", [
    {
      id: "01",
      title: "Style Your Sanctuary",
      subtitle: "Crafting personalized sanctuaries for modern living.",
      img: whatweOne,
      href: "/services/home-interior",
      icon: <Home className="w-6 h-6 text-white" strokeWidth={1.5} />,
    },
    {
      id: "02",
      title: "Elevate Your Workspace",
      subtitle: "Designing productive and inspiring corporate spaces.",
      img: whatwetwo,
      href: "/services/office-interior",
      icon: <BriefcaseBusiness className="w-6 h-6 text-white" strokeWidth={1.5} />,
    },
  ]);

  return (
    <CmsSection section="section-895eb710140e"><section className="w-full py-20 px-6 md:px-12 lg:px-20 font-sans bg-[#FAF5E9]">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <h2 data-heading-tone="dark" className="text-3xl md:text-4xl lg:text-5xl font-montagu font-medium text-[#111111]"><CmsText section="section-895eb710140e" entryKey="heading-38ccca978085" fallback={"Comprehensive solutions"} original={<>
          Comprehensive <span className="font-bold text-inherit">solutions</span>
        </>} /></h2>
        <p className="text-zinc-500 mt-4 max-w-lg text-sm md:text-base"><CmsText section="section-895eb710140e" entryKey="text-29c6a6837570" fallback={"End-to-end interior styling designed to match your aesthetics and functional requirements."} /></p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-7xl mx-auto">
        {services.map((service) => (
          <CmsLink section="section-895eb710140e" href={service.href} key={service.id} className="group block w-full">
            <div className="relative w-full h-112.5 lg:h-137.5 rounded-3xl overflow-hidden bg-zinc-900 shadow-lg">
              
              {/* Background Image with Hover Effect */}
              <CmsImage section="section-895eb710140e"
                src={service.img}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/90 transition-opacity duration-500 group-hover:to-black/80" />

              {/* Top Section: Number & Icon */}
              <div className="absolute right-9 top-5 flex justify-between items-start z-10">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/90 group-hover:border-primary">
                  {service.icon}
                </div>
              </div>

              {/* Bottom Section: Text & Call to Action */}
              <div className="absolute bottom-0 left-0 w-full p-8 lg:p-10 z-10 flex flex-col justify-end transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 data-heading-tone="light" className="text-3xl lg:text-4xl font-montagu font-bold text-white mb-3">
                  <CmsText section="section-895eb710140e" fallback={service.title} />
                </h3>
                
                <p className="text-zinc-300 text-sm md:text-base line-clamp-2 max-w-sm mb-6 lg:opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                  <CmsText section="section-895eb710140e" fallback={service.subtitle} />
                </p>

                {/* Elegant Read More Button */}
                <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-xs">
                  <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full"><CmsText section="section-895eb710140e" entryKey="text-738322fcdc87" fallback={"explore details"} /></span>
                    <span className="inline-block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full"><CmsText section="section-895eb710140e" entryKey="text-1d84b22cdd96" fallback={"explore details"} /></span>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

            </div>
          </CmsLink>
        ))}
      </div>
    </section></CmsSection>
  );
};

export default Whatwedo;