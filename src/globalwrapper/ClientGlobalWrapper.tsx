"use client";
import React, { useEffect, useState } from "react";
import SiteTheme from "@/components/SiteTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import BlogDirect from "@/components/blogs/blogDirect/BlogDirect";
import MobileBottomMenu from "@/components/Footer/MobileBottomMenu";
import { useRouter } from "next/navigation";
const ClientGlobalWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  useEffect(() => {
    const handlePopState = () => {

      setTimeout(() => {

        window.location.reload(); 
        
      }, 100);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SiteTheme>
        <Navbar />
        {children}
        <BlogDirect />
        <MobileBottomMenu />
        <Footer />
        </SiteTheme>
      </QueryClientProvider>
    </>
  );
};

export default ClientGlobalWrapper;
