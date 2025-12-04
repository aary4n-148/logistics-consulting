import type { Metadata, Viewport } from "next";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mapxlogistics.com"),
  title: {
    default: "MapxLogistics | Amazon DSP, Relay, FBA & Supply Chain Consulting",
    template: "%s | MapxLogistics",
  },
  description:
    "Expert logistics consulting for Amazon DSP operations, Relay freight, FBA sellers, parcel shipping optimization, transportation networks, and warehouse management. End-to-end supply chain solutions.",
  keywords: [
    "Amazon DSP consulting",
    "Amazon DSP operations",
    "DSP scorecard optimization",
    "Amazon Relay freight",
    "Amazon middle mile",
    "Amazon FBA consulting",
    "FBA inventory management",
    "parcel shipping optimization",
    "carrier rate negotiation",
    "transportation network design",
    "route optimization",
    "warehouse management systems",
    "WMS implementation",
    "supply chain consulting",
    "last mile operations",
    "fleet management",
    "DOT audit preparation",
    "BASIC score repair",
    "logistics optimization",
    "supply chain management",
    "freight consulting",
    "delivery service partner",
    "Amazon seller consulting",
  ],
  authors: [{ name: "MapxLogistics", url: "https://mapxlogistics.com" }],
  creator: "MapxLogistics",
  publisher: "MapxLogistics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Business",
  classification: "Logistics Consulting Services",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: "MapxLogistics | Amazon DSP, Relay, FBA & Supply Chain Consulting",
    description:
      "Expert logistics consulting for Amazon DSP operations, Relay freight, FBA sellers, parcel shipping, transportation networks, and warehouse management.",
    url: "https://mapxlogistics.com",
    siteName: "MapxLogistics",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "MapxLogistics - Precision Logistics, Maximum Efficiency",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MapxLogistics | Amazon DSP, Relay, FBA & Supply Chain Consulting",
    description:
      "Expert logistics consulting for Amazon DSP operations, Relay freight, FBA sellers, parcel shipping, transportation networks, and warehouse management.",
    images: ["/og-image.svg"],
    creator: "@mapxlogistics",
    site: "@mapxlogistics",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mapxlogistics.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MapxLogistics",
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://mapxlogistics.com/#website",
      url: "https://mapxlogistics.com",
      name: "MapxLogistics",
      description: "Expert logistics consulting for Amazon DSP operations, Relay freight, FBA sellers, and supply chain optimization.",
      publisher: { "@id": "https://mapxlogistics.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://mapxlogistics.com/?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": "https://mapxlogistics.com/#webpage",
      url: "https://mapxlogistics.com",
      name: "MapxLogistics | Amazon DSP, Relay, FBA & Supply Chain Consulting",
      description: "Expert logistics consulting for Amazon DSP operations, Relay freight, FBA sellers, parcel shipping optimization, transportation networks, and warehouse management.",
      isPartOf: { "@id": "https://mapxlogistics.com/#website" },
      about: { "@id": "https://mapxlogistics.com/#organization" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": "https://mapxlogistics.com/#primaryimage",
        url: "https://mapxlogistics.com/og-image.svg",
        width: 1200,
        height: 630,
      },
      datePublished: "2024-01-01T00:00:00+00:00",
      dateModified: new Date().toISOString(),
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://mapxlogistics.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://mapxlogistics.com",
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://mapxlogistics.com/#service",
      name: "MapxLogistics",
      alternateName: "MAPxLOGISTICS",
      description:
        "Expert logistics consulting for Amazon DSP operations, Relay freight, FBA sellers, parcel shipping optimization, transportation networks, and warehouse management.",
      url: "https://mapxlogistics.com",
      email: "hello@mapxlogistics.com",
      serviceType: [
        "Amazon DSP Logistics Consulting",
        "Amazon Relay & Freight Consulting",
        "Amazon FBA Consulting",
        "Parcel Shipping B2C Optimization",
        "Transportation Network Design",
        "Warehouse Inventory & Control",
      ],
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      priceRange: "$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Logistics Consulting Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Amazon DSP Logistics",
              description: "End-to-end operational support for Delivery Service Partners including acquisition, scorecard optimization, and crisis management.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Amazon Relay & Freight",
              description: "Middle mile optimization including relay onboarding, safety compliance, and fleet strategy.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Amazon FBA",
              description: "Marketplace growth, inventory planning, and brand protection for Amazon sellers.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Parcel Shipping B2C Performance",
              description: "Merchant fulfilled optimization, carrier rate negotiation, and delivery speed improvement.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Transportation Network Optimization",
              description: "Network topology design, route engineering, and linehaul management.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Warehouse Inventory & Control",
              description: "WMS integration, workflow design, and inventory accuracy protocols.",
            },
          },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": "https://mapxlogistics.com/#organization",
      name: "MapxLogistics",
      alternateName: "MAPxLOGISTICS",
      description: "Supply Chain & Logistics Consulting Firm",
      url: "https://mapxlogistics.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://mapxlogistics.com/#logo",
        url: "https://mapxlogistics.com/logo.svg",
        width: 512,
        height: 512,
        caption: "MapxLogistics Logo",
      },
      image: { "@id": "https://mapxlogistics.com/#logo" },
      email: "hello@mapxlogistics.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@mapxlogistics.com",
        availableLanguage: "English",
      },
      sameAs: [],
      knowsAbout: [
        "Amazon DSP Operations",
        "Amazon Relay",
        "Amazon FBA",
        "Supply Chain Management",
        "Freight Logistics",
        "Warehouse Management",
        "Last Mile Delivery",
        "Middle Mile Operations",
        "Fleet Management",
        "Route Optimization",
        "Inventory Management",
        "Carrier Rate Negotiation",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://mapxlogistics.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Amazon DSP consulting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Amazon DSP consulting helps Delivery Service Partners optimize their fleet operations, improve scorecard performance to achieve Fantastic Plus ratings, and maximize profitability through data-driven strategies and compliance management.",
          },
        },
        {
          "@type": "Question",
          name: "How can logistics consulting improve my Amazon Relay operations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our Relay consulting covers authority setup, Amazon compliance, tender strategies to reduce deadhead miles, DOT audit preparation, ELD monitoring, BASIC score repair, and dedicated contract negotiation to stabilize revenue.",
          },
        },
        {
          "@type": "Question",
          name: "What services do you offer for Amazon FBA sellers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide comprehensive FBA consulting including Seller Central SEO, listing optimization, PPC strategies, FBA margin analysis, restock limit forecasting, peak season preparation, account health protection, and reverse logistics management.",
          },
        },
        {
          "@type": "Question",
          name: "How do you optimize parcel shipping for e-commerce businesses?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We optimize parcel shipping through carrier rate negotiation with FedEx, UPS, and regional carriers, Amazon MFN strategy development, and delivery speed optimization to improve click-to-door times and customer satisfaction.",
          },
        },
        {
          "@type": "Question",
          name: "What does a free strategy call include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our free 30-minute strategy call includes an analysis of your current operations, identification of immediate improvement opportunities, and a customized roadmap for optimizing your logistics and supply chain performance.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceMono.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
