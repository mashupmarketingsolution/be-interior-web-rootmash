"use client";
import { CmsText, CmsLink, useCmsList, CmsSection } from "@/components/cms/Editable";
import Link from "next/link";
import React from "react";
import { ShieldCheck, Clock, Tag, Headset } from "lucide-react"; // lucide-react ব্যবহার করা হয়েছে

const Whychooseus = () => {
  const features = useCmsList("section-994fa32343da", "features", [
    {
      title: "Thoughtful Value",
      desc: "Design choices are planned around your priorities, scope and budget, with clear pricing and material discussions before execution.",
      icon: <Tag size={32} className="text-primary" />,
    },
    {
      title: "Express 45-Day Execution",
      desc: "Project timelines are planned based on scope, site conditions and approvals, with clear milestones and regular progress updates.",
      icon: <Clock size={32} className="text-primary" />,
    },
    {
      title: "24-Month Assurance",
      desc: "We stand confidently behind our craftsmanship. Every single project is backed by a solid 2-year protection plan.",
      icon: <ShieldCheck size={32} className="text-primary" />,
    },
    {
      title: "Dedicated Post-Handover Support",
      desc: "Handing over the keys is just the beginning. We remain just a call away for any future assistance or maintenance you might need.",
      icon: <Headset size={32} className="text-primary" />,
    },
  ]);

  return (
    <CmsSection section="section-994fa32343da"><section className="w-full py-20 px-4 bg-ivory">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <h2 data-heading-tone="dark" className="text-3xl md:text-5xl font-montagu text-[#111111] tracking-wide font-bold text-center mb-16"><CmsText section="section-994fa32343da" entryKey="heading-2a043c339651" fallback={"Excellence by design"} original={<>
          Excellence <span className="text-inherit">by design</span>
        </>} /></h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-3xl border border-black/5 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="mb-6 p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 data-heading-tone="dark" className="text-xl font-bold text-[#111111] mb-3"><CmsText section="section-994fa32343da" fallback={item.title} /></h3>
              <p className="text-zinc-600 text-sm leading-relaxed"><CmsText section="section-994fa32343da" fallback={item.desc} /></p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <CmsLink section="section-994fa32343da" entryKey="link-8bd155e4e011" href={"/hire-architect"}>
          <button className="mt-16 px-10 py-5 bg-[#111111] hover:bg-primary text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"><CmsText section="section-994fa32343da" entryKey="text-acef1e21d50c" fallback={"Book free consultation"} /></button>
        </CmsLink>
      </div>
    </section></CmsSection>
  );
};

export default Whychooseus;
