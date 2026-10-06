"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator } from "lucide-react";

export default function Navbtn() {
  const pathname = usePathname();
  return (
    <Link href="/services/budget-calculator" aria-current={pathname === "/services/budget-calculator" ? "page" : undefined}
      className="inline-flex h-12 rounded-xl shadow-sm items-center justify-center gap-2 whitespace-nowrap bg-primary px-5 xl:px-6 text-white text-sm font-semibold hover:bg-[#c35e00] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
      <Calculator size={20} />Calculate Estimate
    </Link>
  );
}
