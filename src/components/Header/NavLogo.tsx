"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteLogo } from "@/lib/site-logo";
import Image from "next/image";
import Link from "next/link";
import logo from "@/logo/BEI-Logo.png";

const NavLogo = ({ className = "", onClick }: { className?: string; onClick?: () => void }) => {
  const { data } = useQuery({
    queryKey: ["site-logo"],
    queryFn: ({ signal }) => fetchSiteLogo(signal),
    staleTime: 60000,
    refetchInterval: 60000,
    retry: 1,
  });
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const managed = data && data.url !== failedUrl ? data : null;
  const handleLogoClick = () => {
    onClick?.();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center">
      <Link href="/" onClick={handleLogoClick}>
        <div className={`w-35 md:w-45 h-12 md:h-14 ${className}`}>
          <Image
            src={managed?.url || logo}
            alt={managed?.alt || "BE Interior"}
            width={180}
            height={managed ? Math.max(1, Math.round(180 * managed.height! / managed.width!)) : 40}
            onError={() => { if (managed) setFailedUrl(managed.url); }}
            priority
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default NavLogo;
