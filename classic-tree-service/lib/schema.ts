import {
  businessDescription,
  businessName,
  faqs,
  logoPath,
  primaryPhone,
  serviceAreas,
  siteUrl,
  treeServices,
} from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  url: string;
};

export const ids = {
  business: `${siteUrl}/#business`,
  website: `${siteUrl}/#website`,
  logo: `${siteUrl}${logoPath}#logo`,
  offerCatalog: `${siteUrl}/#tree-service-offer-catalog`,
};

export function absoluteUrl(path = "/") {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function businessSchema() {
  return {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "TreeService"],
    "@id": ids.business,
    name: businessName,
    legalName: businessName,
    description: businessDescription,
    url: siteUrl,
    telephone: primaryPhone,
    image: [
      absoluteUrl("/trimming.jpg"),
      absoluteUrl("/removal.jpg"),
      absoluteUrl("/palm-tree.jpeg"),
    ],
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: absoluteUrl(logoPath),
      contentUrl: absoluteUrl(logoPath),
      caption: `${businessName} logo`,
      width: 227,
      height: 185,
    },
    priceRange: "Free estimates and affordable tree service pricing",
    currenciesAccepted: "USD",
    paymentAccepted: ["Cash", "Check", "Credit Card"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Modesto",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: `${area.name}, ${area.region}`,
      url: absoluteUrl(`/service-areas/${area.slug}`),
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: primaryPhone,
        contactType: "customer service",
        areaServed: "Central Valley, CA",
        availableLanguage: "English",
      },
    ],
    knowsAbout: [
      "tree service",
      "tree trimming",
      "tree removal",
      "stump grinding",
      "palm tree trimming",
      "storm cleanup",
      "affordable tree service",
    ],
    slogan: "Affordable local tree service in Modesto, CA",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": ids.offerCatalog,
      name: "Classic Tree Service Offer Catalog",
      itemListElement: treeServices.map((service) => ({
        "@type": "Offer",
        name: service.title,
        url: absoluteUrl(`/services/${service.slug}`),
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          "@id": absoluteUrl(`/services/${service.slug}#service`),
          name: service.title,
          serviceType: service.title,
          description: service.summary,
          provider: { "@id": ids.business },
          areaServed: serviceAreas.map((area) => `${area.name}, ${area.region}`),
        },
      })),
    },
    potentialAction: {
      "@type": "ContactAction",
      name: "Request a free tree service estimate",
      target: absoluteUrl("/contact"),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: siteUrl,
    name: businessName,
    description: businessDescription,
    publisher: { "@id": ids.business },
    inLanguage: "en-US",
  };
}

export function homePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      websiteSchema(),
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "Affordable Tree Service in Modesto, CA",
        description: businessDescription,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.business },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/trimming.jpg"),
        },
        mainEntity: { "@id": ids.business },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#services`,
        name: "Tree services offered by Classic Tree Service",
        itemListElement: treeServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: absoluteUrl(`/services/${service.slug}`),
        })),
      },
      faqSchema(),
    ],
  };
}

export function servicePageSchema(service: (typeof treeServices)[number]) {
  const pageUrl = absoluteUrl(`/services/${service.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      websiteSchema(),
      breadcrumbSchema([
        { name: "Home", url: siteUrl },
        { name: "Services", url: absoluteUrl("/#services-title") },
        { name: service.title, url: pageUrl },
      ]),
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${service.title} in Modesto, CA`,
        description: service.summary,
        isPartOf: { "@id": ids.website },
        about: { "@id": `${pageUrl}#service` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(service.image),
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${service.title} in Modesto, CA`,
        serviceType: service.title,
        description: service.summary,
        url: pageUrl,
        provider: { "@id": ids.business },
        areaServed: serviceAreas.map((area) => ({
          "@type": "City",
          name: `${area.name}, ${area.region}`,
          url: absoluteUrl(`/service-areas/${area.slug}`),
        })),
        offers: {
          "@type": "Offer",
          name: `Free ${service.title.toLowerCase()} estimate`,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: { "@id": ids.business },
          url: absoluteUrl("/contact"),
        },
      },
    ],
  };
}

export function serviceAreaPageSchema(area: (typeof serviceAreas)[number]) {
  const pageUrl = absoluteUrl(`/service-areas/${area.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      websiteSchema(),
      breadcrumbSchema([
        { name: "Home", url: siteUrl },
        { name: "Service Areas", url: absoluteUrl("/#areas-title") },
        { name: `${area.name}, ${area.region}`, url: pageUrl },
      ]),
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Affordable Tree Service in ${area.name}, ${area.region}`,
        description: `Tree trimming, tree removal, stump grinding, palm tree care, and cleanup in ${area.name}, ${area.region}.`,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.business },
        mainEntity: {
          "@type": "Service",
          "@id": `${pageUrl}#tree-service`,
          name: `Tree Service in ${area.name}, ${area.region}`,
          serviceType: "Tree Service",
          provider: { "@id": ids.business },
          areaServed: `${area.name}, ${area.region}`,
          hasOfferCatalog: { "@id": ids.offerCatalog },
        },
      },
    ],
  };
}
