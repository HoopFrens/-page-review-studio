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
  title: "Page Review Studio | Line Editing & Graphic Design",
  description:
    "Page Review Studio offers thoughtful line editing and graphic design. Refine your manuscript or request a custom quote for your next design project.",
  keywords: [
    "editorial studio",
    "line editing",
    "graphic design",
    "memoir editing",
    "book editing",
    "thought leadership content",
    "self publishing editor",
  ],
  openGraph: {
    title: "Page Review Studio | Line Editing & Graphic Design",
    description: "Thoughtful line editing and graphic design for ideas worth sharing.",
    type: "website",
    locale: "en_US",
    siteName: "Page Review Studio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Page Review Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Review Studio | Line Editing & Graphic Design",
    description: "Thoughtful line editing and graphic design for ideas worth sharing.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
