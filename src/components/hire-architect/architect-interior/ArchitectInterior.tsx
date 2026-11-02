"use client";
import { CmsText, CmsImage, CmsSection } from "@/components/cms/Editable";
import { whatsappNumber } from "@/lib/contact-links";
import { whatsAppApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";
import { useCms } from "@/components/cms/ContentProvider";
import React from "react";
import { Loader2 } from "lucide-react";
import imgtwo from "@/logo/HomePage/Gemini_Generated_Image_Office2.png";
import Image from "next/image";
import { trackWhatsAppClick } from "@/components/Analytics/dataLayer";

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

const ArchitectInterior = () => {
  const { data, isLoading, isError } = useQuery<WhatsAppApiType>({
    queryKey: ["wp-number"],
    queryFn: fetchWhatsAppNumber,
  });

  const phoneNumber = whatsappNumber(data?.result?.[0]?.WhatsAppNumber);

  if (process.env.NODE_ENV === "development") {
    console.log(phoneNumber);
  }

  const contact = useCms().contact;
  const defaultMessage = contact?.whatsappMessage ||
    "Hi BE INTERIOR, I want to consult about my space interior design.";

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

  const handleWhatsAppRedirect = () => {
    if (isLoading || isError) return;

    trackWhatsAppClick("hire_architect");

    window.open(whatsappUrl, "_blank");
  };

  return (
    <CmsSection section="section-e7c2c0e3c691"><section className="w-full flex flex-col lg:flex-row justify-center items-center my-10 px-4 sm:px-8 md:px-16 gap-8 lg:gap-16 max-w-7xl mx-auto">
      {/* Text & Call-to-Action Card */}
      <div className="w-full sm:w-[85%] md:w-[75%] lg:w-[45%] min-h-[280px] flex flex-col items-center justify-center p-6 md:p-8 rounded-xl shadow-2xl border border-gray-100 bg-white">
        <h2 data-heading-tone="dark" className="text-2xl sm:text-3xl lg:text-4xl font-poppins text-center text-gray-800 leading-snug font-normal"><CmsText section="section-e7c2c0e3c691" entryKey="heading-85a34da92bb0" fallback={"Your dream home is just a click away"} original={<>
          Your dream home is just a{" "}
          <span className="font-bold block sm:inline">click away</span>
        </>} /></h2>

        <button
          type="button"
          onClick={handleWhatsAppRedirect}
          disabled={isLoading}
          className="font-poppins flex items-center justify-center gap-2 mt-6 border w-fit mx-auto py-3 px-6 sm:py-4 sm:px-8 rounded-full bg-primary text-white font-medium hover:bg-opacity-90 transition-all duration-300 shadow-md text-sm sm:text-base cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isError ? (
            <span><CmsText section="section-e7c2c0e3c691" entryKey="text-525a4cbade92" fallback={"contact on WhatsApp"} /></span>
          ) : isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /><CmsText section="section-e7c2c0e3c691" entryKey="text-56f71a4a128b" fallback={"connecting..."} /></span>
          ) : (
            <span><CmsText section="section-e7c2c0e3c691" entryKey="text-c3c055b66798" fallback={"chat on WhatsApp"} /></span>
          )}
        </button>
      </div>

      {/* Illustration Placeholder Card */}
      <div className="w-full h-80 flex items-center justify-center">
        <div className="w-full h-full relative bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          <CmsImage section="section-e7c2c0e3c691"
            src={imgtwo}
            alt="img"
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section></CmsSection>
  );
};

export default ArchitectInterior;
