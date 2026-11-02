"use client";
import { CmsText, CmsSection } from "@/components/cms/Editable";
import { whatsappNumber } from "@/lib/contact-links";
import { whatsAppApi } from "@/axios/axios";
import Navbtn from "@/components/Header/Navbtn";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useCms } from "@/components/cms/ContentProvider";
import React from "react";
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


const HomeDream = () => {
  const { data , isLoading , isError } = useQuery<WhatsAppApiType>({
    queryKey: ["wp-number"],
    queryFn: fetchWhatsAppNumber,
  });

  const result = data?.result || [];
  if (process.env.NODE_ENV === "development") {
    console.log("wp", result);
  }

  const phoneNumber = whatsappNumber(result[0]?.WhatsAppNumber);

  const contact = useCms().contact;
  const defaultMessage = contact?.whatsappMessage ||
    "Hi BE INTERIOR, I want to consult about my space interior design.";

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

    const handleWhatsAppRedirect = () => {
    trackWhatsAppClick("home_dream");
    window.open(whatsappUrl, "_blank");
  };

  return (
    <CmsSection section="section-0fb53cd24278"><div className="flex flex-col w-full items-center justify-center  px-4 py-12 bg-ivory/50  max-w-full h-full mx-auto max-h-126">
      <h2 data-heading-tone="dark" className="text-2xl md:text-4xl lg:text-5xl font-montagu text-secondary tracking-wide font-black text-center leading-tight"><CmsText section="section-0fb53cd24278" entryKey="heading-8f5a32e8c396" fallback={"Your dream home is just aclick away"} original={<>
        Your dream home is just a
        <span className="block text-inherit mt-2 md:mt-3">click away</span>
      </>} /></h2>

      <button
        onClick={handleWhatsAppRedirect}
        className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-extrabold text-lg md:text-xl tracking-wider hover:bg-[#c35e00] hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl mt-8 cursor-pointer shadow-lg shadow-primary/20"
        disabled={isLoading}
      ><CmsText section="section-0fb53cd24278" entryKey="text-76c9f45ad527" fallback={"Message us now"} /></button>
    </div></CmsSection>
  );
};

export default HomeDream;
