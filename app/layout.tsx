import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "MapxLogistics | Supply Chain & DSP Consulting",
  description:
    "Premium supply chain consulting for Last Mile, Middle Mile, and E-commerce operations. Optimize your fleet, reduce costs, and scale efficiently with MapxLogistics.",
  keywords: [
    "supply chain consulting",
    "DSP consulting",
    "last mile operations",
    "freight optimization",
    "FBA consulting",
    "fleet management",
  ],
  openGraph: {
    title: "MapxLogistics | Supply Chain & DSP Consulting",
    description:
      "Premium supply chain consulting for Last Mile, Middle Mile, and E-commerce operations.",
    url: "https://mapxlogistics.com",
    siteName: "MapxLogistics",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MapxLogistics | Supply Chain & DSP Consulting",
    description:
      "Premium supply chain consulting for Last Mile, Middle Mile, and E-commerce operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://mapxlogistics.com/#service",
      name: "MapxLogistics",
      description:
        "Premium supply chain and DSP consulting services specializing in Last Mile, Middle Mile, and E-commerce operations.",
      url: "https://mapxlogistics.com",
      serviceType: ["Supply Chain Consulting", "DSP Consulting", "Freight Optimization"],
      areaServed: "Worldwide",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://mapxlogistics.com/#business",
      name: "MapxLogistics",
      description: "Supply Chain & DSP Consulting Firm",
      url: "https://mapxlogistics.com",
      priceRange: "$$$",
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
