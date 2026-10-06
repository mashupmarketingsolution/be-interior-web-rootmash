"use client";
import { allInteriorApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

interface AllInteriorProjectstype {
  ms: number;
  query: string;
  result: {
    _id: string;
    name: string;
    _type: string;
    slug: string;
    coverImage: string;
    galleryImages: string[];
    size: string;
    location: string;
  }[];
  syncTags: string[];
}

const fetchAllInteriorItem = async () => {
  try {
    const res = await allInteriorApi();

    if (res.status !== 200) {
      throw new Error("Error while Fetching");
    }

    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error(`All Interior Item Fetch Error`, (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

const InteriorProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isLoading, isError, error } = useQuery<AllInteriorProjectstype>(
    {
      queryKey: ["interior-projects"],
      queryFn: fetchAllInteriorItem,
    },
  );

  const interiorProjects = data?.result || [];

  const totalPages = Math.ceil(interiorProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = interiorProjects.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  if (process.env.NODE_ENV === "development") {
    console.log("All-Interior-Item", interiorProjects);
  }

  return (
    <div className="w-full bg-[#fafafa] py-20 px-4 sm:px-6 lg:px-8 font-poppins min-h-screen ">
      <div className="max-w-7xl mx-auto mt-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-800 font-montagu uppercase tracking-wide">
            Our <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover our latest interior design projects, showcasing our
            commitment to quality, aesthetics, and functional living spaces.
          </p>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-200">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-[24px] overflow-hidden shadow-sm border border-zinc-100"
              >
                <div className="w-full h-64 bg-zinc-200/60" />
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="h-4 bg-zinc-200/60 rounded-full w-1/3" />
                  <div className="h-6 bg-zinc-200/60 rounded-full w-3/4" />
                  <div className="h-4 bg-zinc-200/60 rounded-full w-1/4 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-red-50 rounded-[24px] border border-red-100">
            <p className="text-red-500 font-medium min-h-200">
              Failed to load projects. {error?.message}
            </p>
          </div>
        ) : !isLoading && !isError && currentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 min-h-200">
            {currentProjects.map((project) => (
              <Link
                key={project._id}
                href={`/interior-projects/${project.slug}?type=${project._type}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 h-130"
              >
                {/* Top Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden block bg-zinc-100">
                  {project.coverImage && project.coverImage !== "/" ? (
                    <Image
                      src={project.coverImage}
                      alt={project.name}
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-medium text-zinc-400">
                      No Image Available
                    </div>
                  )}

                  {/* Dark Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating Category Badge */}
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-1.5 text-[10px] font-bold text-primary rounded-full uppercase tracking-widest shadow-sm">
                    {project._type.replace("-", " ")}
                  </div>
                </div>

                {/* Bottom Content Container */}
                <div className="p-6 sm:p-8 flex flex-col grow">
                  {/* Location & Size Info */}
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wider">
                    <span>{project.location || "Dhaka, BD"}</span>
                    {project.size && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span>{project.size}</span>
                      </>
                    )}
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-800 mb-6 group-hover:text-primary transition-colors duration-300 font-montagu leading-snug line-clamp-2">
                    {project.name}
                  </h3>

                  {/* Footer / Read More Button */}
                  <div className="mt-auto pt-5 border-t border-zinc-100">
                    <Link
                      href={`/interior-projects/${project.slug}?type=${project._type}`}
                      className="inline-flex items-center text-sm font-bold text-zinc-800 group-hover:text-primary transition-colors duration-300"
                    >
                      View Project
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !isLoading &&
          !isError &&
          interiorProjects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-zinc-100">
              <p className="text-zinc-500 font-medium">
                No interior projects found at the moment.
              </p>
            </div>
          )
        )}

        {/* Pagination Controls */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="flex flex-col gap-5 lg:flex-row items-center justify-between mt-16 border-t border-zinc-200 pt-8">
            <span className="text-zinc-500 font-medium text-sm">
              Showing {currentPage} of {totalPages} Pages
            </span>
            <div className="flex items-center gap-5">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-6 py-3 rounded-xl transition-all duration-300 font-medium tracking-wide flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-6 py-3 rounded-xl transition-all duration-300 font-medium tracking-wide flex items-center gap-2 border border-primary text-white bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteriorProjects;
