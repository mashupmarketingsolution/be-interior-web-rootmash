"use client";
import { useLanguage, useTranslation } from "@/components/Language";
import { CmsText, CmsLink, CmsImage, CmsSection } from "@/components/cms/Editable";
import React, { useState } from "react";
import { FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { allBlogApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";

interface BlogTypes {
  ms: number;
  query: number;
  result: {
    authorname: string;
    blogcategory: string;
    coverImage?: string | null;
    blogname: string;
    publishedDate: string;
    slug: string;
  }[];
  syncTags: string[];
}

const fetchAllBlogs = async () => {
  try {
    const res = await allBlogApi();
    if (res.status !== 200) {
      throw new Error("Failed to fetch blogs");
    }
    return res.data;
  } catch (error: unknown) {
    if(process.env.NODE_ENV === "development") {
      console.error("FetchBlog Failed", (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

const BlogSection = () => {
  const t = useTranslation();
  const language = useLanguage();
  const [requestedPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isLoading, isError } = useQuery<BlogTypes>({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
  });

  const blogs = (data?.result ?? []).filter((blog) => blog.slug?.trim() && blog.blogname?.trim());
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const currentPage = Math.min(requestedPage, Math.max(1, totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <CmsSection section="section-720af0ba771b"><div className="py-16 md:py-24 px-4 sm:px-6 md:px-16 w-full max-w-7xl mx-auto font-poppins min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <h2 data-heading-tone="dark" className="text-3xl md:text-4xl font-bold text-zinc-800 font-montagu"><CmsText section="section-720af0ba771b" entryKey="heading-1c7d14349aa2" fallback={"Latest articles"} original={<>
            Latest <span className="text-inherit">articles</span>
          </>} /></h2>
          <div className="h-1 w-20 bg-primary mt-3 rounded-full"></div>
        </div>
      </div>

      {/* Loading State (Skeleton Grid) */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm"
            >
              <div className="h-60 w-full bg-zinc-200/60" />
              <div className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="h-3 w-24 bg-zinc-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-6 w-full bg-zinc-200 rounded-md" />
                  <div className="h-6 w-4/5 bg-zinc-200 rounded-md" />
                </div>
                <div className="mt-4 h-4 w-28 bg-zinc-200 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="py-16 px-6 w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center bg-red-50/50 rounded-3xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FiAlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 data-heading-tone="dark" className="text-xl font-bold text-red-800 mb-2 font-montagu"><CmsText section="section-720af0ba771b" entryKey="heading-a9ef6c8d0294" fallback={"Oops! Something went wrong"} original={<>
            Oops! Something went wrong
          </>} /></h3>
          <p className="text-red-600/80 text-sm"><CmsText section="section-720af0ba771b" entryKey="text-ade7b92cbd1f" fallback={"We couldn't load the articles right now. Please check your internet connection or try refreshing the page."} /></p>
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <CmsLink section="section-720af0ba771b" href={`/blogs/${blog.slug}`} key={blog.slug}>
              <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer">
                {blog.coverImage?.trim() && (
                  <div className="relative h-60 w-full overflow-hidden bg-zinc-100">
                    <CmsImage section="section-720af0ba771b"
                      src={blog.coverImage}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      quality={100}
                      alt={blog.blogname}
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8 flex flex-col grow">
                  {blog.blogcategory && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      {t(blog.blogcategory)}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 font-medium mb-3 empty:hidden">
                    <span className="empty:hidden">{formatDate(blog.publishedDate)}</span>
                    {blog.authorname && (
                      <span><CmsText section="section-720af0ba771b" entryKey="text-e98ad8c3c4ec" fallback={"by "} />{blog.authorname}</span>
                    )}
                  </div>

                  <h3 data-heading-tone="dark" className="text-xl font-bold text-zinc-800 mb-4  transition-colors duration-300 font-montagu leading-snug line-clamp-2 flex-grow">
                    {blog.blogname}
                  </h3>

                  {/* Read More Link */}
                  <div className="mt-auto flex items-center text-sm font-bold text-zinc-800 group-hover:text-primary transition-colors duration-300 pt-4 border-t border-zinc-50"><CmsText section="section-720af0ba771b" entryKey="text-fabdb4a64001" fallback={"read article"} /><FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </article>
            </CmsLink>
          ))}
        </div>
      ) : (
          <div className="py-20 text-center bg-zinc-50 rounded-2xl border border-zinc-100">
            <p className="text-zinc-500 font-medium"><CmsText section="section-720af0ba771b" entryKey="text-835de4a5c931" fallback={"No articles have been published yet. Check back soon!"} /></p>
          </div>
      )}
      {!isLoading && !isError && totalPages > 1 && (
        <div className="flex flex-col gap-5 lg:flex-row items-center justify-between mt-16 border-t border-zinc-200 pt-8">
          <span className="text-zinc-500 font-medium text-sm"><CmsText section="section-720af0ba771b" entryKey="text-47e8168063bd" fallback={"Showing "} />{currentPage}<CmsText section="section-720af0ba771b" entryKey="text-49642a246ad0" fallback={" of "} />{totalPages}<CmsText section="section-720af0ba771b" entryKey="text-27dd0ee9135a" fallback={" Pages"} /></span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
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
              </svg><CmsText section="section-720af0ba771b" entryKey="text-7a38027b5b9d" fallback={"Previous"} /></button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 rounded-xl transition-all duration-300 font-medium tracking-wide flex items-center gap-2 border border-primary text-white bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
            ><CmsText section="section-720af0ba771b" entryKey="text-00a53855053f" fallback={"Next"} /><svg
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
    </div></CmsSection>
  );
};

export default BlogSection;
