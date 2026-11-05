import axios from "axios";
import { languageCookie, parseLanguage } from "@/lib/language";
import { localizeContent } from "@/lib/localized-content";
import {
  allBlogQuery,
  allinteriorItem,
  allModalinteriorItem,
  contactItems,
  contactLocation,
  footerContactItems,
  homeInteriorPageClientReview,
  homePageClientReview,
  homeProjectQuery,
  interiorTeam,
  officeInteriorPageClientReview,
  officeProjectQuery,
  packageQuery,

  officePackageQuery,
  topFiveOfficeProjects,
  whatsAppNumber,
} from "./query";

const api = axios.create({ timeout: 20000 });

api.interceptors.response.use(response => {
  if (typeof document !== "undefined" && response.config.url?.startsWith(sanityUrl)) {
    const cookie = document.cookie.split("; ").find(item => item.startsWith(languageCookie + "="));
    response.data = localizeContent(response.data, parseLanguage(cookie?.split("=")[1]));
  }
  return response;
});

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const sanityUrl = `https://${projectId}.api.sanity.io/v2026-06-03/data/query/${dataset}`;

export const homeProjectApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${homeProjectQuery}`,
  );
};

export const officeProjectApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${officeProjectQuery}`,
  );
};

export const HomePageClientReviewApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${homePageClientReview}`,
  );
};

export const whatsAppApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${whatsAppNumber}`,
  );
};

export const footerContactApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${footerContactItems}`,
  );
};

export const homeInteriorPageClientReviewApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${homeInteriorPageClientReview}`,
  );
};

export const officeInteriorPageClientReviewApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${officeInteriorPageClientReview}`,
  );
};

export const interiorTeamApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${interiorTeam}`,
  );
};

export const contactItemApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${contactItems}`,
  );
};

export const contactLocationApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${contactLocation}`,
  );
};

export const allInteriorApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${allinteriorItem}`,
  );
};
export const allModalInteriorApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${allModalinteriorItem}`,
  );
};

interface FormDataType {
  name: string;
  email: string;
  phone: string;
  projectInfo: string;
}

const submissionIds = new Map<string, { id: string; expires: number }>();
export const createLeadApi = async (formData: FormDataType) => {
  if (typeof window !== "undefined" && window.parent !== window && new URLSearchParams(window.location.search).get("cmsPreview") === "1") throw new Error("Enquiries are disabled in draft preview. Open the published website to submit.");
  const fingerprint = JSON.stringify(formData);
  const now = Date.now();
  for (const [key, entry] of submissionIds) if (entry.expires < now) submissionIds.delete(key);
  let entry = submissionIds.get(fingerprint);
  if (!entry) { entry = { id: crypto.randomUUID(), expires: now + 600000 }; submissionIds.set(fingerprint, entry); }
  return api.post("/api/lead", { ...formData, eventId: entry.id });
};

export const leadErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error) && typeof error.response?.data?.error === "string") return error.response.data.error;
  return "We could not send your enquiry. Please check your connection and try again.";
};

export const fetchtopFiveOfficeProjects = () => {
  return api.get(`${sanityUrl}?perspective=published&query=${topFiveOfficeProjects}`,)
}

export const allBlogApi = () => {
  return api.get(`${sanityUrl}?perspective=published&query=${allBlogQuery}`)
}

export const packageItemsApi = () => {
  return api.get(`${sanityUrl}?perspective=published&query=${packageQuery}`)
}
export const officePackageItemsApi = () => {
  return api.get(
    `${sanityUrl}?perspective=published&query=${officePackageQuery}`,
  );
};
