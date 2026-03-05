import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Classic Tree Service, a licensed and insured local tree company serving Modesto, Merced, and surrounding California areas.",
  alternates: {
    canonical: "/about",
  },
};

const About = () => {
  return (
    <div className="about">
      <h1>About Classic Tree Service</h1>
      <div className="ins">
        <img src="/sky-tree.jpeg" alt="Healthy trees in California" />
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
          <img src="3-tree copy.jpg" alt="Tree trimming service" />
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
          <img src="yellow-tree.jpeg" alt="Licensed and insured tree service" />
          <h2>Licensed and Insured</h2>
          <p>
            Classic Tree Service is fully licensed and insured, ensuring safe and
            reliable tree care services. Your property and peace of mind are our top
            priorities. Trust us to handle your tree care needs with professionalism
            and care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
