"use client";
import React from "react";

const TeamSectionSkeleton = () => {

  const skeletonItems = Array(4).fill(null);

  return (
    <section className="w-full py-20 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 data-heading-tone="dark" className="text-3xl sm:text-4xl font-black text-[#1b332a] uppercase tracking-wide font-montagu">
            The minds behind the design
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto font-poppins">
            Meet the talented architects and designers who turn your vision into
            reality with precision, passion, and creativity.
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-[#fafafa] rounded-2xl border border-zinc-100 w-full"
            >

              <div className="w-32 h-32 mb-6 rounded-full bg-zinc-200 border-4 border-white shrink-0"></div>


              <div className="h-5 w-36 bg-zinc-200 rounded-md mb-2.5"></div>
              

              <div className="h-4 w-24 bg-zinc-200/80 rounded-md"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSectionSkeleton;