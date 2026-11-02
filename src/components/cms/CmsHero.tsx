"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { FaWhatsapp } from "react-icons/fa";
import { useCms, useCmsSection } from "./ContentProvider";
import heroes from "@/content/hero-defaults.json";
import { safeContentImage, safeContentLink, type CmsSlide } from "@/lib/cms";
import { whatsappNumber } from "@/lib/contact-links";
import { trackWhatsAppClick } from "@/components/Analytics/dataLayer";

export function CmsHero({ section, screenReaderHeading }: { section: string; screenReaderHeading?: string }) {
  const doc = useCmsSection(section);
  const contact = useCms().contact;
  const fallback = (heroes as unknown as Record<string, CmsSlide[]>)[section] || [];
  const slides = (doc?.slides || fallback).filter(s => s.enabled !== false);
  if (doc?.enabled === false || !slides.length) return null;
  const delay = Math.min(15000, Math.max(2500, doc?.slideDelay || 5000));
  const phone = whatsappNumber(contact?.WhatsAppNumber || "01618995918");
  const message = contact?.whatsappMessage || "Hi BE INTERIOR, I want to consult about my space interior design.";
  const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return <div className="relative mx-auto h-screen w-full overflow-hidden" data-cms-section={section}>
    {screenReaderHeading && <h1 className="sr-only">{screenReaderHeading}</h1>}
    <Swiper key={slides.map(s => s._key).join("|")} slidesPerView={1} loop={slides.length > 1} modules={[Autoplay]} autoplay={slides.length > 1 ? { delay, disableOnInteraction: false, pauseOnMouseEnter: true } : false} className="h-full bg-zinc-100">
      {slides.map((slide, index) => {
        const src = safeContentImage(slide.url) ? slide.url : slide.fallbackUrl || fallback[index]?.fallbackUrl;
        const href = slide.action === "whatsapp" ? whatsapp : safeContentLink(slide.href) ? slide.href : "/contact";
        return <SwiperSlide key={slide._key} className="relative flex h-full items-center justify-center overflow-hidden text-white">
          {src && <Image src={src} alt={slide.alt || slide.title} fill priority={index === 0} sizes="100vw" className={`${slide.mobileUrl ? "hidden md:block" : ""} object-cover object-center`} />}
          {safeContentImage(slide.mobileUrl) && <Image src={slide.mobileUrl} alt={slide.alt || slide.title} fill sizes="100vw" className="object-cover object-center md:hidden" />}
          <div className="absolute inset-0 z-10 bg-black/30" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pt-16 text-center sm:px-12 md:items-start md:pl-20 md:pt-24 md:text-left lg:pl-32 xl:pl-40">
            <div className="flex max-w-2xl flex-col items-center md:items-start">
              <h2 data-heading-tone="light" className="font-bold text-white">{slide.title}</h2>
              {slide.secondTitle && <h2 data-heading-tone="light" className="mt-1 font-bold text-white">{slide.secondTitle}</h2>}
              {slide.body && <p className="mt-4 max-w-md text-xs font-normal text-zinc-200 sm:text-sm md:text-base">{slide.body}</p>}
              {slide.buttonLabel && <Link href={href} onClick={() => { if (slide.action === "whatsapp") trackWhatsAppClick(section); }} target={slide.action === "whatsapp" ? "_blank" : undefined} rel={slide.action === "whatsapp" ? "noopener noreferrer" : undefined} className="mt-6 flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-white transition-transform hover:-translate-y-1 md:rounded-md md:px-10 md:text-lg">{slide.buttonLabel}{slide.action === "whatsapp" && <FaWhatsapp size={28} />}</Link>}
            </div>
          </div>
        </SwiperSlide>;
      })}
    </Swiper>
  </div>;
}
