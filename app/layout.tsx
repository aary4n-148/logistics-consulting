import type { Metadata, Viewport } from "next";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PostHogProvider from "./components/PostHogProvider";

const SITE_URL = "https://mapxlogistics.com";
const SITE_NAME = "MapxLogistics";
const SITE_DESCRIPTION =
  "Expert logistics consulting for Amazon DSP operations, Relay freight, FBA sellers, parcel shipping optimization, transportation networks, and warehouse management.";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Amazon DSP, Relay, FBA & Supply Chain Consulting`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Amazon DSP consulting",
    "Amazon Relay freight",
    "Amazon FBA consulting",
    "parcel shipping optimization",
    "transportation network design",
    "warehouse management systems",
    "supply chain consulting",
    "logistics optimization",
    "fleet management",
    "route optimization",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} | Amazon DSP, Relay, FBA & Supply Chain Consulting`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Precision Logistics, Maximum Efficiency`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Amazon DSP, Relay, FBA & Supply Chain Consulting`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
};

const services = [
  {
    name: "Amazon DSP Logistics",
    description:
      "End-to-end operational support for Delivery Service Partners.",
  },
  {
    name: "Amazon Relay & Freight",
    description: "Middle mile optimization and fleet strategy.",
  },
  {
    name: "Amazon FBA",
    description: "Marketplace growth and inventory planning.",
  },
  {
    name: "Parcel Shipping B2C",
    description: "Carrier rate negotiation and delivery optimization.",
  },
  {
    name: "Transportation Network",
    description: "Network topology design and route engineering.",
  },
  {
    name: "Warehouse & Inventory",
    description: "WMS integration and inventory accuracy.",
  },
];

const faqs = [
  {
    question: "What is Amazon DSP consulting?",
    answer:
      "Amazon DSP consulting helps Delivery Service Partners optimize fleet operations, improve scorecard performance, and maximize profitability.",
  },
  {
    question: "How can logistics consulting improve my Amazon Relay operations?",
    answer:
      "Our Relay consulting covers authority setup, compliance, DOT audit preparation, and contract negotiation to stabilize revenue.",
  },
  {
    question: "What services do you offer for Amazon FBA sellers?",
    answer:
      "We provide FBA consulting including listing optimization, inventory planning, account health protection, and reverse logistics.",
  },
  {
    question: "What does a free strategy call include?",
    answer:
      "A 30-minute analysis of your operations, identification of improvement opportunities, and a customized optimization roadmap.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: "info@mapxlogistics.com",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      email: "info@mapxlogistics.com",
      areaServed: { "@type": "Country", name: "United States" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Logistics Consulting Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
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
      <body
        className={`${spaceMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
