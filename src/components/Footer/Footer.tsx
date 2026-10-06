"use client";
import React from "react";
import Link from "next/link";
import NavLogo from "../Header/NavLogo";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { HiMapPin } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { footerContactApi } from "@/axios/axios";
import Image from "next/image";
import logo from "@/logo/Gemini_Generated_Image_be-interior.png";
import {
  trackPhoneClick,
  trackEmailClick,
} from "@/components/Analytics/dataLayer";
interface FooterContactType {
  ms: number;
  query: string;
  result: {
    footercontactnumber1: string;
    footercontactnumber2: string;
    footercontactemail: string;
    footerlocation: string;
    links: {
      _key: string;
      _type: string;
      platformName: string;
      url: string;
    }[];
  }[];
  syncTags: string[];
}

const fetchFooterLinks = async () => {
  try {
    const res = await footerContactApi();
    if (res.status !== 200) {
      throw new Error("Error While Fetching");
    }
    return res.data;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.log("Footer Err", (error instanceof Error ? error.message : "Unknown error"));
    }
    return;
  }
};

const Footer = () => {
  const { data, isLoading } = useQuery<FooterContactType>({
    queryKey: ["query-key"],
    queryFn: fetchFooterLinks,
  });

  const footerItems = data?.result || [];
  // if (process.env.NODE_ENV === "development") {
  //   console.log("footer data", footerItems);
  // }
const footerNumberOne =
  footerItems[0]?.footercontactnumber1 || "01618995918";

const footerNumberTwo =
  footerItems[0]?.footercontactnumber2 || "01618995918";

const footerEmail =
  footerItems[0]?.footercontactemail || "beinteriorbd@gmail.com";
  const footerLocation = footerItems[0]?.footerlocation || "Dhaka, Bangladesh";

  const socialLinks = footerItems[0]?.links || [];

const getSocialLink = (platform: string) =>
  socialLinks.find(
    (item) => item.platformName?.toLowerCase() === platform.toLowerCase(),
  )?.url || "/";

const footerFB = getSocialLink("Facebook");
const footerInsta = getSocialLink("Instagram");
const footerLinkdIn = getSocialLink("LinkedIn");
const footerYT = getSocialLink("YouTube");

  return (
    <footer className="relative w-full bg-secondary/90 text-white pt-20 pb-20 overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Branding */}
          <div className="flex flex-col -translate-y-17">
              <NavLogo className="" />

              <p className="-mt-8 text-sm font-medium text-zinc-400 leading-relaxed max-w-xs">
                Transforming your living spaces into masterpieces of comfort and
                style. Your vision is our expertise.
              </p>

              <div className="flex gap-4 mt-4">
              {[
                { icon: <FaFacebookF size={14} />, label: "Facebook", link: footerFB },
                {
                  icon: <FaInstagram size={14} />, label: "Instagram",
                  link: footerInsta,
                },
                {
                  icon: <FaLinkedinIn size={14} />, label: "LinkedIn",
                  link: footerLinkdIn,
                },
                {
                  icon: <FaYoutube size={14} />, label: "YouTube",
                  link: footerYT,
                },
              ].filter((item) => item.link && item.link !== "/").map((Icon, i) => (
                <Link
                  key={i}
                  href={Icon.link}
                  aria-label={Icon.label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                >
                  {Icon.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
              Services
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-400">
              {[
                {
                  name: "Home Interior",
                  link: "/services/home-interior",
                },
                {
                  name: "Office Interior",
                  link: "/services/office-interior",
                },
                {
                  name: "Our Projects",
                  link: "/interior-projects",
                },
                {
                  name: "Interior Blogs",
                  link: "/blogs",
                },
              ].map((link) => (
                <Link key={link.name} href={link.link}>
                  <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group font-medium">
                    <span className="w-1 h-1 bg-zinc-600 group-hover:bg-primary rounded-full"></span>
                    {link.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
              Resources
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-400">
              {[
                {
                  name: "Home",
                  link: "/",
                },
                {
                  name: "Calculator",
                  link: "/services/budget-calculator",
                },
                {
                  name: "About Us",
                  link: "/about",
                },
                {
                  name: "Contact",
                  link: "/contact",
                },
              ].map((link) => (
                <Link key={link.name} href={link.link}>
                  <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group font-medium">
                    <span className="w-1 h-1 bg-zinc-600 group-hover:bg-primary rounded-full"></span>
                    {link.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
              Contact
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-zinc-400">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-primary mt-1" />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${footerNumberOne}`}
                    onClick={() => trackPhoneClick("footer_phone_1")}
                    className="hover:text-white transition-colors"
                  >
                    {isLoading ? "..." : footerNumberOne}
                  </a>
                  <a
                    href={`tel:${footerNumberTwo}`}
                    onClick={() => trackPhoneClick("footer_phone_2")}
                    className="hover:text-white transition-colors"
                  >
                    {isLoading ? "..." : footerNumberTwo}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <a
                  href={`mailto:${footerEmail}`}
                  onClick={() => trackEmailClick("footer_email")}
                  className="hover:text-white transition-colors truncate"
                >
                  {isLoading ? "..." : `${footerEmail}`}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiMapPin className="text-lg text-primary mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  {isLoading ? "..." : `${footerLocation}`}
                </p>
              </li>
            </ul>
          </div>
          {/* Column 4: footer page */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">
              Our Facebook Page
            </h4>

            <Link
              href={footerFB}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border relative max-w-3xl w-full h-48 bg-zinc-900 overflow-hidden border-[#111111]/5 shadow-sm rounded-2xl transition-all duration-500 hover:shadow-md hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white text-zinc-400 text-sm gap-2">
                  <div className="w-4 h-4 border-2 border-zinc-300 border-t-primary rounded-full animate-spin"></div>
                  Loading Page...
                </div>
              ) : (
                <>
                  <Image
                    src={logo}
                    alt="BE INTERIOR Facebook Page"
                    fill
                    quality={100}
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 mix-blend-overlay"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between  to-transparent z-10">
                    <div className="flex justify-end">
                      <span className="p-2.5 bg-white/10 backdrop-blur-md text-white rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <FaFacebook className="w-5 h-5" />
                      </span>
                    </div>

                    <div>
                      <p className="text-white text-xl font-montagu font-bold tracking-wide">
                        BE INTERIOR
                      </p>
                      <p className="text-zinc-300 text-xs tracking-wider uppercase mt-1">
                        Join Our Community on Facebook →
                      </p>
                    </div>
                  </div>
                </>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} BE INTERIOR. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
