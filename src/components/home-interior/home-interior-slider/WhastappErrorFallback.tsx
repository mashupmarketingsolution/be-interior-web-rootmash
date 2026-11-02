"use client";
import { CmsText } from "@/components/cms/Editable";
import type { FallbackProps } from "react-error-boundary";
import { Suspense } from "react";

function WhatsappErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-zinc-100">
      <p className="text-red-500"><CmsText section="section-d64afa2df096" entryKey="text-d39d9cb77c5b" fallback={"স্লাইডার লোড করতে সমস্যা হয়েছে।"} /></p>
      <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 bg-primary text-white rounded"><CmsText section="section-d64afa2df096" entryKey="text-cec84d2dff34" fallback={"পুনরায় চেষ্টা করুন"} /></button>
    </div>
  );
}

export default WhatsappErrorFallback
