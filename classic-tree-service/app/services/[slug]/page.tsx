import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { displayPhone, primaryPhone, serviceAreas, siteUrl, treeServices } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return treeServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = treeServices.find((item) => item.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} in Modesto, CA`,
    description: `${service.summary} Serving Modesto, Merced, Ceres, Turlock, Riverbank, Oakdale, Salida, and nearby Central Valley areas.`,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} in Modesto, CA | Classic Tree Service`,
      description: service.summary,
      url: `${siteUrl}/services/${service.slug}`,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = treeServices.find((item) => item.slug === slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} in Modesto, CA`,
    serviceType: service.title,
    provider: {
      "@type": "TreeService",
      name: "Classic Tree Service",
      telephone: primaryPhone,
      url: siteUrl,
    },
    areaServed: serviceAreas.map((area) => `${area.name}, ${area.region}`),
    description: service.summary,
  };

  return (
    <main className="detail-page">
      <section className="detail-hero">
        <div>
          <p className="eyebrow">Affordable local tree service</p>
          <h1>{service.title} in Modesto, CA</h1>
          <p>
            {service.summary} Classic Tree Service helps homeowners, rental
            properties, and small businesses get safe tree work done at a practical
            price.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={`tel:${primaryPhone}`}>
              Call {displayPhone}
            </a>
            <Link className="btn btn--secondary" href="/contact">
              Request a Free Estimate
            </Link>
          </div>
        </div>
        <Image src={service.image} alt={service.alt} width={900} height={720} priority />
      </section>

      <section className="detail-content" aria-labelledby="service-details">
        <div>
          <h2 id="service-details">Budget-friendly {service.title.toLowerCase()} without shortcuts.</h2>
          <p>
            Every property is different, so we quote the safest and most cost-effective
            path before work begins. If there is a lower-cost option, such as trimming
            instead of removing, phased cleanup, or bundling stump grinding with removal,
            we will explain it clearly.
          </p>
        </div>
        <ul>
          <li>Free estimate before scheduling work</li>
          <li>Cleanup and haul-away options</li>
          <li>Service for homes, rentals, and commercial properties</li>
          <li>Local coverage across Modesto and nearby Central Valley cities</li>
        </ul>
      </section>

      <section className="service-area detail-areas" aria-labelledby="service-area-title">
        <div>
          <p className="eyebrow">Nearby service areas</p>
          <h2 id="service-area-title">{service.title} near you</h2>
        </div>
        <div className="area-list">
          {serviceAreas.map((area) => (
            <Link key={area.slug} href={`/service-areas/${area.slug}`}>
              {area.name}, {area.region}
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
