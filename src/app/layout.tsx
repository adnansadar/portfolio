import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import JsonLd from "@/components/JsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Adnan Sadar - Software Engineer",
  description:
    "Front-End Web Developer with expertise in React and Next.js, specializing in building modern, responsive web applications with cutting-edge technologies.",
  keywords: [
    "software engineer",
    "front-end developer",
    "React",
    "Next.js",
    "TypeScript",
    "web development",
  ],
  authors: [{ name: "Adnan Sadar" }],
  creator: "Adnan Sadar",
  publisher: "Adnan Sadar",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adnansadar.com",
    title: "Adnan Sadar - Software Engineer",
    description:
      "Front-End Web Developer with expertise in React and Next.js, specializing in building modern, responsive web applications.",
    siteName: "Adnan Sadar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adnan Sadar - Software Engineer",
      },
    ],
  },

  // verification: {
  //   google: "your-google-site-verification", // You'll need to add your verification code
  // },
  alternates: {
    canonical: "https://adnansadar.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
        <JsonLd />
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}
