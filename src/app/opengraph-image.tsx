import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const dynamic = "force-static";
export const alt = `${profile.name}: ${profile.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once at build time. Uses the built-in OG font to avoid a network
// fetch during builds.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(ellipse 70% 90% at 0% 100%, rgba(217,140,64,0.32), #0e0b08 70%)",
          color: "#f0e7d6",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", marginBottom: 48 }}>
          <div style={{ fontSize: 40, color: "rgba(240,231,214,0.8)" }}>{profile.affiliation}</div>
          <div style={{ marginTop: 10, fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 120, background: "#d9a353", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
