"use client";
import React from "react";
import { MapPin, Loader2, AlertCircle, Navigation } from "lucide-react";
import { contactLocationApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";

interface ContactLocationType {
  ms: number;
  query: string;
  result: {
    footerlocation: string;
  }[];
  syncTags: string[];
}

const fetchContactItems = async () => {
  try {
    const res = await contactLocationApi();
    if (res.status !== 200) {
      throw new Error(`Error while Fetching`);
    }
    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Contact Location fetch error`, (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

const LocationSection = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<ContactLocationType>({
    queryKey: ["contact-location"],
    queryFn: fetchContactItems,
  });

  // -------------- Loading State --------------
  if (isLoading) {
    return (
      <section className="bg-ivory py-16 px-6 lg:px-20 min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-sm text-[#111111]/60 font-bold tracking-widest uppercase">Loading Map...</p>
        </div>
      </section>
    );
  }

  // -------------- Error State --------------
  if (isError) {
    return (
      <section className="bg-[#FAF5E9] py-16 px-6 lg:px-20 min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center p-8 bg-white border border-black/5 rounded-3xl shadow-xl">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-[#111111]">Location Unavailable</h3>
          <p className="text-sm text-zinc-500 mb-6">
            {error instanceof Error ? (error instanceof Error ? error.message : "Unknown error") : "Something went wrong"}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 bg-[#111111] hover:bg-primary text-white font-semibold rounded-full shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const contact = data?.result?.[0];
  const address = contact?.footerlocation || "Address not specified";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  // -------------- Main Content --------------
  return (
    <section className="bg-[#FAF5E9] py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] min-h-[450px]">

          {/* Left Side: Address Details (Dark Theme) */}
          <div className="w-full md:w-1/3 bg-[#111111] p-10 lg:p-14 flex flex-col justify-center relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-8">
              <div>
                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Our Office</p>
                <h3 className="text-3xl font-montagu font-bold text-white">Visit Us</h3>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white leading-relaxed max-w-[200px]">
                    {address}
                  </p>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 w-fit mt-4 px-6 py-3 bg-white hover:bg-primary text-[#111111] hover:text-white rounded-full font-bold text-sm transition-all duration-300 shadow-md"
              >
                <Navigation className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Side: Map Embed */}
          <div className="w-full md:w-2/3 h-80 md:h-auto relative group overflow-hidden">
            <iframe
              src={mapUrl}
              className="absolute inset-0 w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BE Interior office location"
            />

            <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationSection;
