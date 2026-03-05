import type { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a free tree service estimate from Classic Tree Service. Upload photos and get help with tree trimming, removal, and stump grinding.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main style={{ padding: "2rem 1rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Contact Classic Tree Service</h1>
      <p>
        Need tree trimming, tree removal, or stump grinding in Modesto, Merced, or
        nearby areas? Request a free estimate below.
      </p>
      <ContactForm />
    </main>
  );
}
