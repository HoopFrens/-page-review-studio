import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { linkPreview } from "@/lib/link-preview";
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
  title: "Page Review Studio | Editorial Services",
  description:
    "Explore substantive editing, scene development, line editing, manuscript critiques, and collaborative narrative development for fiction and narrative nonfiction.",
  keywords: [
    "editorial studio",
    "line editing",
    "memoir editing",
    "book editing",
    "substantive editing",
    "manuscript critique",
    "self publishing editor",
  ],
  ...linkPreview(
    "Page Review Studio",
    "Editorial services for fiction and narrative nonfiction writers.",
  ),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
