import { pageMetadata } from "@/lib/metadata";
import { serviceContent } from "@/lib/service-content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { displayPhone, primaryPhone, serviceAreas, treeServices } from "@/lib/site";
import { jsonLd, servicePageSchema } from "@/lib/schema";

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

  const content = serviceContent[service.slug];
  return pageMetadata(content.heading, content.description, `/services/${service.slug}`, service.image);
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = treeServices.find((item) => item.slug === slug);
  if (!service) notFound();
  const content = serviceContent[service.slug];

  return (
    <main className="detail-page">
      <section className="detail-hero">
        <div>
          <p className="eyebrow">Affordable local tree service</p>
          <h1>{content.heading}</h1>
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
        <Image src={service.image} alt={service.alt} width={900} height={720} sizes="(max-width: 980px) 100vw, 45vw" preload />
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

      <section className="section" aria-label={`${service.title} planning guide`}>
        <div className="process__steps">
          {content.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="related-services-title">
        <div className="section__heading">
          <h2 id="related-services-title">Related tree services</h2>
        </div>
        <div className="area-list">
          {treeServices.filter((item) => item.slug !== service.slug).map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`}>{item.title}</Link>
          ))}
          <Link href="/contact">Request a free {service.title.toLowerCase()} estimate</Link>
        </div>
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
        dangerouslySetInnerHTML={{ __html: jsonLd(servicePageSchema(service)) }}
      />
    </main>
  );
}
