import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientProviders from "./ClientProviders";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = "https://www.classic-tree-service.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Classic Tree Service | Tree Service in Modesto, CA",
    template: "%s | Classic Tree Service",
  },
  description:
    "Classic Tree Service provides tree trimming, tree removal, and stump grinding in Modesto, Merced, and nearby California communities. Request a free estimate.",
  keywords: [
    "tree service Modesto",
    "tree trimming Modesto",
    "tree removal Modesto",
    "stump grinding Modesto",
    "tree service Merced",
    "arborist near me",
    "Classic Tree Service",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Classic Tree Service | Tree Service in Modesto, CA",
    description:
      "Professional tree trimming, removal, and stump grinding for homes and businesses in Modesto and nearby areas.",
    url: siteUrl,
    siteName: "Classic Tree Service",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Tree Service | Tree Service in Modesto, CA",
    description:
      "Professional tree trimming, removal, and stump grinding in Modesto, Merced, and nearby California areas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "TreeService",
    name: "Classic Tree Service",
    url: siteUrl,
    image: `${siteUrl}/sun-tree.jpeg`,
    description:
      "Classic Tree Service provides tree trimming, tree removal, and stump grinding in Modesto, Merced, and surrounding California communities.",
    areaServed: ["Modesto, CA", "Merced, CA", "Central Valley, CA"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Modesto",
      addressRegion: "CA",
      addressCountry: "US",
    },
    serviceType: ["Tree Trimming", "Tree Removal", "Stump Grinding"],
  };

  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
