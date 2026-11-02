"use client";
import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const journeySteps = [
  {
    id: "01",
    title: "Consultation & Concept",
    desc: "We dive deep into your vision, lifestyle, and specific requirements to draft a personalized initial concept that aligns with your dream.",
  },
  {
    id: "02",
    title: "Design & 3D Modeling",
    desc: "Watch your future space come alive. We provide detailed space planning and hyper-realistic 3D renders for your absolute clarity.",
  },
  {
    id: "03",
    title: "Execution & Handover",
    desc: "Our expert craftsmen bring the approved design to reality with precision, ensuring a seamless build and a timely, perfect handover.",
  },
];

const HomeSolution = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center mt-16 px-4 bg-ivory/50 py-20">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 data-heading-tone="dark" className="text-3xl md:text-4xl lg:text-5xl font-montagu text-secondary tracking-wide font-bold">
          The complete <span className="text-inherit">interior journey</span>
        </h2>
      </div>

      <div className="w-full max-w-7xl mt-8">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          loop={false}
          className="px-4 py-8"
        >
          {journeySteps.map((step) => (
            <SwiperSlide key={step.id} className="h-auto">
              <div className="group relative w-full h-full bg-white rounded-[2.5rem] p-8 sm:p-10 border border-zinc-100 hover:border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden flex flex-col cursor-pointer min-h-[340px]">
                <div className="absolute -top-6 -right-2 text-[140px] font-black text-zinc-50 group-hover:text-primary/[0.03] transition-colors duration-700 pointer-events-none select-none font-montagu leading-none z-0">
                  {step.id}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-zinc-50 border border-zinc-100 group-hover:border-primary/30 group-hover:bg-primary/5 flex items-center justify-center transition-all duration-500 shadow-sm">
                      <span className="text-lg font-bold text-zinc-400 group-hover:text-primary transition-colors duration-500">
                        {step.id}
                      </span>
                    </div>

                    {/* Animated Flow Line */}
                    <div className="h-[2px] flex-grow bg-zinc-100 group-hover:bg-primary/20 transition-colors duration-500 rounded-full relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-primary w-0 group-hover:w-full transition-all duration-1000 ease-out delay-100"></div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mt-auto">
                    <h3 data-heading-tone="dark" className="font-bold font-montagu text-2xl text-zinc-800 group-hover:-translate-y-1 transition-transform duration-500">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-500 font-poppins mt-4 leading-relaxed group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Decorative Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSolution;
