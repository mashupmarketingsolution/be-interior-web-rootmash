"use client";
import { whatsappNumber } from "@/lib/contact-links";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { trackWhatsAppClick } from "@/components/Analytics/dataLayer";
import slideOne from "@/logo/HomePage/Gemini_Generated_Image_Office1.png";
import slideTwo from "@/logo/HomePage/Gemini_Generated_Image_Office2.png";
import { FaWhatsapp } from "react-icons/fa";
import { whatsAppApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";
interface WhatsAppApiType {
  ms: number;
  query: string;
  result: {
    _id: string;
    WhatsAppNumber: string;
  }[];
  syncTags: string[];
}

const fetchWhatsAppNumber = async () => {
  try {
    const res = await whatsAppApi();
    if (res.status !== 200) throw new Error("Error fetching");
    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("WhatsApp Fetch Error:", (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

const OfficeInteriorSlider = () => {
  const { data, isLoading } = useQuery<WhatsAppApiType>({
    queryKey: ["wp-number"],
    queryFn: fetchWhatsAppNumber,
  });

  const phoneNumber = whatsappNumber(data?.result?.[0]?.WhatsAppNumber);

  const defaultMessage =
    "Hi BE INTERIOR, I want to consult about my space interior design.";

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

  const handleWhatsAppRedirect = () => {
    trackWhatsAppClick("office_interior");

    window.open(whatsappUrl, "_blank");
  };
  return (
    <div className="w-full h-screen mx-auto relative overflow-hidden">
      <Swiper
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
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
            quality={100}
            sizes="100vw"
            className="object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-12 md:pl-20 lg:pl-32 xl:pl-40 pt-16 md:pt-24">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-wide leading-tight font-montagu text-white">
                Stress-free
              </h2>

              <p className="text-xs sm:text-sm md:text-base font-normal max-w-md mt-4 text-zinc-200 font-poppins capitalize">
                Relocation To Your New Professional Space
              </p>
              <button
                onClick={handleWhatsAppRedirect}
                className="w-fit sm:w-auto mt-6 px-6 py-3 md:px-10 bg-primary text-white font-medium text-base md:text-lg tracking-wider hover:bg-zinc-900 transition-colors rounded-lg md:rounded-md cursor-pointer flex items-center gap-2"
              >
                Talk to Our Designer
                <FaWhatsapp size={30} />
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* ================= Slide 2 ================= */}
        <SwiperSlide className="flex items-center justify-center text-white h-full relative overflow-hidden">
          <Image
            src={slideTwo}
            alt="Customized Interior"
            fill
            quality={100}
            sizes="100vw"
            className="object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-12 md:pl-20 lg:pl-32 xl:pl-40 pt-16 md:pt-24">
            <div className="max-w-2xl flex flex-col items-center md:items-start">
              <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-none text-primary font-montagu">
                Get Premium
              </h2>
              <h2 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-wide leading-tight font-montagu text-white mt-1">
                Office Interior
              </h2>
              <p className="text-xs sm:text-sm md:text-base font-normal max-w-md mt-4 text-zinc-200 font-poppins capitalize tracking-wide">
                That Your Employee will love
              </p>
              <button className="w-full sm:w-auto mt-6 px-6 py-3 md:px-10 bg-primary text-white font-medium text-base md:text-lg tracking-wider hover:bg-zinc-900 transition-colors rounded-lg md:rounded-md cursor-pointer">
                Consult now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default OfficeInteriorSlider;
