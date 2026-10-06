"use client";
import { whatsappNumber } from "@/lib/contact-links";
import { whatsAppApi } from "@/axios/axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { trackWhatsAppClick } from "@/components/Analytics/dataLayer";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

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

const JustClick = () => {
  const { data } = useSuspenseQuery<WhatsAppApiType>({
    queryKey: ["wp-number"],
    queryFn: fetchWhatsAppNumber,
    staleTime: 1000 * 60 * 10
  });

  const result = data?.result || [];

  if (process.env.NODE_ENV === "development") {
    console.log("wp", result);
  }

  const wpNumber = result[0]?.WhatsAppNumber || "";
  const phoneNumber = whatsappNumber(wpNumber);

  const defaultMessage = "Hi BE INTERIOR, I want to consult about my space interior design.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

const handleWhatsAppRedirect = () => {
  trackWhatsAppClick("home_justclick");

  window.open(whatsappUrl, "_blank");
};

  return (
    <section className="bg-ivory py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto relative bg-white border border-[#111111]/5 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center px-6 py-20 md:py-24">

        {/* Content Box */}
        <div className="relative z-10 flex flex-col items-center justify-center">

          {/* Top Badge */}
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">
              Let&apos;s Connect
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-montagu text-[#111111] tracking-wide font-bold leading-[1.2] mb-2">
            Your Dream Interior
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-montagu text-primary tracking-wide font-bold mb-10">
            Is Just One Click Away
          </h3>

          <p className="text-zinc-500 text-sm md:text-base max-w-lg mx-auto mb-12 leading-relaxed">
           Ready to discuss your space? Message us on WhatsApp and our team will get back to you with the next steps.
          </p>

          {/* Action Button */}
          <button
            onClick={handleWhatsAppRedirect}
            className="group relative flex items-center gap-3 px-8 py-4 bg-[#111111] hover:bg-primary text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(17,17,17,0.2)] hover:shadow-[0_15px_40px_rgba(200,122,49,0.4)] cursor-pointer"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700 ease-in-out"></div>

            <MessageCircle size={22} className="relative z-10" />
            <span className="relative z-10 tracking-widest uppercase text-sm md:text-base">
              Get Started
            </span>
            <ArrowRight size={20} className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default JustClick;
