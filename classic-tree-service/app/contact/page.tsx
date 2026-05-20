import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tree Service Estimate",
  description:
    "Request a free affordable tree service estimate from Classic Tree Service. Upload photos and get help with tree trimming, removal, stump grinding, palm trimming, and cleanup.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <p className="eyebrow">Free estimate</p>
      <h1>Contact Classic Tree Service</h1>
      <p>
        Need tree trimming, tree removal, or stump grinding in Modesto, Merced, or
        nearby areas? Request a free estimate below and ask about affordable bundled
        pricing for removal, cleanup, and stump grinding.
      </p>
    </main>
  );
}
