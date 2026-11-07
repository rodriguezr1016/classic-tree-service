import type { Metadata } from "next";
import { businessName, siteUrl } from "@/lib/site";

export function pageMetadata(title: string, description: string, path: string, image = "/trimming.jpg"): Metadata {
  const fullTitle = `${title} | ${businessName}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle, description, url: `${siteUrl}${path}`,
      siteName: businessName, locale: "en_US", type: "website",
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
