"use client";
import React from "react";

const OfficeChoose = () => {
  const promises = [
    { topText: "Best", boldText: "PRICE" },
    { topText: "Handover", boldText: "45 DAYS" },
    { topText: "Warranty", boldText: "2 YEARS" },
    { topText: "Premium", boldText: "MATERIAL" },
    { topText: "Quality", boldText: "100%" },
    { topText: "After Sale", boldText: "SERVICE" },
  ];

  return (
    <div className="w-full  py-20 px-6 flex flex-col items-center justify-center font-poppins bg-white">
      <h2 data-heading-tone="dark" className="text-3xl md:text-4xl lg:text-5xl font-montagu text-zinc-800 tracking-wide text-center">
        Why{" "}
        <span className="font-black text-inherit uppercase">choose us</span>
      </h2>
      <div className="w-20 h-1 bg-primary mt-4 rounded-full mb-14" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-7xl mx-auto">
        {promises.map((item, index) => (
          <div
            key={index}
            className="w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(228,110,0,0.12)] border border-zinc-100/50 hover:scale-105 transition-all duration-300 ease-out p-4 text-center cursor-pointer group select-none mx-auto"
          >
            <span className="text-xs sm:text-sm text-zinc-500 font-normal transition-colors group-hover:text-zinc-800">
              {item.topText}
            </span>

            <span className="text-sm sm:text-base font-black text-secondary tracking-wide uppercase mt-1 transition-colors group-hover:text-primary">
              {item.boldText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficeChoose;
