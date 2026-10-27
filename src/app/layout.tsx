import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { profile } from "@/content/profile";
import { absoluteUrl } from "@/lib/site";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Figtree (SIL Open Font License), a near match for Satoshi in shape and width
// whose licence lets the repo be public. next/font self-hosts it at build time.
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

const home = absoluteUrl();
const title = `${profile.name}: ML, retrieval and representation learning`;
const description =
  "Portfolio of Varun Shirbhayye, M.Tech student in Data Science & AI at IIT Bhilai: research, projects, skills, experience and achievements.";

export const metadata: Metadata = {
  // The base includes any sub-path (GitHub Pages project sites), so the
  // canonical link and preview image resolve inside the site.
  ...(home ? { metadataBase: new URL(home), alternates: { canonical: "/" } } : {}),
  // The tab reads "Name | Portfolio"; link previews keep the longer title.
  title: { default: `${profile.name} | Portfolio`, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: profile.name,
    locale: "en_IN",
    // Rendered by og.png/route.tsx.
    images: [
      { url: "/og.png", width: 1200, height: 630, type: "image/png", alt: `${profile.name}: ${profile.descriptor}` },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0e0b08",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${geistMono.variable} antialiased`}>
      {/* Extensions such as Grammarly add attributes to <body> before React
          hydrates; this ignores those (on <body> only, not its children). */}
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <SiteFooter />
        <SmoothScroll />
        <RevealOnScroll />
      </body>
    </html>
  );
}
