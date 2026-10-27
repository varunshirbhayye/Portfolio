// Production URL for canonical links, sitemap and Open Graph. Set
// NEXT_PUBLIC_SITE_URL once the domain is known; Vercel builds fall back to
// the project's production domain automatically.
const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = explicitUrl || (vercelUrl ? `https://${vercelUrl}` : undefined);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefixes static files in /public when the site is served from a sub-path. */
export function asset(path: string) {
  return `${basePath}${path}`;
}

export function absoluteUrl(path = "/") {
  return siteUrl ? `${siteUrl}${basePath}${path}` : undefined;
}
