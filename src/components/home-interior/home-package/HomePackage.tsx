"use client";
import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaRegStar, FaCrown } from "react-icons/fa";
import { LuGem } from "react-icons/lu";

const HomeOurPackage = () => {
  const packages = [
    {
      name: "Essential",
      icon: <FaRegStar className="text-white text-3xl opacity-80" />,
      headerBg: "bg-primary",
      features: [
        "Budget-Friendly Material Selection",
        "Functional 2D Layout",
        "Convenient 3D Design",
        "Standard Accessories",
        "Durable Materials",
        "Execution",
      ],
      isPopular: false,
    },
    {
      name: "Premium",
      icon: <LuGem className="text-white text-4xl animate-pulse" />,
      headerBg: "bg-secondary",
      features: [
        "Balanced Material & Finish Selection",
        "Functional 2D Layout",
        "High-end 3D Design",
        "Wide Range Accessories",
        "High Grade Materials",
        "Laminate Finish",
        "Execution",
      ],
      isPopular: true,
    },
    {
      name: "Luxury",
      icon: <FaCrown className="text-white text-3xl opacity-80" />,
      headerBg: "bg-primary",
      features: [
        "Premium Material & Finish Selection",
        "Functional 2D Layout",
        "Luxury 3D Design",
        "Branded Accessories",
        "Premium Materials",
        "Laminate, Acrylic & Mirror Sheet Finish",
        "Designer Decorative Items",
        "Execution",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="w-full  py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-poppins">

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-wide text-zinc-800 uppercase font-montagu">
          Curated <span className="text-primary bg-gradient-to-r from-zinc-800 to-zinc-900 bg-clip-text">Design Solutions</span>
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-center justify-center w-full max-w-6xl px-2 lg:px-0">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`w-full bg-white rounded-3xl border-zinc-100/80 overflow-hidden transition-all duration-500 ease-out flex flex-col cursor-pointer
              ${
                pkg.isPopular
                  ? "shadow-2xl md:-translate-y-4 z-10 md:scale-105 border-primary/20 md:min-h-145"
                  : "shadow-xl hover:shadow-2xl hover:-translate-y-4 md:translate-y-0 z-0 md:min-h-[530px]"
              }
            `}
          >
            <div className={`relative ${pkg.headerBg} pt-10 pb-16 px-8 text-white flex justify-between items-center overflow-hidden`}>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-wide font-montagu">
                  {pkg.name}
                </h3>
              </div>
              <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                {pkg.icon}
              </div>

            </div>

            <div className="p-8 flex-1 flex flex-col justify-between bg-white pt-10">
              <ul className="flex flex-col gap-4">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-zinc-600 text-sm sm:text-base group">
                    <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                    <span className="font-medium tracking-wide leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-xs sm:text-sm text-zinc-500 leading-relaxed">
              <p>
                <span className="font-semibold text-zinc-700">Pricing:</span>{" "}
                Based on your selected rooms, package and project scope.
              </p>

              <p className="mt-2">
                <span className="font-semibold text-zinc-700">Final Scope:</span>{" "}
                Materials, brands, quantities, inclusions and exclusions are confirmed
                in the detailed quotation after site measurement.
              </p>
            </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full flex justify-center">
        <Link href="/services/budget-calculator?type=home"><button className="px-10 py-4 bg-primary  text-white font-extrabold text-lg sm:text-xl tracking-wide rounded-lg shadow-lg  hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer uppercase">
          Calculate Your Budget
        </button></Link>
      </div>

    </div>
  );
};

export default HomeOurPackage;
