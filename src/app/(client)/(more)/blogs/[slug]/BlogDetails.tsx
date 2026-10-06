"use client";
import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { allBlogApi } from "@/axios/axios";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

interface SanityImageReference {
  _ref: string;
  _type: "reference";
}

interface TextBlock {
  _key: string;
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote" | string;
  children: {
    _key: string;
    _type: "span";
    text: string;
    marks: string[];
  }[];
  markDefs: { _key: string; _type: string; [key: string]: unknown }[];
}

interface ImageBlock {
  _key: string;
  _type: "image";
  asset: SanityImageReference;
}

type BlogContentsType = TextBlock | ImageBlock;
export interface BlogsResultType {
  _id: string;
  slug: string;
  authorname: string;
  authorImage: string;
  authorrole: string;
  blogname: string;
  blogcategory: string;
  coverImage: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  content: BlogContentsType[];
}

interface SingleBlogstype {
  ms: number;
  query: string;
  result: BlogsResultType[];
  syncTags: string[];
}

const fetchSingleBlog = async () => {
  try {
    const res = await allBlogApi();
    if (res.status !== 200) {
      throw new Error("Err while fetching Blog");
    }
    return res.data;
  } catch (error: unknown) {
    if(process.env.NODE_ENV === 'development') {
      console.group("singleFetchBlogError", (error instanceof Error ? error.message : "Unknown error"));
    }
    throw error;
  }
};

const portableTextComponents: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }) => {
      return (
        <figure className="my-14 relative w-full h-[350px] lg:h-[500px] overflow-hidden rounded-[2rem] shadow-lg bg-zinc-100">
          <Image
            src={urlFor(value).url()}
            alt="Blog Image"
            fill
            className="object-cover"
          />
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="mb-6">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 mb-6 text-3xl md:text-4xl font-bold font-montagu text-zinc-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-12 mb-6 text-2xl md:text-3xl font-bold font-montagu text-zinc-800">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-14 border-l-4 border-primary bg-white p-8 lg:p-12 rounded-r-2xl shadow-sm text-xl md:text-2xl lg:text-3xl font-montagu text-zinc-800 italic leading-snug lg:leading-normal">
        {children}
      </blockquote>
    ),
  },
};

const SingleBlogPage = ({ initialBlog }: { initialBlog: BlogsResultType }) => {
  const { slug } = useParams();

  const {
    data: singleBlog,
    isLoading,
    isError,
  } = useQuery<SingleBlogstype, Error, BlogsResultType | undefined>({
    initialData: { ms: 0, query: "", result: [initialBlog], syncTags: [] },
    staleTime: 60000,
    queryKey: ["blogs", slug], // queryKey তে slug দেওয়া ভালো
    queryFn: fetchSingleBlog,
    select: (d) => d.result.find((i) => i.slug === slug),
  });

  if (process.env.NODE_ENV === "development") {
    console.log("singleBlog", singleBlog);
  }

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 flex flex-col justify-center items-center min-h-screen bg-[#fafafa]  gap-2">
        <div className="animate-spin w-10 h-10 border-4 border-zinc-300 border-t-primary rounded-full"></div>
        <p className="font-medium text-2xl text-primary">Loading...</p>
      </div>
    );
  }

  if (isError || !singleBlog) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex items-center justify-center bg-[#fafafa] text-red-500">
        Blog post not found or error occurred.
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 w-full min-h-screen bg-[#fafafa] font-poppins text-zinc-800">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Category Badge */}
        <span className="bg-primary/10 text-primary px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-8">
          {singleBlog.blogcategory}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-montagu leading-[1.2] sm:leading-[1.15] text-zinc-900 mb-8 max-w-4xl">
          {singleBlog.blogname}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm md:text-base text-zinc-500 font-medium bg-white px-8 py-3.5 rounded-full shadow-sm border border-zinc-100">
          <div className="flex items-center gap-2">
            <User size={18} className="text-primary" />
            <span className="text-zinc-700">{singleBlog.authorname}</span>
          </div>
          <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            <span>{singleBlog.publishedDate}</span>
          </div>
          <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            <span>{singleBlog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="max-w-6xl mx-auto mt-14 mb-16 lg:mb-20 relative">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-4 lg:border-8 border-white bg-zinc-200">
          {singleBlog.coverImage && (
            <Image
              src={singleBlog.coverImage}
              alt={singleBlog.blogname || "Cover Image"}
              fill
              quality={100}
              className="object-cover"
            />
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-lg md:text-xl text-zinc-600 leading-relaxed md:leading-[1.8] lg:leading-[2]">
          {singleBlog.content && (
            <PortableText
              value={singleBlog.content}
              components={portableTextComponents}
            />
          )}
        </div>

        {/* Tags */}
        <div className="mt-20 pt-10 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <span className="text-sm md:text-base font-bold text-zinc-800 uppercase tracking-widest">
            Tags:
          </span>
          <div className="flex flex-wrap gap-3">
            {singleBlog.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-white border border-zinc-200 px-5 py-2 text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-wider rounded-full hover:border-primary hover:text-primary transition-colors cursor-pointer shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Details */}
        <div className="mt-14 bg-white p-8 lg:p-10 rounded-[2.5rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-zinc-200 overflow-hidden shrink-0 border-4 border-primary/10">
            {singleBlog.authorImage && (
              <Image
                src={singleBlog.authorImage}
                fill
                quality={100}
                alt="Author"
                className="object-cover"
              />
            )}
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold font-montagu text-zinc-900">
              {singleBlog.authorname}
            </h4>
            <p className="text-primary text-sm md:text-base font-bold uppercase tracking-widest mt-2 mb-4">
              {singleBlog.authorrole}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
