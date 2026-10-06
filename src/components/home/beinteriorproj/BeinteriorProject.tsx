"use client";
import { homeProjectApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query"; // 🎯 useSuspenseQuery পরিবর্তন করে useQuery আনা হলো
import { error } from "console";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface HomeProject {
  ms: number;
  query: string;
  result: {
    _id: string;
    name: string;
    _type: string;
    slug: string;
    coverImage: string;
    galleryImage: string[];
    size: string;
    location: string;
  }[];
  syncTags: string[];
}

const homeInteriorProjects = async () => {
  try {
    const res = await homeProjectApi();

    if (res.status !== 200) {
      throw new Error("Error while Getting Data");
    }

    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("Home Interior Projects Fetch Error", (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

const BeinteriorProject = () => {
  const { data, isLoading, isError } = useQuery<HomeProject>({
    queryKey: ["home-interior"],
    queryFn: homeInteriorProjects,
    staleTime: 1000 * 60 * 10,
  });

  const result = data?.result || [];

  if (process.env.NODE_ENV === "development") {
    console.log("home-interior-projects", result);
  }

  return (
    <div className="flex flex-col w-full items-center justify-center mt-16 px-4 p-10 pb-22 lg:pb-26">
      <h2 className="text-3xl md:text-5xl font-montagu text-[#111111] tracking-wide font-bold text-center lg:mb-16">
  Exclusive{" "}
  <span className="font-medium text-primary">Residential Projects</span>
</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 w-full max-w-7xl">
        <div className="w-full max-w-8xl mt-10 h-100 rounded-lg">
          {isLoading ? (
            <div className="w-full max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.75 md:gap-5 lg:gap-7.5  h-100 w-full">
                <div className="relative flex flex-col items-center justify-center h-full min-h-87.5 bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
                </div>

                <div className="relative flex flex-col items-center justify-center h-full min-h-87.5 bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden md:flex">
                  <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
                </div>

                <div className="relative flex-col items-center justify-center h-full min-h-87.5 bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden hidden lg:flex">
                  <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center text-rose-500 h-100 w-full bg-white rounded-xl p-6 border border-rose-100 shadow-md">
              <h3 className="font-bold text-lg text-center">
                Failed to load projects. Please try again!
              </h3>
            </div>
          ) : result && result.length > 0 ? (
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              key={result.length > 3 ? "loop" : "rewind"}
              loop={result.length > 3}
              rewind={result.length <= 3}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="h-112.5 p-4"
            >
              {result.map((data) => (
                <SwiperSlide key={data._id}>
                  <Link
                    href={`/interior-projects/${data.slug}?type=${data._type}`}
                    className="group relative flex flex-col h-100 bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-zinc-100"
                  >
                    {/* Image Container with Overlay */}
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={data.coverImage}
                        alt={data.name}
                        fill
                        quality={90}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                    </div>

                    {/* Content Box */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-300">
                      <span className="text-white font-bold text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {data._type}
                      </span>
                      <h3 className="font-montagu text-2xl font-bold mt-3 leading-tight group-hover:text-primary transition-colors">
                        {data.name}
                      </h3>

                      {/* Subtle Hover Reveal Arrow */}
                      <div className="flex items-center gap-2 mt-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <span className="text-sm font-medium">
                         View Projects
                        </span>

                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-full max-w-7xl mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.75 md:gap-5 lg:gap-7.5 mt-10 h-100 w-full">
                <div className=" flex flex-col items-center justify-center h-full min-h-87.5 bg-zinc-200/80 rounded-xl border text-primary font-medium text-xl border-zinc-200 shadow-sm overflow-hidden">
                  Oops ! Project Will be Uploaded
                </div>

                <div className="hidden md:flex flex-col items-center justify-center h-full min-h-87.5 bg-zinc-200/80 rounded-xl border text-primary font-medium text-xl border-zinc-200 shadow-sm overflow-hidden">
                  Oops ! Project Will be Uploaded
                </div>

                <div className="hidden lg:flex flex-col items-center justify-center h-full min-h-87.5 bg-zinc-200/80 rounded-xl border text-primary font-medium text-xl border-zinc-200 shadow-sm overflow-hidden">
                  Oops ! Project Will be Uploaded
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeinteriorProject;
