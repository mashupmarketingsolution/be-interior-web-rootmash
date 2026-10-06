"use client";
import React from "react";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Competition() {
  const factors = [
    {
      title: "Price",
      points: ["Competitive & transparent pricing", "No hidden cost"],
    },
    {
      title: "Convenience",
      points: ["One stop service", "No complicating process"],
    },
    {
      title: "Design",
      points: ["Innovative & tailored design"],
    },
    {
      title: "Project Timeline",
      points: ["Planned project timeline with clear milestone tracking"],

    },
    {
      title: "Communication",
      points: [
        "Dedicated architect for client support",
        "Weekly project update report",
      ],
    },
    {
      title: "Quality",
      points: [
        "Branded materials & top-notch finishing",
        "146 Steps quality check",
      ],
    },
    {
      title: "Warranty",
      points: ["2 Year warranty"],
    },
    {
      title: "Space Optimization",
      points: [
        "Maximize space utilization",
        "Functionally, aesthetically pleasing environment",
      ],
    },
  ];

  return (
    <section className="bg-ivory py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">

        {/* Left Side Column - Impactful Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left order-1 lg:order-1">
          <div className="mb-8">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-montagu text-[#111111] font-bold leading-[1.15]">
              How We Stand Out <br />
              <span className="text-primary">From The Rest</span>
            </h2>
          </div>

          <p className="text-zinc-600 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed mb-10">
           We deliver carefully planned interior solutions with defined quality standards, coordinated execution, and clear communication at every stage.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-8 py-4 bg-[#111111] hover:bg-primary text-white font-bold rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(200,122,49,0.3)] transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base"
            >
              Talk To Our Designers
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side Column - Minimalistic Premium Table */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden">

            {/* Table Header */}
            <div className="grid grid-cols-12 items-stretch border-b border-black/5">
              <div className="col-span-6 p-6 flex items-center">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  Key Factors
                </span>
              </div>
              <div className="col-span-3 bg-[#111111] p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest leading-tight">
                  Be Interior
                </span>
              </div>
              <div className="col-span-3 bg-zinc-50 p-6 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-tight">
                  Others
                </span>
              </div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col">
              {factors.map((factor, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 items-stretch border-b border-black/5 last:border-0 hover:bg-zinc-50/50 transition-colors duration-300 group"
                >
                  {/* Title & Points */}
                  <div className="col-span-6 p-5 sm:p-6 flex flex-col justify-center">
                    <h4 className="font-bold text-[#111111] text-sm md:text-base mb-2 group-hover:text-primary transition-colors">
                      {factor.title}
                    </h4>
                    <ul className="space-y-1.5">
                      {factor.points.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className="text-xs text-zinc-500 flex items-start gap-2 leading-relaxed"
                        >
                          <span className="w-1 h-1 bg-primary/40 rounded-full shrink-0 mt-1.5"></span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Be Interior Column (Highlight) */}
                  <div className="col-span-3 bg-primary/5 flex items-center justify-center p-4">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-4 h-4 text-primary stroke-[3]" />
                    </div>
                  </div>

                  {/* Typical / Others Column (Muted) */}
                  <div className="col-span-3 flex items-center justify-center p-4 border-l border-black/5">
                    <X className="w-5 h-5 text-zinc-300 stroke-[2] group-hover:text-zinc-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
