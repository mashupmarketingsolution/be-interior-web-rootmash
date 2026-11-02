"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { parseSiteSettings } from "@/lib/site-settings";

export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: ["site-appearance-navigation"],
    queryFn: async ({ signal }) => {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
      if (!projectId || !dataset) return parseSiteSettings(null);
      const response = await axios.get(`https://${projectId}.api.sanity.io/v2026-06-03/data/query/${dataset}`, {
        params: { query: '*[_type == "siteSettings" && _id == "siteSettings"][0]{appearance,menu,menuCta}', perspective: "published" },
        signal, timeout: 10000,
      });
      return parseSiteSettings(response.data.result);
    },
    staleTime: 60000, refetchInterval: 60000, retry: 1,
  });
  return data || parseSiteSettings(null);
}
