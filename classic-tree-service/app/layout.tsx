import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientProviders from "./ClientProviders";

export const metadata: Metadata = {
  title: 'Classic Tree Service | Tree Trimming & Removal in Modesto, CA | Tree Care Experts | Serving Modesto, Merced, & Surrounding Areas | Classic Tree Service',
  description: 'Classic Tree Service offers expert tree trimming, tree removal, and stump grinding across multiple locations in California including Modesto and surrounding areas. Licensed, insured, and reliable. Free estimates available!',
  openGraph: {
    title: 'Classic Tree Service | Tree Trimming & Removal in Modesto, CA | Tree Care Experts | Serving Modesto, Merced, & Surrounding Areas | Classic Tree Service',
    description: 'Classic Tree Service offers expert tree trimming, tree removal, and stump grinding across multiple locations in California including Modesto and surrounding areas. Licensed, insured, and reliable. Free estimates available!',
    url: 'https://www.classic-tree-service.com',
    siteName: 'Classic Tree Service',
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
      </body>
    </html>
  );
}
