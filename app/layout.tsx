import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pagereviewstudio.com"),
  title: "Page Review Studio | Boutique Editorial Studio for Authors & Experts",
  description:
    "Page Review Studio provides manuscript development, developmental editing, proofreading, ghostwriting, and editorial strategy for authors, memoirists, founders, and thought leaders.",
  keywords: [
    "editorial studio",
    "developmental editing",
    "manuscript development",
    "ghostwriting",
    "memoir editing",
    "proofreading",
    "book editing",
    "thought leadership content",
    "self publishing editor",
  ],
  openGraph: {
    title: "Page Review Studio | Boutique Editorial Studio",
    description: "An editorial partner for people with something worth saying.",
    type: "website",
    locale: "en_US",
    siteName: "Page Review Studio",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
