import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { RevealOnScroll } from "@/components/layout/RevealOnScroll";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Figtree (SIL Open Font License), a near match for Satoshi in shape and width
// whose licence lets the repo be public. next/font self-hosts it at build time.
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

const title = `${profile.name}: ML, retrieval and representation learning`;
const description =
  "Portfolio of Varun Shirbhayye, M.Tech student in Data Science & AI at IIT Bhilai: research, projects, skills, experience and achievements.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
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
