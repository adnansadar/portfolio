import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered at build time rather than shipped as a file, so the social card
 * always matches the site's copy and palette. Replaces the old og-image.jpg,
 * which was a 1200x1600 portrait masquerading as a 1200x630 card.
 */
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
          background: "#07080A",
          backgroundImage:
            "radial-gradient(circle at 22% 18%, rgba(255,255,255,.10), transparent 55%)",
          padding: 76,
          color: "#F1F3F6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#5C636D" }}>
          {site.url.replace("https://", "")}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#868D97",
            }}
          >
            Lead Frontend Engineer
          </div>
          {/* Matches the hero's two-tone treatment: dim joiner, mid-grey trail. */}
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#42474F" }}>&amp;</span>
            <span style={{ color: "#6E747E" }}>Technical Writer</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 34,
            fontSize: 22,
            color: "#5C636D",
            borderTop: "1px solid rgba(255,255,255,.12)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex" }}>React · Next.js · TypeScript</div>
          <div style={{ display: "flex" }}>{site.location}</div>
        </div>
      </div>
    ),
    size
  );
}
