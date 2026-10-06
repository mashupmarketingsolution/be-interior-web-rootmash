"use client";
import type { FallbackProps } from "react-error-boundary";
import { Suspense } from "react";

function WhatsappErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-zinc-100">
      <p className="text-red-500">স্লাইডার লোড করতে সমস্যা হয়েছে।</p>
      <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 bg-primary text-white rounded">
        পুনরায় চেষ্টা করুন
      </button>
    </div>
  );
}

export default WhatsappErrorFallback
