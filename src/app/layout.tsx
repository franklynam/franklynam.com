import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "franklynam.com",
  description: "software engineering as craft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-screen flex flex-col bg-paletteBlack">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
