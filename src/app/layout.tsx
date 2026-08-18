import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { AmbientField } from "@/components/motion/ambient-field";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Lead frontend engineer building scalable React and Next.js architectures, real-time data interfaces, and design systems that hold up as teams grow.",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description:
      "Scalable frontend architecture, real-time data interfaces, and design systems. Five years shipping product, two leading the frontend.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description:
      "Scalable frontend architecture, real-time data interfaces, and design systems.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable} h-full`}>
      <head>
        {/*
          Satoshi lives on Fontshare, which next/font cannot consume — it only
          handles Google Fonts and local files. Dropping the .woff2 files into
          src/fonts/ and switching to next/font/local removes this request.
        */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f%5B%5D=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        {/*
          Motion writes each reveal's `hidden` state into the server HTML.
          Without JS those elements would stay at opacity 0 forever, so show
          them all immediately instead.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;letter-spacing:0.09em!important;}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <AmbientField />
        {/* Lifts the page above the fixed ambient layers, which sit at z-0. */}
        <div className="relative z-10 flex min-h-full flex-col">{children}</div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
