"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from '../lib/edgestore';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <EdgeStoreProvider>
        <Header />
        {children}
        <Footer />
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
