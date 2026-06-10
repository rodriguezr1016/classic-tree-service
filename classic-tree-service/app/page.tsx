import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { displayPhone, faqs, primaryPhone, serviceAreas, treeServices } from "@/lib/site";
import { homePageSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Affordable Tree Service in Modesto, CA",
  description:
    "Affordable tree trimming, tree removal, stump grinding, palm trimming, and storm cleanup in Modesto, Merced, Ceres, Turlock, Riverbank, and nearby Central Valley areas.",
  alternates: {
    canonical: "/",
  },
};

const Home = () => {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media" aria-hidden="true" />
        <div className="hero__content">
          <p className="eyebrow">Local, licensed and insured tree service</p>
          <h1 id="hero-title">Affordable Tree Service in Modesto, CA</h1>
          <p className="hero__lead">
            Tree trimming, tree removal, stump grinding, palm tree care, and storm
            cleanup for homeowners and businesses across the Central Valley.
          </p>
          <div className="hero__actions" aria-label="Primary calls to action">
            <a className="btn btn--primary" href={`tel:${primaryPhone}`}>
              Call {displayPhone}
            </a>
            <Link className="btn btn--secondary" href="/contact">
              Get a Free Estimate
            </Link>
          </div>
          <div className="hero__badges" aria-label="Classic Tree Service highlights">
            <span>Free estimates</span>
            <span>Budget-friendly pricing</span>
            <span>Clean haul-away options</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Service highlights">
        <div>
          <strong>Fast Quotes</strong>
          <span>Send photos and get clear next steps.</span>
        </div>
        <div>
          <strong>Fair Pricing</strong>
          <span>Small-business rates without surprise upsells.</span>
        </div>
        <div>
          <strong>Safe Work</strong>
          <span>Ropes, pulleys, and careful cleanup on every job.</span>
        </div>
      </section>

      <section className="section section--intro" aria-labelledby="intro-title">
        <div>
          <p className="eyebrow">Why homeowners choose Classic</p>
          <h2 id="intro-title">Professional tree care that respects your budget.</h2>
        </div>
        <p>
          Classic Tree Service is a local small business built for practical,
          affordable tree work. We keep the quote simple, explain the safest option,
          and help you choose the service level that fits your property and your budget.
        </p>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="section__heading">
          <p className="eyebrow">Tree services</p>
          <h2 id="services-title">Everything your yard needs, priced clearly.</h2>
        </div>
        <div className="service-grid">
          {treeServices.map((service) => (
            <article className="service-card" key={service.title}>
              <Image src={service.image} alt={service.alt} width={720} height={540} />
              <div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link href={`/services/${service.slug}`}>Learn about {service.title.toLowerCase()}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="affordable-band" aria-labelledby="affordable-title">
        <div>
          <p className="eyebrow">Affordability first</p>
          <h2 id="affordable-title">Ask about bundled tree removal and stump grinding.</h2>
          <p>
            The most affordable job is usually the one planned correctly from the start.
            We can quote trimming, removal, grinding, and haul-away together so you can
            compare options before committing.
          </p>
        </div>
        <ul>
          <li>No-pressure free estimates</li>
          <li>Options for full cleanup or lower-cost partial haul-away</li>
          <li>Preventative trimming to avoid expensive damage later</li>
          <li>Competitive rates for rental and multi-tree properties</li>
        </ul>
      </section>

      <section className="section process" aria-labelledby="process-title">
        <div className="section__heading">
          <p className="eyebrow">Simple process</p>
          <h2 id="process-title">From quote to cleanup without the runaround.</h2>
        </div>
        <div className="process__steps">
          <article>
            <span>1</span>
            <h3>Send Photos</h3>
            <p>Show us the tree, access, fences, lines, and anything nearby.</p>
          </article>
          <article>
            <span>2</span>
            <h3>Compare Options</h3>
            <p>We explain what can be trimmed, removed, bundled, or phased.</p>
          </article>
          <article>
            <span>3</span>
            <h3>Get It Done</h3>
            <p>Our team completes the work safely and leaves the area cleaned up.</p>
          </article>
        </div>
      </section>

      <section className="service-area" aria-labelledby="areas-title">
        <div>
          <p className="eyebrow">Service areas</p>
          <h2 id="areas-title">Tree service across Modesto and nearby communities.</h2>
        </div>
        <div className="area-list" aria-label="Cities served">
          {serviceAreas.map((area) => (
            <Link key={area.slug} href={`/service-areas/${area.slug}`}>
              {area.name}
            </Link>
          ))}
          <span>Central Valley</span>
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq-title">
        <div className="section__heading">
          <p className="eyebrow">Questions homeowners ask</p>
          <h2 id="faq-title">Tree service questions, answered clearly.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta" aria-labelledby="cta-title">
        <h2 id="cta-title">Need an affordable tree service estimate?</h2>
        <p>
          Call Classic Tree Service today for trimming, removals, stump grinding,
          palm tree work, and storm cleanup in the Modesto area.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={`tel:${primaryPhone}`}>
            Call Now
          </a>
          <Link className="btn btn--secondary" href="/contact">
            Request Online
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homePageSchema()) }}
      />
    </main>
  );
};

export default Home;
