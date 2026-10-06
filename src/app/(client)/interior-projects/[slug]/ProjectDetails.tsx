"use client";
import { whatsappNumber } from "@/lib/contact-links";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import {
  contactItemApi,
  homeProjectApi,
  officeProjectApi,
} from "@/axios/axios";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { trackWhatsAppClick } from "@/components/Analytics/dataLayer";
import { trackPhoneClick } from "@/components/Analytics/dataLayer";
export interface ProjectResultType {
  _id: string;
  _type: string;
  name: string;
  slug: string;
  coverImage: string;
  galleryImage: string[];
  videoLink?: string;
  size: string;
  location: string;
}

interface AllInteriorProjectstype {
  ms: number;
  query: string;
  result: ProjectResultType[];
  syncTags: string[];
}

interface ContactItems {
  ms: number;
  query: string;
  result: {
    WhatsAppNumber: string;
    footercontactemail: string;
    footercontactnumber1: string;
  }[];
  syncTag: string[];
}

const fetchHomeProjects = async () => {
  const res = await homeProjectApi();
  if (res.status !== 200) throw new Error("Error fetching home projects");
  return res.data;
};

const fetchOfficeProjects = async () => {
  const res = await officeProjectApi();
  if (res.status !== 200) throw new Error("Error fetching office projects");
  return res.data;
};

const fetchContacItems = async () => {
  try {
    const res = await contactItemApi();
    if (res.status !== 200) {
      throw new Error("Error While Feching");
    }
    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error While Fetching Slug Contact", (error instanceof Error ? error.message : "Unknown error"));
    }
  }
};

export default function ProjectDetailsPage({ initialProject }: { initialProject: ProjectResultType }) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageUrl(null);
      }
    };

    if (selectedImageUrl) {
      window.addEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedImageUrl]);

  const { slug } = useParams();
  const searchparams = useSearchParams();
  const projectType = initialProject._type;

  const queryKey =
    projectType === "office-projects" ? ["office-interior"] : ["home-interior"];
  const queryFn =
    projectType === "office-projects" ? fetchOfficeProjects : fetchHomeProjects;

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useQuery<AllInteriorProjectstype, Error, ProjectResultType | undefined>({
    initialData: { ms: 0, query: "", result: [initialProject], syncTags: [] },
    queryKey: [...queryKey, slug],
    queryFn: queryFn,
    select: (data) => data.result?.find((item) => item.slug === slug),
    staleTime: 1000 * 60 * 5,
  });

  const { data: contactItems } = useQuery<ContactItems>({
    queryKey: ["contact-items"],
    queryFn: fetchContacItems,
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Single Project Data:", project);
    console.log("contactItems", contactItems);
  }

  const phoneNumber = whatsappNumber(contactItems?.result?.[0]?.WhatsAppNumber);

  const defaultMessage =
    "Hi BE INTERIOR, I want to consult about my space interior design.";

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

  const handleWhatsAppRedirect = () => {
    trackWhatsAppClick("project_details");

    window.open(whatsappUrl, "_blank");
  };

  const getYouTubeEmbedUrl = (url: string | undefined) => {
    if (!url || url === "/") return "";
    if (url.includes("/embed/")) return url;

    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      try {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v") || "";
      } catch (e) {
        return "";
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  const videoUrl = getYouTubeEmbedUrl(project?.videoLink);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-zinc-300 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-primary font-medium animate-pulse">
          Loading project details...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#F0F4EC] flex items-center justify-center font-sans">
        <div className="bg-red-50 border border-red-100 p-8 rounded-2xl max-w-md text-center shadow-sm">
          <p className="text-red-500 font-medium">
            Failed to load project: {error?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ivory font-sans mt-5">
      {/* --- Hero Section --- */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold capitalize text-secondary">
            {project?.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="md:col-span-2 aspect-video bg-zinc-200 rounded-2xl overflow-hidden relative group shadow-md">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title={project?.name || "Project Video"}
                  className="absolute inset-0 w-full h-full border-none"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              ) : project?.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project?.name || "Project Cover"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4 bg-zinc-900">
                  <p className="text-sm text-zinc-400">Media Not Available</p>
                  <p className="text-xs text-zinc-500">
                    Provided by Be Interior Design Team
                  </p>
                </div>
              )}
            </div>

            <div className="p-8 bg-[#FAF5E9]/50 border border-[#111111]/10 rounded-2xl h-full flex flex-col justify-baseline">
              <h3 className="font-montagu text-2xl font-bold text-[#111111] mb-6">
                About This Project
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                    Total Area
                  </p>
                  <p className="font-medium text-lg text-[#111111]">
                    {project?.size || "Not specified"}
                  </p>
                </div>
                <div className="h-px w-full bg-[#111111]/10" /> {/* Divider */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                    Location
                  </p>
                  <p className="font-medium text-lg text-[#111111]">
                    {project?.location || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center py-6 mt-4">
            <button
              onClick={handleWhatsAppRedirect}
              className="bg-secondary text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#1a2924] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Talk to Our Designers
            </button>

           <a
            href={`tel:${contactItems?.result[0].footercontactnumber1 as string}`}
            onClick={() => trackPhoneClick("project_details")}
            className="border-2 border-primary ..."
          >
            Call Now
          </a>

          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold text-secondary inline-block relative">
              Project Gallery
              <span className="absolute -bottom-3 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
            </h2>
          </div>

          {project?.galleryImage && project.galleryImage.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project?.galleryImage.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImageUrl(imgUrl)}
                  className="relative aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 cursor-zoom-in"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.name || "Project"} image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
              <p className="text-zinc-500 font-medium">
                No gallery images available for this project yet.
              </p>
            </div>
          )}

          {/* --- ৪. New Modal / Lightbox Component --- */}
          {selectedImageUrl && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out"
              onClick={() => setSelectedImageUrl(null)}
            >
              <button
                className="absolute top-6 right-6 z-60 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                onClick={() => setSelectedImageUrl(null)}
                aria-label="Close image"
              >
                <FiX className="w-7 h-7" />
              </button>

              {/* Modal Content - Image container */}
              <div
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImageUrl}
                  alt="Project gallery expanded view"
                  fill
                  quality={100}
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
