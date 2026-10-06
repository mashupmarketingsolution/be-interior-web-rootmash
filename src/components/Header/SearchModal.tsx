"use client";
import { allModalInteriorApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Search, X, ChevronRight, LayoutGrid, Loader2 } from "lucide-react"; // lucide-react আইকন

interface SearchModalProps {
  searchModal: boolean;
  setSearchModal: (value: boolean) => void;
}

interface AllInteriorProjectstype {
  ms: number;
  query: string;
  result: {
    _id: string;
    name: string;
    slug: string;
    _type: string;
    coverImage: string;
    galleryImages: string[];
    size: string;
    location: string;
  }[];
  syncTags: string[];
}

const fetchAllInteriorItems = async () => {
  try {
    const res = await allModalInteriorApi();
    if (res.status !== 200) {
      throw new Error("Error fetching data");
    }
    return res.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error Fetching Interior Items:", error);
    }
    throw error;
  }
};

export default function SearchModal({
  searchModal,
  setSearchModal,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!searchModal || !dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    const mobile = window.matchMedia("(max-width: 1023px)");
    const closeOnMobile = () => { if (mobile.matches) setSearchModal(false); };
    mobile.addEventListener("change", closeOnMobile);
    return () => {
      dialog.close();
      previousFocus?.focus();
      document.documentElement.style.overflow = previousOverflow;
      mobile.removeEventListener("change", closeOnMobile);
    };
  }, [searchModal, setSearchModal]);

  const { data, isLoading, isError, refetch } = useQuery<AllInteriorProjectstype>({
    queryKey: ["all-interior"],
    queryFn: fetchAllInteriorItems,
    staleTime: 1000 * 60 * 5,
    enabled: searchModal,
  });

  const result = data?.result || [];

  const filteredResults = result.filter((item) => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase().trim().replace(/['"‘“”]/g, "'");
    const name = item.name?.toLowerCase().replace(/['"‘“”]/g, "'") || "";
    const type = item._type?.toLowerCase().replace(/['"‘“”]/g, "'") || "";
    const slug = item.slug?.toLowerCase().replace(/['"‘“”]/g, "'") || "";

    return name.includes(query) || type.includes(query) || slug.includes(query);
  });

  const handleLink = () => {
    setSearchQuery("");
    setSearchModal(false);
  };

  if (!searchModal) return null;

  return (
    <>

      {/* Modal Container */}
      <dialog ref={dialogRef} aria-label="Search projects" onCancel={() => setSearchModal(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setSearchModal(false);
        }}
        className="fixed inset-x-0 top-28 bottom-auto mx-auto my-0 w-[85%] max-w-3xl max-h-[75dvh] p-0 bg-[#111111] text-white border border-white/10 rounded-[28px] shadow-2xl overflow-hidden backdrop:bg-black/60 backdrop:backdrop-blur-sm">

        {/* Top Search Input Area */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center gap-4 bg-white/5 relative group">
          <Search className="w-6 h-6 text-white/40 group-focus-within:text-primary transition-colors" />

          <form onSubmit={(e) => e.preventDefault()} className="flex-1">
            <input
              type="text"
              aria-label="Search projects by name, space, or style"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-lg md:text-xl py-1 focus:ring-0"
              placeholder="Search projects by name, space, or style..."
            />
          </form>

          {searchQuery && <button type="button" onClick={() => setSearchQuery("")} className="p-2 text-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">Clear</button>}
          <button type="button" aria-label="Close search" onClick={() => setSearchModal(false)} className="p-2.5 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-primary"><X size={22} /></button>
        </div>

        {/* Results Area */}
        <div className="max-h-[calc(75dvh-96px)] overflow-y-auto custom-scrollbar">

          {/* Loading State (Fixed) */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/50 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm font-medium tracking-wide">Searching projects...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-400 text-sm">
              Unable to load projects. Please try again.
              <button type="button" onClick={() => void refetch()} className="block mx-auto mt-4 underline">Try again</button>
            </div>
          ) : searchQuery.trim() === "" ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/30">
              <LayoutGrid className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm tracking-wide">Discover your dream interior</p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="flex flex-col p-2 gap-1">
              {filteredResults.map((item) => (
                <Link
                  key={item._id}
                  href={`/interior-projects/${item.slug}?type=${item._type}`}
                  onClick={handleLink}
                  className="group relative w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden border border-transparent hover:border-white/5"
                >
                  {/* Left Accent Line on Hover */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary transition-all duration-300 group-hover:h-1/2 rounded-r-full"></span>

                  <div className="flex items-center gap-4 pl-2">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                      <LayoutGrid className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-1 text-left">
                      <p className="text-white/90 font-medium group-hover:text-white transition-colors text-base">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize font-semibold tracking-wider border border-primary/20">
                          {item._type}
                        </span>
                        {item.location && (
                           <span className="text-[10px] text-white/40">• {item.location}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/0 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300">
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-primary transform group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}

              {/* Show All Projects Button */}
              <div className="px-2 pt-4 pb-2">
                <Link
                  href={"/interior-projects"}
                  onClick={handleLink}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-white/5 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 border border-white/5 hover:border-primary/50 shadow-sm"
                >
                  Show All Projects <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/50 text-sm font-medium mb-1">No projects found for &quot;{searchQuery}&quot;</p>
              <p className="text-white/30 text-xs">Check for typos or try different keywords</p>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
