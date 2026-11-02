"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cmsApiUrl, emptyCms, validCms, type CmsBundle } from "@/lib/cms";
const Context = createContext<CmsBundle>(emptyCms);
export function ContentProvider({ children, initialData }: { children: ReactNode; initialData?: CmsBundle }) {
  const { data } = useQuery({
    queryKey: ["website-content"], initialData, initialDataUpdatedAt: 0,
    queryFn: async ({ signal }) => {
      const url = cmsApiUrl(); if (!url) return emptyCms;
      const response = await axios.get(url, { signal, timeout: 10000 });
      return validCms(response.data.result);
    }, staleTime: 60000, refetchInterval: 60000, refetchOnMount: "always", retry: 1,
  });
  const [preview, setPreview] = useState<CmsBundle | null>(null);
  useEffect(() => {
    if (window.parent === window || new URLSearchParams(location.search).get("cmsPreview") !== "1") return;
    const receive = (event: MessageEvent) => {
      if (event.origin === location.origin && event.source === window.parent && event.data?.type === "be-cms-preview") setPreview(validCms(event.data.bundle));
    };
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "be-cms-preview-ready" }, location.origin);
    return () => window.removeEventListener("message", receive);
  }, []);
  const value = useMemo(() => preview || data || emptyCms, [preview, data]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useCms() { return useContext(Context); }
export function useCmsSection(id: string) { return useCms().sections.find(s => s._id === id); }
