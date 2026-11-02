"use client";
import { CmsText, useCmsList, CmsSection } from "@/components/cms/Editable";
import React from "react";
import { FiDollarSign, FiClock, FiShield, FiLayers, FiCheckCircle, FiHeart } from "react-icons/fi";

const OfficeWork = () => {

  const promiseData = useCmsList("section-03eac0d150b1", "promiseData", [
    {
      id: 1,
      title: "Best Price",
      highlight: "PRICE",
      desc: "We guarantee competitive and transparent pricing tailored to your workspace needs without any hidden costs.",
      icon: <FiDollarSign className="text-xl sm:text-2xl" />,
    },
    {
      id: 2,
      title: "Handover",
      highlight: "45 DAYS",
      desc: "Fast and reliable project delivery. We assure complete office setup handover within 45 days, guaranteed.",
      icon: <FiClock className="text-xl sm:text-2xl" />,
      isOrange: true,
    },
    {
      id: 3,
      title: "Warranty",
      highlight: "2 YEARS",
      desc: "Enjoy complete peace of mind with our comprehensive 2-year service and structural warranty support.",
      icon: <FiShield className="text-xl sm:text-2xl" />,
    },
    {
      id: 4,
      title: "Premium",
      highlight: "MATERIAL",
      desc: "We source only top-tier, certified materials and premium hardware to build long-lasting corporate environments.",
      icon: <FiLayers className="text-xl sm:text-2xl" />,
    },
    {
      id: 5,
      title: "Quality",
      highlight: "100%",
      desc: "Strict multi-step quality audits during execution ensuring flawless finish, premium aesthetics, and durability.",
      icon: <FiCheckCircle className="text-xl sm:text-2xl" />,
    },
    {
      id: 6,
      title: "After Sale",
      highlight: "SERVICE",
      desc: "Our dedicated support team is always ready to assist you post-occupancy for any maintenance or modifications.",
      icon: <FiHeart className="text-xl sm:text-2xl" />,
    },
  ]);

  return (
    <CmsSection section="section-03eac0d150b1"><div className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 font-poppins relative overflow-hidden">

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#365856]/5 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -ml-20 -mb-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        

        <div className="text-center mb-20">
          <h2 data-heading-tone="dark" className="text-3xl md:text-5xl font-black text-zinc-800 tracking-wide font-montagu uppercase"><CmsText section="section-03eac0d150b1" entryKey="heading-610c9f5da9ad" fallback={"How BE Interior works"} original={<>
            How BE Interior <span className="text-inherit">works</span>
          </>} /></h2>
          <p className="text-zinc-500 mt-3 text-sm sm:text-base font-medium max-w-md mx-auto"><CmsText section="section-03eac0d150b1" entryKey="text-971637a5abbf" fallback={"Combining efficiency, quality, and commitment through a seamless execution map."} /></p>
          <div className="w-20 h-1 bg-primary mx-auto mt-5 rounded-full" />
        </div>


        <div className="relative">
          

          <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#365856]/20 via-[#365856] to-[#365856]/20 -translate-x-1/2 hidden sm:block" />


          <div className="space-y-12 sm:space-y-16">
            {promiseData.map((item, index) => {
              const isEven = index % 2 === 1;
              return (
                <div 
                  key={item.id} 
                  className={`flex flex-col sm:flex-row items-start sm:items-center relative w-full
                    ${isEven ? "sm:flex-row-reverse" : ""}
                  `}
                >
                  

                  <div className="w-full sm:w-[calc(50%-32px)] pl-16 sm:pl-0 group">
                    <div className={`p-6 sm:p-8 bg-white rounded-3xl border border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(54,88,86,0.06)] hover:-translate-y-1 transition-all duration-300 text-left
                      ${isEven ? "sm:text-left" : "sm:text-right"}
                    `}>
                      <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase block mb-1"><CmsText section="section-03eac0d150b1" entryKey="text-3128fd172c9c" fallback={"Promise 0"} />{item.id}
                      </span>
                      <h3 data-heading-tone="dark" className="text-lg sm:text-xl font-extrabold text-zinc-800 font-poppins">
                        <CmsText section="section-03eac0d150b1" fallback={item.title} />{" "}
                        <span className={item.isOrange ? "text-amber-600" : "text-inherit"}>
                          {item.highlight}
                        </span>
                      </h3>
                      <p className={`text-zinc-500 text-xs sm:text-sm mt-3 leading-relaxed font-medium max-w-md
                        ${!isEven ? "sm:ml-auto" : ""}
                      `}>
                        <CmsText section="section-03eac0d150b1" fallback={item.desc} />
                      </p>
                    </div>
                  </div>


                  <div className="absolute left-0 sm:left-1/2 top-4 sm:top-auto w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-md shadow-[#365856]/10 z-20 -translate-x-0 sm:-translate-x-1/2 ring-8 ring-[#fdfaf4] group-hover:scale-110 transition-transform duration-300">
                    <div className={`w-full h-full rounded-full flex items-center justify-center transition-colors duration-300
                      ${item.isOrange ? "bg-amber-500/10 text-amber-600" : "bg-primary/10 text-primary"}
                    `}>
                      {item.icon}
                    </div>
                  </div>


                  <div className="hidden sm:block w-[calc(50%-32px)]" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div></CmsSection>
  );
};

export default OfficeWork;