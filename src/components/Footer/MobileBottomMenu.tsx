"use client";
import React from "react";
import Link from "next/link";
import { CalendarDays, Calculator, PhoneCall } from "lucide-react";
import { trackPhoneClick } from "@/components/Analytics/dataLayer";
import { useQuery } from "@tanstack/react-query";
import { footerContactApi } from "@/axios/axios";

interface FooterContactType {
  result: {
    footercontactnumber1: string;
  }[];
}

const fetchFooterContact = async () => {
  const res = await footerContactApi();

  if (res.status !== 200) {
    throw new Error("Failed to fetch footer contact");
  }

  return res.data;
};

const MobileBottomMenu = () => {
  const { data } = useQuery<FooterContactType>({
    queryKey: ["footer-contact-mobile"],
    queryFn: fetchFooterContact,
  });

  const phoneNumber =
    data?.result?.[0]?.footercontactnumber1 || "01618995918";

  return (
    <div className="fixed bottom-0 left-0 md:hidden z-[100] w-full bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] rounded-t-3xl font-poppins pb-safe">
      <div className="flex items-center justify-around h-12 sm:h-20 px-2 relative">


        <Link
          href="/hire-architect"
          className="flex flex-col items-center justify-center gap-1 w-20 text-gray-400 hover:text-primary transition-colors active:scale-95 mt-3"
        >
          <CalendarDays size={22} strokeWidth={2} />
          <span className="text-[11px] font-medium tracking-wide">Booking</span>
        </Link>


        <div className="relative -top-3">
          <Link
            href="/services/budget-calculator"
            className="flex flex-col items-center justify-center gap-1.5 group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.2)] border-[5px] border-[#FAF5E9] group-hover:bg-[#C87A31] group-hover:border-[#FAF5E9] transition-colors">
              <Calculator size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-primary">Calculator</span>
          </Link>
        </div>


        <a
          href={`tel:${phoneNumber}`}
          onClick={() => trackPhoneClick("mobile_bottom_menu")}
          className="flex flex-col items-center justify-center gap-1 w-20 text-gray-400 hover:text-primary transition-colors active:scale-95 mt-3"
        >
          <PhoneCall size={22} strokeWidth={2} />
          <span className="text-[10px] font-medium tracking-wide">Call</span>
        </a>

      </div>
    </div>
  );
};

export default MobileBottomMenu;
