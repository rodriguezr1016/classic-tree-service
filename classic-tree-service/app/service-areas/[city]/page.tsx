import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { displayPhone, primaryPhone, serviceAreas, treeServices } from "@/lib/site";
import { jsonLd, serviceAreaPageSchema } from "@/lib/schema";

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

  return pageMetadata(
    `Affordable Tree Service in ${area.name}, ${area.region}`,
    `Tree trimming, tree removal and stump grinding in ${area.name}, ${area.region}. Call Classic Tree Service or send photos to request a free estimate.`,
    `/service-areas/${area.slug}`,
  );
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { city } = await params;
  const area = serviceAreas.find((item) => item.slug === city);
  if (!area) notFound();

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
              <Link href={`/services/${service.slug}`}>{service.title} in {area.name}</Link>
            </article>
          ))}
        </div>
      </section>

      {area.slug === "oakdale" && (
        <section className="section" aria-labelledby="oakdale-planning-title">
          <div className="section__heading">
            <p className="eyebrow">Planning tree work in Oakdale</p>
            <h2 id="oakdale-planning-title">From tree removal to a usable yard</h2>
          </div>
          <div className="process__steps">
            <article>
              <h3>Tree removal in Oakdale</h3>
              <p>For an unwanted or damaged tree, send photos of the whole tree and nearby structures. Include access details and whether you want the stump addressed as part of the same estimate.</p>
              <Link href="/services/tree-removal">Explore tree removal and cleanup</Link>
            </article>
            <article>
              <h3>Stump grinding in Oakdale</h3>
              <p>You can request grinding for an old stump even if you do not need a tree removed. Share the stump width, gate access and your plans for the space. Ask how wood chips and the remaining area will be handled.</p>
              <Link href="/services/stump-grinding">Plan your Oakdale stump grinding job</Link>
            </article>
            <article>
              <h3>Keeping a tree with trimming</h3>
              <p>If your goal is roof clearance or managing overgrown branches, describe that goal when requesting an estimate. Trimming and removal serve different needs; compare the scope before choosing.</p>
              <Link href="/services/tree-trimming">Learn about tree trimming</Link>
            </article>
          </div>
          <p>For an Oakdale estimate, include your job location, contact details and photos in the online form, or call {displayPhone}. Tell us about each tree or stump so the quote can address the full project.</p>
          <Link className="btn btn--primary" href="/contact">Request an Oakdale tree service estimate</Link>
        </section>
      )}

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
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceAreaPageSchema(area)) }}
      />
    </main>
  );
}
