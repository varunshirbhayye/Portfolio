import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Absolute URLs need the production domain; without NEXT_PUBLIC_SITE_URL the
// sitemap is emitted empty rather than pointing at the wrong host.
export default function sitemap(): MetadataRoute.Sitemap {
  const home = absoluteUrl("/");
  if (!home) return [];
  return [{ url: home, changeFrequency: "monthly", priority: 1 }];
}
