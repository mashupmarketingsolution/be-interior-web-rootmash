"use client";
import React from "react";

interface TeamSectionErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const TeamSectionErrorFallback = ({ error, resetErrorBoundary }: TeamSectionErrorFallbackProps) => {
  // ডেভেলপমেন্ট মোডে কনসোলে এরর লগ করার জন্য
  if (process.env.NODE_ENV === "development") {
    console.error("TeamSectionBoundaryError:", error);
  }

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* হেডার পার্ট - মেইন লেআউটের মতোই ফিক্সড রাখা হয়েছে */}
        <div className="text-center mb-12">
          <h2 data-heading-tone="dark" className="text-3xl sm:text-4xl font-black text-[#1b332a] uppercase tracking-wide font-montagu">
            The minds behind the design
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto font-poppins">
            Meet the talented architects and designers who turn your vision into
            reality with precision, passion, and creativity.
          </p>
        </div>

        {/* এরর বক্স কন্টেইনার (টিম গ্রিডের জায়গাটুকু জুড়ে বসবে) */}
        <div className="w-full flex flex-col items-center justify-center p-8 md:p-12 bg-rose-50/50 rounded-2xl border border-rose-100 max-w-2xl mx-auto text-center shadow-sm">
          {/* সতর্কবার্তা আইকন */}
          <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>

          <h3 data-heading-tone="dark" className="text-xl font-bold text-[#1b332a] font-montagu mb-2">
            Failed to load team profiles
          </h3>
          
          <p className="text-sm text-zinc-600 font-poppins max-w-md mb-6 leading-relaxed">
            Something went wrong while fetching the team members data. Please check your internet connection or try again.
          </p>

          {/* রিট্রাই বাটন (আপনার থিমের সাথে মিলিয়ে ডিজাইন করা) */}
          <button
            onClick={resetErrorBoundary}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#1b332a] text-white text-sm font-semibold rounded-full hover:bg-[#254438] active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Try again
          </button>
        </div>

      </div>
    </section>
  );
};

export default TeamSectionErrorFallback;