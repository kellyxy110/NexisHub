export const siteBase = "https://nexishub.vercel.app";

export const entityIds = {
  organization: `${siteBase}/#organization`,
  website: `${siteBase}/#website`,
  editorial: `${siteBase}/#editorial`,
  founder: `${siteBase}/about#founder`,
  research: `${siteBase}/research#research`,
} as const;

export const nexishubOrganization = {
  "@type": "Organization",
  "@id": entityIds.organization,
  name: "NexisHub",
  description: "NexisHub builds intelligent software that helps people work, learn, create, organize, and make better decisions through AI.",
  url: siteBase,
  logo: `${siteBase}/icon.svg`,
  founder: { "@id": entityIds.founder },
};

export const nexishubWebsite = {
  "@type": "WebSite",
  "@id": entityIds.website,
  name: "NexisHub",
  url: siteBase,
  publisher: { "@id": entityIds.organization },
};

export const nexishubFounder = {
  "@type": "Person",
  "@id": entityIds.founder,
  name: "Ekeleme Kelechi David",
  jobTitle: "Founder",
  url: `${siteBase}/about`,
  image: `${siteBase}/images/founder.jpeg`,
  worksFor: { "@id": entityIds.organization },
};

export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
