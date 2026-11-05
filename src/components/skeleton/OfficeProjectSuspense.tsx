"use client";
import { LocalizedText } from "@/components/Language";
import React from "react";

const OfficeProjectSuspense = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center mt-16 px-4 p-10 bg-ivory animate-pulse">
      <h2 data-heading-tone="dark" className="text-2xl md:text-3xl lg:text-5xl font-montagu text-secondary tracking-wide font-bold">
        BE Interior{" "}
        <span className="font-medium text-inherit">
          <LocalizedText>{"office interior"}</LocalizedText><span className="text-secondary"><LocalizedText>{"projects"}</LocalizedText></span>
        </span>
      </h2>

      <div className="w-full max-w-7xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-[20px] lg:gap-[30px] mt-10 h-100 w-full">
          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
          </div>

          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden hidden md:flex">
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
          </div>

          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden hidden lg:flex">
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeProjectSuspense;
