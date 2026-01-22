"use client"

import { EdgeStoreProvider } from "../lib/edgestore";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EdgeStoreProvider>{children}</EdgeStoreProvider>;
}
