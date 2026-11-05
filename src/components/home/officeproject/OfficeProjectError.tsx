import { LocalizedText } from "@/components/Language";
import React from "react";

const OfficeProjectErr = () => {
  return (
    <div className=" flex flex-col w-full items-center justify-center mt-16 px-4 p-10 bg-ivory">
      {/* হেডিং প্লেসহোল্ডার */}
      <h2 data-heading-tone="dark" className="text-2xl md:text-3xl lg:text-5xl font-montagu text-secondary tracking-wide font-bold text-center">
        BE Interior{" "}
        <span className="font-medium text-inherit">
          <LocalizedText>{"office interior"}</LocalizedText><span className="text-secondary"><LocalizedText>{"projects"}</LocalizedText></span>
        </span>
      </h2>

      {/* মেইন কন্টেইনার */}
      <div className="w-full max-w-7xl mt-8">
        {/* সিম্পল এরর টেক্সট বক্স */}
        <div className="flex flex-col items-center justify-center py-16 bg-white/60 border border-zinc-200/50 rounded-2xl p-6 text-center backdrop-blur-sm">
          <p className="text-sm md:text-base font-medium text-rose-600 font-poppins">
            <LocalizedText>{"Failed to load projects. Please try again later."}</LocalizedText></p>
        </div>
      </div>
    </div>
  );
};

export default OfficeProjectErr;
