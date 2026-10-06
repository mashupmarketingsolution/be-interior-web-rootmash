"use client";
import Image from "next/image";
import React from "react";
import { FaRegStar, FaCrown } from "react-icons/fa";
import { LuGem } from "react-icons/lu";

import officeEssential from "@/logo/HomePage/Gemini_Generated_Image_office3.png";
import officePremium from "@/logo/HomePage/Gemini_Generated_Image_office4.png";
import officeLuxury from "@/logo/HomePage/Gemini_Generated_Image_office5.png";
import Link from "next/link";

const OfficePackage = () => {
  const packages = [
    {
      name: "Essential",
      price: "1300 - 1400",
      img: officeEssential,
      icon: <FaRegStar className="text-[#c35e00] text-2xl" />,
      features: [
        "Affordable Pricing",
        "Functional 2D Layout",
        "Convenient 3D Design",
        "Standard Accessories",
        "Durable Materials",
        "Execution",
      ],
    },
    {
      name: "Premium",
      price: "1750 - 1850",
      img: officePremium,
      icon: <LuGem className="text-[#c35e00] text-2xl" />,
      features: [
        "Value Driven Pricing",
        "Functional 2D Layout",
        "High-end 3D Design",
        "Wide Range Accessories",
        "High Grade Materials",
        "Laminate Finish",
        "Execution",
      ],
      isFeatured: true,
    },
    {
      name: "Luxury",
      price: "2400 - 2600",
      img: officeLuxury,
      icon: <FaCrown className="text-[#c35e00] text-2xl" />,
      features: [
        "Exclusive Pricing",
        "Functional 2D Layout",
        "Luxury 3D Design",
        "Branded Accessories",
        "Premium Materials",
        "Laminate, Acrylic & Mirror Sheet Finish",
        "Designer Decorative Items",
        "Execution",
      ],
    },
  ];

  return (
    <section className="w-full bg-ivory py-14 md:py-24 px-6 md:px-12 lg:px-20 font-sans">
      {/* Header */}
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-montagu font-bold text-[#111111]">
          Our <span className="text-primary">Packages</span>
        </h2>
        <div className="w-20 h-1 bg-primary mt-4 rounded-full mb-14 mx-auto" />

        <p className="text-zinc-600 mt-4 text-sm md:text-base leading-relaxed font-medium">
          Tailored interior solutions designed to perfectly match your standard,
          aesthetics, and functional requirements.
        </p>
      </div>

      {/* Horizontal Zig-Zag Layout */}
      <div className="flex flex-col gap-12 lg:gap-20 max-w-6xl mx-auto">
        {packages.map((pkg, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 bg-white p-6 md:p-8 lg:p-10 rounded-[2.5rem] shadow-sm border border-[#111111]/5 transition-all duration-300 hover:shadow-xl ${
                pkg.isFeatured ? "ring-2 ring-[#c35e00]/20 relative" : ""
              }`}
            >
              {/* Featured Badge */}
              {pkg.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#c35e00] text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-md z-10">
                  Most Popular
                </div>
              )}

              {/* Image Section */}
              <div
                className={`w-full lg:w-1/2 aspect-[16/10] lg:aspect-[5/4] relative rounded-3xl overflow-hidden bg-zinc-100 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                <Image
                  src={pkg.img}
                  alt={`${pkg.name} interior design`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority={pkg.isFeatured}
                />
              </div>

              {/* Content Section */}
              <div
                className={`w-full lg:w-1/2 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
              >
                {/* Header Info */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#FAF5E9] flex items-center justify-center shrink-0">
                    {pkg.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-montagu font-bold text-[#111111] mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-lg font-semibold text-zinc-500">
                      BDT {pkg.price}{" "}
                      <span className="text-sm font-normal">/ sqft</span>
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-[#111111]/10 mb-8" />

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#c35e00] font-bold mt-0.5">✓</span>
                      <span className="text-zinc-700 text-sm md:text-base font-medium leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/services/budget-calculator?type=office">
                  {" "}
                  <button className="w-fit mx-auto px-8 py-3.5 bg-[#111111] text-white rounded-xl font-bold tracking-widest text-xs uppercase hover:bg-[#c35e00] transition-colors duration-300">
                    Select {pkg.name}
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OfficePackage;
