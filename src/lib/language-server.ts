import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { languageCookie, parseLanguage } from "./language";

export const getLanguage = cache(async () => parseLanguage((await cookies()).get(languageCookie)?.value));
