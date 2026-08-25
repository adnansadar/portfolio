import { ImageResponse } from "next/og";

import { findArticle } from "@/content/articles";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
  Only here to give the card an alt line carrying the post's own title — the
  plain `alt` export is a static string and can't see the slug. One id, so each
  post still gets exactly one card.
*/
export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = findArticle(params.slug);

  return [
    {
      id: "card",
      size,
      contentType,
      alt: article ? `${article.title} — ${site.name}` : site.name,
    },
  ];
}

/**
 * The post's social card.
 *
 * A nested segment that declares its own `openGraph` in generateMetadata
 * replaces the parent's wholesale, so the root card does not reach here — and
 * a post shared without one is the case where the image matters most. Same
 * ground, gradient and ink as app/opengraph-image.tsx, with the headline
 * swapped for the article's.
 */
export default async function ArticleOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#5C636D",
          }}
        >
          <div style={{ display: "flex" }}>
            {site.url.replace("https://", "")}/blog
          </div>
          <div style={{ display: "flex" }}>{article?.date}</div>
        </div>

        {/*
          62px, not the root card's 92px: that one sets a two-word name, this
          one has to hold a full headline without spilling past three lines.
        */}
        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
          }}
        >
          {article?.title ?? site.name}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#5C636D",
            borderTop: "1px solid rgba(255,255,255,.12)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex" }}>{site.name}</div>
          <div style={{ display: "flex" }}>{article?.tags}</div>
        </div>
      </div>
    ),
    size
  );
}
