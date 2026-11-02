import { CmsText, CmsLink, CmsSection } from "@/components/cms/Editable";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BlogDirect = () => {
  return (
    <CmsSection section="section-7907e92a6df3"><div className="py-16 md:py-24 px-4 sm:px-6 md:px-16 w-full max-w-full mx-auto font-poppins ">
      
      {/* Main Card Container */}
      <div className="relative overflow-hidden max-w-5xl mx-auto p-10 md:p-16 lg:p-20 rounded-[2.5rem] flex flex-col justify-center items-center text-center gap-6 bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">

        {/* Decorative Background Elements (Subtle Glows) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Kicker */}
        <span className="relative z-10 text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm"><CmsText section="section-7907e92a6df3" entryKey="text-7a0e517e3439" fallback={"Ready to transform?"} /></span>

        {/* Main Heading */}
        <h2 data-heading-tone="dark" className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold font-montagu text-zinc-800 leading-tight"><CmsText section="section-7907e92a6df3" entryKey="heading-cddf19d232e5" fallback={"Turn your dream space into a reality"} original={<>
          Turn your dream space into a <span className="text-inherit">reality</span>
        </>} /></h2>

        {/* Description (Updated for Interior Design) */}
        <p className="relative z-10 text-zinc-500 max-w-2xl text-sm md:text-base leading-relaxed"><CmsText section="section-7907e92a6df3" entryKey="text-aa9862829214" fallback={"Partner with our expert designers to build stunning interiors, functional layouts, and aesthetic environments that elevate your everyday living and working experience."} /></p>

        {/* Call to Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
          
          {/* Primary Button */}
          <CmsLink section="section-7907e92a6df3" entryKey="link-b0a67e27bd3d" 
            href="/contact" 
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300 shadow-[0_8px_20px_rgba(var(--primary-rgb),0.25)] flex items-center justify-center gap-2 group"
          ><CmsText section="section-7907e92a6df3" entryKey="text-efb66d9d141d" fallback={"Start a project"} /><ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </CmsLink>

          {/* Secondary Button */}
          <CmsLink section="section-7907e92a6df3" entryKey="link-6d234a10d4b4" 
            href="/blogs" 
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-zinc-800 font-medium border border-zinc-200 hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center"
          ><CmsText section="section-7907e92a6df3" entryKey="text-435b37ebc031" fallback={"Read our blog"} /></CmsLink>
          
        </div>
      </div>
    </div></CmsSection>
  );
};

export default BlogDirect;