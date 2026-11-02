import React from "react";

const JustClickSuspense = () => {
  return (
    <div className="mb-20 flex flex-col w-full items-center justify-center mt-16 px-4">
      <h2 data-heading-tone="dark" className="text-2xl md:text-3xl lg:text-5xl font-montagu text-secondary tracking-wide font-bold">
        Your dream interior
      </h2>
      <h2 data-heading-tone="dark" className="text-xl md:text-2xl lg:text-3xl font-montagu text-secondary tracking-wide font-bold">
        Just one click away
      </h2>
      <button className="w-full md:w-auto md:h-full px-6 py-3 md:px-10 bg-primary text-white font-medium text-lg md:text-2xl tracking-wider hover:bg-[#c35e00] transition-colors rounded-lg md:rounded-none mt-10 cursor-pointer">
        Get started
      </button>
    </div>
  );
};

export default JustClickSuspense;
