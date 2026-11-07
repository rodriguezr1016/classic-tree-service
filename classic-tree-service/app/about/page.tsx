import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = pageMetadata(
  "About Our Local Tree Service",
  "Meet Classic Tree Service, serving Modesto, Oakdale and nearby Central Valley communities with tree trimming, removal and stump grinding.",
  "/about",
);

const About = () => {
  return (
    <main className="about">
      <h1>About Classic Tree Service</h1>
      <div className="ins">
        <Image src="/sky-tree.jpeg" alt="Sunlight through a green tree canopy" width={554} height={364} sizes="(max-width: 1120px) 100vw, 1080px" />
        <h2 className="who">Who We Are</h2>
        <p>
          Classic Tree Service is a small, dedicated team committed to providing
          exceptional tree care. As a locally owned and operated business, we take
          pride in serving our community with personalized and professional
          services. Our experienced team is passionate about trees and is here to
          ensure your property looks its best. Trust us to deliver quality and care
          in every job we undertake.
        </p>
      </div>
      <div className="info">
        <div className="more">
          <Image src="/3-tree copy.jpg" alt="Tree trimming service" width={636} height={318} sizes="(max-width: 720px) 100vw, 540px" />
          <h2>Services</h2>
          <p>
            At Classic Tree Service, we specialize in tree trimming, tree removal,
            and stump removal for all types of trees. Whether you need regular
            maintenance or emergency service, our experienced team is here to help.
            We handle every job with professionalism and care to ensure your trees
            and property look their best.
          </p>
        </div>
        <div className="more">
          <Image src="/yellow-tree.jpeg" alt="Tree-lined path with golden autumn leaves" width={636} height={318} sizes="(max-width: 720px) 100vw, 540px" />
          <h2>Insured Tree Care</h2>
          <p>
            Classic Tree Service is insured and provides
            reliable tree care services. Your property and peace of mind are our top
            priorities. Trust us to handle your tree care needs with professionalism
            and care.
          </p>
        </div>
      </div>
      <section aria-labelledby="payment-title">
        <h2 id="payment-title">Payment options</h2>
        <p>We accept cash, check, and Zelle. Request a free estimate before scheduling your tree service.</p>
      </section>
    </main>
  );
};

export default About;
