import React from 'react';

const BlogHero = () => {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 md:px-16 w-full max-w-7xl mx-auto flex flex-col justify-center items-center gap-4 md:gap-5 font-sans">
      
      {/* Kicker / Sub-heading */}
      <span className="text-sm md:text-base lg:text-lg font-semibold text-center uppercase text-primary tracking-[0.2em] font-montagu">
        The Design Diary
      </span>

      {/* Main Heading */}
      <h1 data-heading-tone="dark" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl lg:max-w-4xl text-center font-bold font-poppins text-zinc-800 leading-tight sm:leading-tight">
        Design, transform & elevate your space.
      </h1>

      {/* Description */}
      <p className="mt-2 md:mt-4 text-sm sm:text-base md:text-lg max-w-xl lg:max-w-2xl text-center text-zinc-500 tracking-wide font-poppins leading-relaxed">
        Explore how innovative designs and custom interior solutions can transform your space. Gain practical styling insights, view real-world transformations, and discover actionable design ideas you can bring to life today.
      </p>
      
    </div>
  );
};

export default BlogHero;