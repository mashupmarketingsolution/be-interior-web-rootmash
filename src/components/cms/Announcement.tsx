"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCms } from "./ContentProvider";
import { safeContentLink } from "@/lib/cms";
export function Announcement(){const a=useCms().globals?.announcement;const [now,setNow]=useState<number|null>(null);useEffect(()=>{const initial=setTimeout(()=>setNow(Date.now()),0);const t=setInterval(()=>setNow(Date.now()),30000);return()=>{clearTimeout(initial);clearInterval(t);};},[]);if(!a?.enabled||!a.text||now===null||(a.startsAt&&now<Date.parse(a.startsAt))||(a.endsAt&&now>=Date.parse(a.endsAt)))return null;return <aside className="fixed bottom-16 md:bottom-0 left-0 right-0 z-30 bg-[#111111] px-5 py-3 text-center text-sm text-white">{safeContentLink(a.href)?<Link href={a.href} className="underline underline-offset-4">{a.text}</Link>:a.text}</aside>;}
