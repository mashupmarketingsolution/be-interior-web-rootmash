"use client";
import React from "react";

const HomeCustomersSuspense = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center mt-16 px-4 p-10 bg-ivory animate-pulse">
      {/* হেডিং প্লেসহোল্ডার */}
      <h2 data-heading-tone="dark" className="text-2xl md:text-3xl lg:text-5xl font-montagu text-[#111111] tracking-wide font-bold ">
        Check some review
      </h2>
      <h2 data-heading-tone="dark" className="text-2xl md:text-3xl lg:text-5xl font-montagu text-[#111111] tracking-wide font-bold ">
        Of our customers
      </h2>

      {/* মেইন কন্টেইনার (Swiper এর মতোই w-full max-w-7xl) */}
      <div className="w-full max-w-7xl mt-8">
        {/* রেসপন্সিভ গ্রিড: মোবাইল ১টি, md তে ২টি, lg তে ৩টি বক্স হ্যান্ডেল করবে */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-[20px] lg:gap-[30px] mt-10 h-100 w-full">
          {/* ======= বক্স ১: মোবাইল, ট্যাবলেট, ডেক্সটপ সব জায়গায় দেখাবে ======= */}
          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            {/* 🔄 অ্যানিমেটেড স্পিনার (Primary Color) */}
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
          </div>

          {/* ======= বক্স ২: md থেকে শো করবে ======= */}
          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden hidden md:flex">
            {/* 🔄 অ্যানিমেটেড স্পিনার (Primary Color) */}
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
          </div>

          {/* ======= বক্স ৩: শুধু lg থেকে শো করবে ======= */}
          <div className="relative flex flex-col items-center justify-center h-full min-h-[350px] bg-zinc-200/80 rounded-xl border border-zinc-200 shadow-sm overflow-hidden hidden lg:flex">
            {/* 🔄 অ্যানিমেটেড স্পিনার (Primary Color) */}
            <div className="w-9 h-9 border-4 border-zinc-300/50 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomersSuspense;
