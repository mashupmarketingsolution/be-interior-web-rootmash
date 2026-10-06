"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiAlertCircle } from "react-icons/fi";
import { allBlogApi } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface BlogTypes {
  ms: number;
  query: number;
  result: {
    authorimage: string;
    authorname: string;
    blogcategory: string;
    coverImage: string;
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

const blogPosts = [
  {
    id: 1,
    title: "10 Modern Minimalist Living Room Ideas",
    excerpt:
      "Discover how to strip back the clutter and create a serene, stylish, and functional minimalist living space.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    category: "Home Interior",
    date: "Jun 12, 2026",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Color Palette",
    excerpt:
      "A comprehensive guide to understanding color theory and selecting the right shades for your bedroom and living areas.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    category: "Styling",
    date: "Jun 08, 2026",
  },
  {
    id: 3,
    title: "Maximizing Small Spaces: Clever Storage",
    excerpt:
      "Struggling with space? Learn how hidden storage and multi-functional furniture can transform compact apartments.",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800",
    category: "Tips & Tricks",
    date: "May 28, 2026",
  },
  {
    id: 4,
    title: "The Ultimate Guide to Office Ergonomics",
    excerpt:
      "Boost productivity and employee well-being with these modern ergonomic workspace layout ideas.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    category: "Office Interior",
    date: "May 15, 2026",
  },
  {
    id: 5,
    title: "Trending Materials for Kitchen Countertops",
    excerpt:
      "From classic marble to durable quartz, explore the best materials to use for your next kitchen renovation.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=800",
    category: "Kitchen",
    date: "May 02, 2026",
  },
  {
    id: 6,
    title: "Bringing Nature Indoors: Biophilic Design",
    excerpt:
      "Learn how to seamlessly integrate plants, natural light, and organic textures to breathe life into your home.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    category: "Design Trends",
    date: "Apr 20, 2026",
  },
];

const BlogSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isLoading, isError } = useQuery<BlogTypes>({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
  });

  const blogs = data?.result || [];
  if(process.env.NODE_ENV === 'development') {
    console.log("Blogs" , blogs)
  }

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * totalPages;
  const currentBlog = blogs.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 md:px-16 w-full max-w-7xl mx-auto font-poppins min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 font-montagu">
            Latest <span className="text-primary">Articles</span>
          </h2>
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
          <h3 className="text-xl font-bold text-red-800 mb-2 font-montagu">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600/80 text-sm">
            We couldn&apos;t load the articles right now. Please check your internet
            connection or try refreshing the page.
          </p>
        </div>
      ) : !isLoading && !isError && blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlog.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.slug}>
              <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer">
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={blog.coverImage || "/placeholder-image.jpg"}
                    fill
                    quality={100}
                    alt={blog.blogname}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Category Badge over image */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary rounded-full uppercase tracking-wider shadow-sm">
                    {blog.blogcategory}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-8 flex flex-col grow">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-3">
                    <span>{formatDate(blog.publishedDate)}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                    <span>By {blog.authorname}</span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-800 mb-4 group-hover:text-primary transition-colors duration-300 font-montagu leading-snug line-clamp-2 flex-grow">
                    {blog.blogname}
                  </h3>

                  {/* Read More Link */}
                  <div className="mt-auto flex items-center text-sm font-bold text-zinc-800 group-hover:text-primary transition-colors duration-300 pt-4 border-t border-zinc-50">
                    Read Article
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        !isLoading &&
        !isError &&
        blogs.length === 0 && (
          <div className="py-20 text-center bg-zinc-50 rounded-2xl border border-zinc-100">
            <p className="text-zinc-500 font-medium">
              No articles have been published yet. Check back soon!
            </p>
          </div>
        )
      )}
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
  );
};

export default BlogSection;
