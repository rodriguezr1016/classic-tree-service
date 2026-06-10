import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientProviders from "./ClientProviders";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Classic Tree Service | Affordable Tree Service in Modesto, CA",
    template: "%s | Classic Tree Service",
  },
  description:
    "Classic Tree Service provides affordable tree trimming, tree removal, stump grinding, palm tree care, and cleanup in Modesto, Merced, and nearby California communities. Request a free estimate.",
  keywords: [
    "affordable tree service Modesto",
    "tree service Modesto",
    "tree trimming Modesto",
    "tree removal Modesto",
    "stump grinding Modesto",
    "palm tree trimming Modesto",
    "cheap tree removal Modesto",
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
    title: "Classic Tree Service | Affordable Tree Service in Modesto, CA",
    description:
      "Affordable tree trimming, removal, stump grinding, palm tree care, and cleanup for homes and businesses in Modesto and nearby areas.",
    url: siteUrl,
    siteName: "Classic Tree Service",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Tree Service | Affordable Tree Service in Modesto, CA",
    description:
      "Affordable tree trimming, removal, stump grinding, palm tree care, and cleanup in Modesto, Merced, and nearby California areas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
