"use client"
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory px-6 text-center">
      {/* 404 টাইটেল */}
      <h1 className="text-9xl font-bold text-secondary font-montagu mb-4">
        404
      </h1>

      {/* মেসেজ */}
      <h2 className="text-3xl md:text-4xl font-bold text-primary font-montagu mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-zinc-600 font-poppins max-w-md mb-10">
        It seems like the space you are looking for doesn&apos;t exist. Let&apos;s guide
        you back to your ideal home.
      </p>

      {/* অ্যাকশন বাটন */}
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-[#23352e] text-white px-6 py-2 rounded-full"
      >
        Go Back Home
      </button>
    </div>
  );
}
