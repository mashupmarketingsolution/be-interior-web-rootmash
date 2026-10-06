"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/logo/BEI-Logo.png";

const NavLogo = ({ className = "", onClick }: { className?: string; onClick?: () => void }) => {
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
        <div className={`w-35 md:w-45 h-auto ${className}`}>
          <Image
            src={logo}
            alt="BE Interior"
            width={180}
            height={40}
            priority
            className="w-full h-auto object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default NavLogo;
