import axios from "axios";
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;

export const homeProjectApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${homeProjectQuery}`,
  );
};

export const officeProjectApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${officeProjectQuery}`,
  );
};

export const HomePageClientReviewApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${homePageClientReview}`,
  );
};

export const whatsAppApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${whatsAppNumber}`,
  );
};

export const footerContactApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${footerContactItems}`,
  );
};

export const homeInteriorPageClientReviewApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${homeInteriorPageClientReview}`,
  );
};

export const officeInteriorPageClientReviewApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${officeInteriorPageClientReview}`,
  );
};

export const interiorTeamApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${interiorTeam}`,
  );
};

export const contactItemApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${contactItems}`,
  );
};

export const contactLocationApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${contactLocation}`,
  );
};

export const allInteriorApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${allinteriorItem}`,
  );
};
export const allModalInteriorApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${allModalinteriorItem}`,
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
  return api.get(`https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${topFiveOfficeProjects}`,)
}

export const allBlogApi = () => {
  return api.get(`https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${allBlogQuery}`)
}

export const packageItemsApi = () => {
  return api.get(`https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${packageQuery}`)
}
export const officePackageItemsApi = () => {
  return api.get(
    `https://${projectId}.api.sanity.io/v2026-06-03/data/query/production?query=${officePackageQuery}`,
  );
};
