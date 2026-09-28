import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InvertedCursor from "@/components/InvertedCursor";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  keywords: [
    "front-end developer",
    "graphic designer",
    "UI/UX design",
    "publication design",
    "Next.js",
    "portfolio",
    "Canva designer",
    "Philippines",
    siteConfig.author.name,
  ],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "portfolio",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
};

/** Person + WebSite structured data for rich search results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: siteConfig.author.name,
      alternateName: siteConfig.name,
      jobTitle: siteConfig.author.jobTitle,
      description: siteConfig.description,
      url: siteConfig.url,
      email: `mailto:${siteConfig.contact.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Antipolo City",
        addressRegion: "Rizal",
        addressCountry: "PH",
      },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: siteConfig.author.affiliation,
      },
      sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
      knowsAbout: [
        "Front-end Development",
        "UI/UX Design",
        "Publication Design",
        "Canva",
        "Figma",
        "Next.js",
      ],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": absoluteUrl("/#person") },
    },
    {
      "@type": "ProfessionalService",
      "@id": absoluteUrl("/#service"),
      name: `${siteConfig.name} — Design & Development`,
      description:
        "Front-end development, UI/UX design, and publication design. Visual assets are provided on request via Gmail or Canva.",
      provider: { "@id": absoluteUrl("/#person") },
      areaServed: "PH",
      availableChannel: [
        {
          "@type": "ServiceChannel",
          serviceLocation: { "@type": "Place", name: "Remote" },
          servicePhone: siteConfig.contact.phone,
          serviceUrl: absoluteUrl("/#contact"),
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
        {/* Preconnect to the font CDN to cut render-blocking latency. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <InvertedCursor />
        {/* Accessibility: let keyboard users bypass the icon nav. */}
        <a href="#home" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          {/* The floating nav no longer takes layout space; pages own their spacing. */}
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
