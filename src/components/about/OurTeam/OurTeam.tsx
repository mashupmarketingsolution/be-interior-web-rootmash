"use client";
import React from "react";
import Image from "next/image";
import { interiorTeamApi } from "@/axios/axios";
import { useSuspenseQuery } from "@tanstack/react-query";

interface InteriorteamType {
  ms: number;
  query: string;
  result: {
    _id: string;
    name: string;
    designation: string;
    memberImage: string;
  }[];
  syncTags: string[];
}

const fetchInteriorTeam = async () => {
  try {
    const res = await interiorTeamApi();
    if (res.status !== 200) {
      throw new Error(`Error while Fetching`);
    }

    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Interior team fetch error`, (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

const OurTeam = () => {
  const { data } = useSuspenseQuery<InteriorteamType>({
    queryKey: ["interior-team"],
    queryFn: fetchInteriorTeam,
  });

  if (process.env.NODE_ENV === "development") {
    console.log("interior-team", data);
  }

  const teamMembers = data?.result || [];

  return (
    <section className="w-full py-24 bg-[#FAF5E9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Our Experts
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] font-montagu tracking-wide">
            The Minds Behind the Design
          </h2>
          <p className="mt-4 text-zinc-600 max-w-2xl mx-auto text-base">
            Meet the talented architects and designers who turn your vision into
            reality with precision, passion, and creativity.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-[#111111]/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Photo Section (Editorial Aspect Ratio) */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-100">
                {/* Subtle Primary Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-multiply"></div>

                <Image
                  src={member.memberImage}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Info Section */}
              <div className="p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
                <h3 className="text-xl font-bold font-montagu text-[#111111] mb-1 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurTeam;
