import React from "react";

export default function HowItStarted() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-ivory">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Our Story
          </p>
          <h2 data-heading-tone="dark" className="text-3xl md:text-4xl lg:text-5xl font-montagu text-[#111111] font-bold tracking-wide">
            Where it all began
          </h2>
        </div>

        {/* Content Layout: Split into 2 columns for better readability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: The Evolution & History */}
          <div>
            <h3 data-heading-tone="dark" className="text-xl font-montagu font-bold text-[#111111] mb-6 border-b border-[#111111]/10 pb-4">
              Our evolution
            </h3>
            <p className="text-zinc-600 leading-relaxed text-base text-justify">
              <span className="font-bold text-[#111111]">BE INTERIOR</span> is a full-service
              interior design company based in Dhaka, Bangladesh. While our brand
              name <span className="font-bold text-[#111111]">BE INTERIOR</span> was officially
              introduced in <span className="font-bold text-primary">2025</span>, our journey in
              the interior and construction industry began in{" "}
              <span className="font-bold text-[#111111]">2018</span>. The company was originally
              established in <span className="font-bold text-[#111111]">2020</span> under the name
              <span className="font-bold text-[#111111]"> Best End Interior</span>.
            </p>
            <p className="text-zinc-600 leading-relaxed text-base text-justify mt-4">
              In <span className="font-bold text-primary">2025</span>, we entered a new chapter by
              rebranding as <span className="font-bold text-[#111111]">BE INTERIOR</span>—a
              simpler, stronger, and more modern identity that reflects our growth,
              vision, and commitment to excellence in interior design. Along with
              our new name, we introduced a new logo that represents a bold,
              contemporary future for our brand. Although our name and visual
              identity have evolved, our passion, dedication, and core values remain
              unchanged. We continue to serve our clients with the same team,
              expertise, and attention to detail that have earned trust over the
              years.
            </p>
          </div>

          {/* Right Column: Expertise & Slogan */}
          <div>
            <h3 data-heading-tone="dark" className="text-xl font-montagu font-bold text-[#111111] mb-6 border-b border-[#111111]/10 pb-4">
              Our expertise
            </h3>
            <p className="text-zinc-600 leading-relaxed text-base text-justify">
              We specialize in{" "}
              <span className="font-bold text-[#111111]">
                residential and commercial interior design
              </span>
              , offering services ranging from furniture and color upgrades to
              complete home, office, and commercial renovations. Our experienced
              professionals ensure smooth project execution, cost efficiency, and
              high-quality results from concept to completion.
            </p>
            <p className="text-zinc-600 leading-relaxed text-base text-justify mt-4">
              At <span className="font-bold text-[#111111]">BE INTERIOR</span>, we emphasize durability and quality by using{" "}
              <span className="font-bold text-[#111111]">premium imported materials</span>, many of which we also distribute locally. Our
              materials are sourced from{" "}
              <span className="font-bold text-[#111111]">
                China, Italy, Brazil, India, and Thailand,
              </span>{" "}
              enabling us to maintain international standards while offering
              competitive pricing. To accommodate diverse client needs, we offer{" "}
              <span className="font-bold text-[#111111]">three flexible service segments</span>,
              allowing customers to choose solutions that align with their budget
              and expectations. Beyond interior design, we have extensive experience
              in <span className="font-bold text-[#111111]">construction and land development</span>.
              We support clients looking to invest in land by providing practical
              budget planning—often within a single day—and we also operate as a
              subcontractor for land development projects.
            </p>

            {/* Highlighted Slogan Box */}
            <div className="mt-10 p-8 bg-white border border-[#111111]/10 rounded-2xl shadow-sm text-center">
              <p className="text-zinc-600 font-medium mb-3">
                BE INTERIOR stands for trust, creativity, and quality. We don’t just design spaces — we shape environments that inspire.
              </p>
              <p className="text-2xl font-montagu font-bold text-primary">
                Your Vision, Our Creation.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}