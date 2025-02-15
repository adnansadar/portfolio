import Script from "next/script";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adnan Sadar",
    jobTitle: "Software Engineer",
    description: "Front-End Web Developer with expertise in React and Next.js",
    url: "https://adnansadar.com",
    sameAs: [
      "https://github.com/adnansadar",
      "https://linkedin.com/in/adnansadar",
      "https://x.com/_adnansadar_",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Front-end Development",
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
      "Redux",
    ],
    worksFor: {
      "@type": "Organization",
      name: "LitmusBlox",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "State University of New York at Buffalo",
    },
  };

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="worker"
    />
  );
}
