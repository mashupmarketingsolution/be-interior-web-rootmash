"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const OfficeClients = () => {
  const blankSlides = [
    { id: 1, label: "Logo 01" },
    { id: 2, label: "Logo 02" },
    { id: 3, label: "Logo 03" },
    { id: 4, label: "Logo 04" },
    { id: 5, label: "Logo 05" },
  ];

  return (
    <div className="w-full bg-[#fafafa] py-16 border-y border-zinc-100 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="flex items-center shrink-0 lg:border-r lg:border-zinc-300 lg:pr-12 lg:h-16">
            <div className="text-left">
              <h4 data-heading-tone="dark" className="text-xl sm:text-2xl font-extrabold text-[#365856] tracking-wide leading-tight uppercase font-montagu">
                Our valuable
              </h4>
              <span className="text-xl sm:text-2xl font-black text-primary tracking-wide uppercase block">
                Clients
              </span>
            </div>
          </div>

          <div className="w-full overflow-hidden select-none">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={2}
              loop={true}
              speed={4000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 32 },
                1024: { slidesPerView: 4, spaceBetween: 40 },
                1280: { slidesPerView: 5, spaceBetween: 48 },
              }}
              className="client-swiper-wrapper linear-easing"
            >
              {blankSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="w-full h-20 sm:h-24 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:border-[#365856]/20 hover:shadow-[0_8px_20px_rgba(54,88,86,0.05)] transition-all duration-300 flex items-center justify-center p-4 group cursor-pointer">
                    <div className="relative inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-300 text-center">
                      <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] text-zinc-400 uppercase">
                        {slide.label}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .linear-easing .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
};

export default OfficeClients;
