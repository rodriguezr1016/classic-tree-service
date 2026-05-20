import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { displayPhone, primaryPhone, serviceAreas, siteUrl, treeServices } from "@/lib/site";

type PageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city);
  if (!area) return {};

  return {
    title: `Affordable Tree Service in ${area.name}, ${area.region}`,
    description: `Affordable tree trimming, tree removal, stump grinding, palm tree care, and cleanup in ${area.name}, ${area.region}. Request a free estimate from Classic Tree Service.`,
    alternates: {
      canonical: `/service-areas/${area.slug}`,
    },
    openGraph: {
      title: `Affordable Tree Service in ${area.name}, ${area.region}`,
      description: `Tree trimming, removal, stump grinding, palm tree care, and cleanup in ${area.name}.`,
      url: `${siteUrl}/service-areas/${area.slug}`,
    },
  };
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city);
  if (!area) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TreeService",
    name: `Classic Tree Service - ${area.name}, ${area.region}`,
    url: `${siteUrl}/service-areas/${area.slug}`,
    telephone: primaryPhone,
    areaServed: `${area.name}, ${area.region}`,
    priceRange: "Affordable tree service estimates",
    serviceType: treeServices.map((service) => service.title),
  };

  return (
    <main className="detail-page">
      <section className="detail-hero detail-hero--text">
        <div>
          <p className="eyebrow">Local tree service near you</p>
          <h1>Affordable Tree Service in {area.name}, {area.region}</h1>
          <p>
            Classic Tree Service provides tree trimming, tree removal, stump grinding,
            palm tree care, and cleanup in {area.name} and surrounding Central Valley
            neighborhoods. Get a clear quote before you schedule the work.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={`tel:${primaryPhone}`}>
              Call {displayPhone}
            </a>
            <Link className="btn btn--secondary" href="/contact">
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="area-services-title">
        <div className="section__heading">
          <p className="eyebrow">Services in {area.name}</p>
          <h2 id="area-services-title">Tree work priced for real local budgets.</h2>
        </div>
        <div className="process__steps">
          {treeServices.slice(0, 3).map((service) => (
            <article key={service.slug}>
              <span>{service.title.charAt(0)}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link href={`/services/${service.slug}`}>View service</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="affordable-band" aria-labelledby="area-affordable-title">
        <div>
          <p className="eyebrow">Free estimates</p>
          <h2 id="area-affordable-title">Compare options before spending money.</h2>
          <p>
            Send photos from your {area.name} property and we can help you decide
            whether trimming, removal, stump grinding, or bundled cleanup makes the
            most sense.
          </p>
        </div>
        <ul>
          <li>Affordable trimming for overgrown limbs</li>
          <li>Safe removal for unwanted or damaged trees</li>
          <li>Stump grinding and cleanup options</li>
          <li>Clear communication before work starts</li>
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
