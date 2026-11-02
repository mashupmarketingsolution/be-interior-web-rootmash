import { readFile } from "node:fs/promises";
import path from "node:path";
import axios from "axios";
import { fetchSiteFavicon } from "@/lib/site-logo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const favicon = await fetchSiteFavicon();
    if (favicon) {
      const url = new URL(favicon.url);
      url.search = new URLSearchParams({ w: "64", h: "64", fit: "crop", fm: "png" }).toString();
      const { data, headers } = await axios.get<ArrayBuffer>(url.href, {
        responseType: "arraybuffer", timeout: 5000, maxContentLength: 1024 * 1024,
      });
      if (typeof headers["content-type"] === "string" && headers["content-type"].startsWith("image/")) {
        return new Response(new Uint8Array(data), {
          headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
        });
      }
    }
  } catch {
    // Preserve the original icon when settings or the image are unavailable.
  }
  return new Response(await readFile(path.join(process.cwd(), "public", "favicon-default.ico")), {
    headers: { "Content-Type": "image/x-icon", "Cache-Control": "no-store" },
  });
}
