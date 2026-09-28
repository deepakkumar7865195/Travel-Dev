import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { siteConfig } from "@/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Template from "./template";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const ogImage = `${siteConfig.url}/og-cover.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "TRAVEL DEV — Premium Journeys, Designed Around You | Let's Go",
    template: "%s | TRAVEL DEV",
  },
  description: siteConfig.description,
  keywords: [
    "travel agency",
    "tour packages from Kolkata",
    "holiday packages",
    "Kerala tour",
    "Kashmir package",
    "international holidays",
    "TRAVEL DEV",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  category: "travel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "TRAVEL DEV — Your Journey Starts Here",
    description: siteConfig.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "TRAVEL DEV" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRAVEL DEV — Your Journey Starts Here",
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0B2942",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      slogan: siteConfig.tagline,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/images/logo.png` },
      image: `${siteConfig.url}/images/logo.png`,
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phoneHref,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.line1,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postal,
        addressCountry: "IN",
      },
      sameAs: siteConfig.socials.map((s) => s.href),
      areaServed: "Worldwide",
      priceRange: "₹₹₹",
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("td-seen")){document.documentElement.setAttribute("data-seen","1")}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <ScrollProgress />
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <main id="main-content">
          <Template>{children}</Template>
        </main>
        <Footer />
      </body>
    </html>
  );
}
