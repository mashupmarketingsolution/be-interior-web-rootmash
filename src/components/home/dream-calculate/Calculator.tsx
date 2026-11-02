import React from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Sparkles } from "lucide-react";

const CalculatorSection = () => {
  return (
    <section className="bg-ivory py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto relative bg-[#111111] rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        
        {/* Architectural Background Grids & Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/30 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center py-16 md:py-20 px-6 text-center">
          
          {/* Top Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md animate-fade-in">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80">
              Smart Estimation
            </span>
          </div>

          <h2 data-heading-tone="light" className="text-3xl md:text-5xl lg:text-6xl font-montagu text-white tracking-wide font-bold leading-tight mb-6">
            Invest in your <span className="text-inherit">ideal space</span>
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Turn your vision into reality. Get an instant, accurate estimate for your interior design project with our smart calculator.
          </p>

          {/* Call to Action Button */}
          <Link href="/services/budget-calculator">
            <button className="group relative flex items-center gap-3 px-8 py-4 bg-primary hover:bg-[#c35e00] text-white font-bold text-lg md:text-xl rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(200,122,49,0.3)] hover:shadow-[0_15px_40px_rgba(200,122,49,0.5)]">
              
              {/* Button Glass Sweep Animation */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-[200%] bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out"></div>

              <Calculator size={22} className="relative z-10 transition-transform duration-300 group-hover:rotate-12" />
              <span className="relative z-10 tracking-widest uppercase text-sm md:text-base">Calculate now</span>
              
              {/* Sliding Arrow */}
              <ArrowRight size={20} className="relative z-10 -ml-3 opacity-0 w-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;