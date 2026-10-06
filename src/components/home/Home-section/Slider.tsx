"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import SwiperButtons from "./SwiperButtons";
import slideOne from "@/logo/HomePage/Gemini_Generated_Image_home1.png";
import slideTwo from "@/logo/HomePage/Gemini_Generated_Image_home2.png";
import slideThree from "@/logo/HomePage/Gemini_Generated_Image_home3.png";
import Link from "next/link";

export default function SliderComponent() {
  return (
    <div className="w-full h-screen mx-auto relative overflow-hidden">
      <h1 className="sr-only">Home and Office Interior Design in Dhaka — BE Interior</h1>
      <Swiper
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="bg-zinc-100 h-full"
      >
        {/* ================= Slide 1 ================= */}
        <SwiperSlide className="flex items-center justify-center text-white h-full relative overflow-hidden">
          <Image
            src={slideOne}
            alt="Minimalistic Interior"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-12 md:pl-20 lg:pl-32 xl:pl-40 pt-16 md:pt-24">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-wide leading-tight font-montagu text-white">
                Redefine Your Space with Modern Minimalism
              </h2>
              <p className="text-xs sm:text-sm md:text-base font-normal max-w-md mt-4 text-zinc-200 font-poppins">
                Transform your home into a clutter-free sanctuary. Be Interior
                brings you sleek, functional designs with effortless execution.
              </p>
              <Link href={"/services/home-interior"} className="w-full sm:w-auto mt-6 px-6 py-3 md:px-10 bg-primary text-white font-medium text-base md:text-lg tracking-wider hover:-translate-y-1 transition-transform duration-400 rounded-lg md:rounded-md cursor-pointer">
                  Start Your Transformation
                </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* ================= Slide 2 ================= */}
        <SwiperSlide className="flex items-center justify-center text-white h-full relative overflow-hidden">
          <Image
            src={slideTwo}
            alt="Customized Interior"
            fill
            quality={75}
            sizes="100vw"
            className="object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-12 md:pl-20 lg:pl-32 xl:pl-40 pt-16 md:pt-24">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-none text-primary font-montagu">
                100% Yours.
              </h2>
              <h2 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-wide leading-tight font-montagu text-white mt-1">
                Crafting Your Dream Home
              </h2>
              <p className="text-xs sm:text-sm md:text-base font-normal max-w-md mt-4 text-zinc-200 font-poppins capitalize tracking-wide">
                From modern kitchens to cozy bedrooms—we design and execute
                every corner just for you.
              </p>
              <Link href="/services/home-interior" className="w-full sm:w-auto mt-6 px-6 py-3 md:px-10 bg-primary text-white font-medium text-base md:text-lg tracking-wider md:hover:-translate-y-1 transition-transform duration-300 rounded-lg md:rounded-md cursor-pointer">Explore Home Interior</Link>
            </div>
          </div>
        </SwiperSlide>

        {/* ================= Slide 3 ================= */}
        <SwiperSlide className="flex items-center justify-center text-white h-full relative overflow-hidden">
          <Image
            src={slideThree}
            alt="Office Interior"
            fill
            quality={75}
            sizes="100vw"
            className="object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-12 md:pl-20 lg:pl-32 xl:pl-40 pt-16 md:pt-24">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-wide leading-tight font-montagu text-white">
                Workspaces People Love.
              </h2>
              <p className="text-xs sm:text-sm md:text-base font-normal max-w-md mt-4 text-zinc-200 font-poppins">
                Smart, ergonomic, and stunning interiors that your employees
                will genuinely enjoy walking into.
              </p>
              <Link href={"/services/budget-calculator"} className="w-full sm:w-auto mt-6 px-6 py-3 md:px-10 bg-primary text-white font-medium text-base md:text-lg tracking-wider hover:-translate-y-1 transition-transform duration-400 rounded-lg md:rounded-md cursor-pointer">
                  Get a Free Quote
                </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
