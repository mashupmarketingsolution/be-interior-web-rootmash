import React from "react";
import Image from "next/image";
import founder from "@/logo/About/IMG_295022-WkEJi0hzQaFH7pqkVKMoLQ.jpg";
import { Quote } from "lucide-react";

const AboutFounders = () => {
  return (
    <section className="bg-ivory py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">
            Leadership
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montagu text-[#111111] leading-tight font-bold">
            The Architect of <br className="hidden md:block" />
            <span className="text-primary">Our Vision</span>
          </h2>
        </div>

        {/* Founder Card */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center bg-white p-8 md:p-12 lg:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#111111]/5">

          {/* Image Side */}
          <div className="w-full lg:w-5/12 shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group">

              <Image
                src={founder}
                alt="Hossain Al Mahmud - Managing Director"
                fill
                quality={100}
                className="object-cover "
              />
            </div>
          </div>

          {/* Text/Content Side */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <Quote className="w-12 h-12 text-primary/20 mb-6 rotate-180" />

            <p className="text-lg md:text-xl lg:text-2xl text-zinc-600 font-serif leading-relaxed mb-10 italic">
              &quot;We don&apos;t just design spaces; we craft experiences. Our goal is to blend aesthetics with functionality, creating environments that inspire and elevate everyday living. Every detail matters, because your space is a reflection of your unique story.&quot;
            </p>

            <div className="flex items-center gap-6">
              <div className="w-12 h-px bg-primary/50"></div>
              <div>
                <h3 className="text-2xl md:text-3xl font-montagu font-bold text-[#111111] mb-1">
                  Hossain Al Mahmud
                </h3>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">
                  Managing Director
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutFounders;
