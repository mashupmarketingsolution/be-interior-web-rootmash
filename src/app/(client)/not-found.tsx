"use client"
import { LocalizedText } from "@/components/Language";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory px-6 text-center">
      {/* 404 টাইটেল */}
      <h1 data-heading-tone="dark" className="text-9xl font-bold text-secondary font-montagu mb-4">
        404
      </h1>

      {/* মেসেজ */}
      <h2 data-heading-tone="dark" className="text-3xl md:text-4xl font-bold text-[#111111] font-montagu mb-6">
        <LocalizedText>{"Oops! Page not found"}</LocalizedText></h2>
      <p className="text-zinc-600 font-poppins max-w-md mb-10">
        <LocalizedText>{"It seems like the space you are looking for doesn't exist. Let's guide you back to your ideal home."}</LocalizedText></p>

      {/* অ্যাকশন বাটন */}
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-[#23352e] text-white px-6 py-2 rounded-full"
      >
        <LocalizedText>{"Go back home"}</LocalizedText></button>
    </div>
  );
}
