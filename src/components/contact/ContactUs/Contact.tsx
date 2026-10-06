"use client";
import { whatsappNumber } from "@/lib/contact-links";
import React from "react";
import { Mail, Phone, MessageCircle, Loader2, AlertCircle, ArrowUpRight } from "lucide-react";
import { contactItemApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";
import logo from "@/logo/HomePage/Gemini_Generated_Image_home1.png";
import Image from "next/image";
import { trackWhatsAppClick } from "@/components/Analytics/dataLayer";
import { trackEmailClick } from "@/components/Analytics/dataLayer";
import { trackPhoneClick,} from "@/components/Analytics/dataLayer";

interface ContactItemsType {
  ms: number;
  query: string;
  result: {
    WhatsAppNumber: string;
    footercontactemail: string;
    footercontactnumber1: string;
  }[];
  syncTags: string[];
}

const fetchContactItems = async () => {
  try {
    const res = await contactItemApi();
    if (res.status !== 200) {
      throw new Error(`Error while Fetching`);
    }
    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Contact Item fetch error`, (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

export default function ExperienceCenter() {
  const { data, isLoading, isError, error, refetch } = useQuery<ContactItemsType>({
    queryKey: ["contact-item"],
    queryFn: fetchContactItems,
  });

  if (isLoading) {
    return (
      <section className="bg-ivory text-[#111111] py-20 px-6 lg:px-20 min-h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-sm text-zinc-500 font-medium tracking-widest uppercase">Loading experience center...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-[#FAF5E9] text-[#111111] py-20 px-6 lg:px-20 min-h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center p-8 bg-white border border-black/5 rounded-3xl shadow-xl">
          <AlertCircle className="w-14 h-14 text-red-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Failed to load information</h3>
          <p className="text-sm text-zinc-500 mb-6">{error instanceof Error ? (error instanceof Error ? error.message : "Unknown error") : "Something went wrong"}</p>
          <button
            onClick={() => refetch()}
            className="px-8 py-3 bg-[#111111] hover:bg-primary text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/30"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const contact = data?.result?.[0];

  return (
    <section className="bg-[#FAF5E9] text-[#111111] py-24 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Content Area */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Visit Us</p>
            <h2 className="text-4xl md:text-5xl font-montagu font-bold mb-6 leading-tight">
              Welcome To Our <br/>
              <span className="text-primary">Experience Center</span>
            </h2>
            <p className="text-zinc-600 mb-10 text-lg font-medium max-w-md leading-relaxed">
              Step into a world of architectural brilliance and premium interiors. Let&apos;s discuss your dream space over a cup of coffee.
            </p>

            <div className="space-y-4">
              {contact ? (
                <>
                  <ContactInfo
                    href={`mailto:${contact.footercontactemail}`}
                    icon={<Mail size={22} />}
                    label="Email Us"
                    value={contact.footercontactemail}
                    onClick={() => trackEmailClick("contact")}
                  />
                  <ContactInfo
                    href={`tel:${contact.footercontactnumber1}`}
                    onClick={() => trackPhoneClick("contact")}
                    icon={<Phone size={22} />}
                    label="Call Us"
                    value={contact.footercontactnumber1}
                  />
                <ContactInfo
                  href={`https://wa.me/${whatsappNumber(contact.WhatsAppNumber)}`}
                  icon={<MessageCircle size={22} />}
                  label="WhatsApp"
                  value={contact.WhatsAppNumber}
                  onClick={() => trackWhatsAppClick("contact")}
                />
                </>
              ) : (
                <p className="text-zinc-500 italic">No contact details found.</p>
              )}
            </div>
          </div>

          {/* Right Image Area (Architectural Layout) */}
          <div className="relative order-1 lg:order-2">
            {/* Decorative Background Elements */}
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-[2rem] translate-x-4 translate-y-4 hidden md:block"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

            {/* Main Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">
              <Image
                src={logo}
                alt="Experience Center"
                fill
                quality={100}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-[#111111]/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ---------------- Contact Info Sub-Component ----------------

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  onClick?: () => void;
}

function ContactInfo({ icon, label, value, href, onClick }: ContactInfoProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group flex items-center justify-between p-4 bg-white border border-black/5 rounded-2xl transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl"
    >
      <div className="flex items-center gap-5">
        {/* Icon Container */}
        <div className="w-12 h-12 rounded-full bg-[#FAF5E9] text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors duration-500 shrink-0">
          {icon}
        </div>

        {/* Text Details */}
        <div>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1 group-hover:text-zinc-400">{label}</p>
          <p className="text-lg font-bold text-[#111111]  transition-colors duration-500">{value || "N/A"}</p>
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-white">
        <ArrowUpRight size={24} />
      </div>
    </a>
  );
}
