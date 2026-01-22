import Script from "next/script"

// Base website URL
const SITE_URL = "https://six1five.dev"

// Organization schema for the homepage
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Six1Five Devs",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      "Developer brand building in public. Shipping real tools like SubSense and AppPilot.",
    sameAs: [
      "https://twitter.com/six1five",
      "https://github.com/six1five",
    ],
    founder: {
      "@type": "Person",
      name: "Six1Five",
    },
  }

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Website schema for the homepage
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Six1Five Devs",
    url: SITE_URL,
    description:
      "Build. Ship. Document. Developer brand building in public.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Article schema for blog posts, guides, and labs
export interface ArticleJsonLdProps {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  url: string
  image?: string
  tags?: string[]
}

export function ArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  url,
  image,
  tags = [],
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    url: `${SITE_URL}${url}`,
    image: image || `${SITE_URL}/og-image.png`,
    author: {
      "@type": "Person",
      name: "Six1Five",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Six1Five Devs",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${url}`,
    },
    keywords: tags.join(", "),
  }

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb schema for navigation
export interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Software Application schema for tools
export interface SoftwareJsonLdProps {
  name: string
  description: string
  url: string
  image?: string
  applicationCategory?: string
  operatingSystem?: string
}

export function SoftwareJsonLd({
  name,
  description,
  url,
  image,
  applicationCategory = "DeveloperApplication",
  operatingSystem = "Web",
}: SoftwareJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    url: url,
    image: image || `${SITE_URL}/og-image.png`,
    applicationCategory: applicationCategory,
    operatingSystem: operatingSystem,
    author: {
      "@type": "Organization",
      name: "Six1Five Devs",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <Script
      id="software-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
