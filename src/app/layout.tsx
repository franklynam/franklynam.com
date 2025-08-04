import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import ConditionalAnalytics from "@/components/ConditionalAnalytics";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "franklynam.com",
  description: "software engineering as craft",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ConditionalAnalytics />
      </head>
      <body>
        <AnalyticsWrapper>
          <Header />
          <div className="min-h-screen flex flex-col bg-paletteBlack">
            {children}
            <Footer />
          </div>
          <CookieConsent />
        </AnalyticsWrapper>
      </body>
    </html>
  );
}
