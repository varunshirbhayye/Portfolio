import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`,
  // deployable to Vercel, Netlify, GitHub Pages or any static host.
  output: "export",
  // Emit `/page/index.html` so static hosts resolve clean URLs.
  trailingSlash: true,
  images: { unoptimized: true },
  // Optional sub-path hosting, e.g. GitHub Pages project sites ("/repo-name").
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

export default nextConfig;
