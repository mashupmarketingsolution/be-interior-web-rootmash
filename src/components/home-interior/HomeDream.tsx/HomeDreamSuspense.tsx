import React from 'react'

const HomeDreamSuspense = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center  px-4 py-12 bg-ivory/50  max-w-full h-full mx-auto">
      <h2 data-heading-tone="dark" className="text-2xl md:text-4xl lg:text-5xl font-montagu text-secondary tracking-wide font-black text-center leading-tight">
        Your dream home is just a
        <span className="block text-inherit mt-2 md:mt-3">click away</span>
      </h2>

      <button
        className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-extrabold text-lg md:text-xl tracking-wider hover:bg-[#c35e00] hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl mt-8 cursor-pointer shadow-lg shadow-primary/20"
      >
        Message us now
      </button>
    </div>
  )
}

export default HomeDreamSuspense