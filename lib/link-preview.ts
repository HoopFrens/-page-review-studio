import type { Metadata } from "next";

const studioName = "Page Review Studio";
const image = {
  url: "/brand/link-preview.png",
  width: 256,
  height: 256,
  alt: "Page Review Studio four-square logo",
};

export function linkPreview(
  title: string,
  description: string,
  publishedTime?: string,
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      ...(publishedTime ? { type: "article", publishedTime } : { type: "website" }),
      title,
      description,
      siteName: studioName,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}
