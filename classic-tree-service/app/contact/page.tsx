import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata(
  "Free Tree Service Estimate in Modesto, CA",
  "Request a free tree service estimate in Modesto, Oakdale and nearby areas. Call Classic Tree Service or send photos for trimming, removal or stump grinding.",
  "/contact",
);

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
      <section aria-labelledby="business-hours-title">
        <h2 id="business-hours-title">Business hours</h2>
        <p>Monday–Saturday: 8 AM–6 PM<br />Sunday: Closed</p>
      </section>
    </main>
  );
}
