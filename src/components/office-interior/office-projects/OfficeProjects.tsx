"use client";
import { fetchtopFiveOfficeProjects } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiCornerDownRight } from "react-icons/fi";

interface OfficeProject {
  ms: number;
  query: string;
  result: {
    _id: string;
    name: string;
    slug: string;
    _type: string;
    coverImage: string;
    size: string;
    location: string;
    projectCategory: string;
  }[];
  syncTags: string[];
}

const fetchOfficeProjects = async () => {
  try {
    const res = await fetchtopFiveOfficeProjects();

    if (res.status !== 200) {
      throw new Error("Error while Getting Data");
    }

    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("Office Project Fetch Error:", (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

const OfficeProjects = () => {
  const { data, isLoading, isError, error } = useQuery<OfficeProject>({
    queryKey: ["top-office-projects"],
    queryFn: fetchOfficeProjects,
    staleTime: 1000 * 60 * 5,
  });

  if (process.env.NODE_ENV === "development") {
    console.log("top-office-data", data?.result || []);
  }
  const result = data?.result || [];

  const gridLayouts = [
    {
      gridClass: "md:col-span-1 md:row-span-1 min-h-[280px] lg:min-h-[320px]",
    },
    {
      gridClass: "md:col-span-1 md:row-span-1 min-h-[280px] lg:min-h-[320px]",
    },
    {
      gridClass: "md:col-span-1 md:row-span-2 min-h-[400px] md:min-h-full", //
    },
    {
      gridClass: "md:col-span-2 md:row-span-1 min-h-[260px] lg:min-h-[300px]", //
    },
  ];

  const mappedProjects = result.map((project, index) => {
    return {
      ...project,
      gridClass:
        gridLayouts[index]?.gridClass ||
        "md:col-span-1 md:row-span-1 min-h-[280px]",
    };
  });

  console.log("mappedProjects", mappedProjects);

  return (
    <div className="w-full bg-ivory py-24 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-secondary font-bold text-sm tracking-widest uppercase mb-2">
              <FiCornerDownRight /> Featured Works
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-zinc-800 tracking-wide font-montagu uppercase">
              Our <span className="text-primary">Projects</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs font-medium leading-relaxed">
            A glimpse of modern workspaces designed and executed perfectly to
            boost corporate culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {isLoading && (
            <>
              {[
                "md:col-span-1 md:row-span-1 min-h-[280px] lg:min-h-[320px]",
                "md:col-span-1 md:row-span-1 min-h-[280px] lg:min-h-[320px]",
                "md:col-span-1 md:row-span-2 min-h-[400px] md:min-h-full",
                "md:col-span-2 md:row-span-1 min-h-[260px] lg:min-h-[300px]",
              ].map((gridClass, index) => (
                <div
                  key={`skeleton-${index}`}
                  className={`bg-zinc-200/60 animate-pulse rounded-[28px] border border-zinc-200 flex items-center justify-center ${gridClass}`}
                >
                  <div className="w-10 h-10 border-4 border-zinc-300 border-t-[#365856] rounded-full animate-spin"></div>
                </div>
              ))}
            </>
          )}

          {isError && !isLoading && (
            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-red-50/50 rounded-[28px] border border-red-100">
              <p className="text-red-500 font-medium font-poppins">
                Failed to load projects. Please refresh the page.
              </p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            mappedProjects &&
            mappedProjects.length > 0 &&
            mappedProjects.map((project) => (
              <Link
                key={project._id}
                href={`/interior-projects/${project.slug}?type=${project._type}`}
                className={project.gridClass}
              >
                <div className="group relative w-full h-full bg-zinc-100 rounded-[28px] border border-zinc-200/60 overflow-hidden flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(54,88,86,0.12)] hover:border-[#365856]/30 cursor-pointer">
                  <div className="absolute inset-0 bg-linear-to-br from-zinc-50 via-zinc-100 to-zinc-200/80 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[24px_24px]" />

                    <Image
                      src={project.coverImage}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                    />
                  </div>

                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/30 to-transparent opacity-80 group-hover:from-zinc-950/90 transition-all duration-500 z-10" />

                  <div className="relative z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out w-full flex items-end justify-between">
                    <div>
                      <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase opacity-90 block mb-1">
                        {project.location} • Corporate Office
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide font-poppins">
                        {project.name}
                      </h3>
                    </div>

                    <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary group-hover:rotate-45 transition-all duration-500 shadow-lg shrink-0 ml-4">
                      <FiArrowUpRight className="text-lg" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          {!isLoading && !isError && mappedProjects?.length === 0 && (
            <div className="col-span-full py-20 text-center bg-zinc-50 rounded-[28px] border border-zinc-200/60">
              <p className="text-zinc-500 font-medium font-poppins">
                No projects found at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeProjects;
