"use client";
import { whatsappNumber } from "@/lib/contact-links";
import { whatsAppApi } from "@/axios/axios";
import Navbtn from "@/components/Header/Navbtn";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
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

  const defaultMessage =
    "Hi BE INTERIOR, I want to consult about my space interior design.";

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

    const handleWhatsAppRedirect = () => {
    trackWhatsAppClick("home_dream");
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col w-full items-center justify-center  px-4 py-12 bg-ivory/50  max-w-full h-full mx-auto max-h-126">
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-montagu text-secondary tracking-wide font-black text-center leading-tight">
        Your Dream Home Is Just a
        <span className="block text-primary mt-2 md:mt-3">Click Away</span>
      </h2>

      <button
        onClick={handleWhatsAppRedirect}
        className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-extrabold text-lg md:text-xl tracking-wider hover:bg-[#c35e00] hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl mt-8 cursor-pointer shadow-lg shadow-primary/20"
        disabled={isLoading}
      >
        Message Us Now
      </button>
    </div>
  );
};

export default HomeDream;
