export const siteConfig = {
  name: "TRAVEL DEV",
  tagline: "Let's Go",
  legalName: "Travel Dev Private Limited",
  description:
    "TRAVEL DEV is a modern travel technology company crafting unforgettable destinations, seamless travel experiences and journeys designed around you.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.traveldev.in",
  email: "Traveldev347@gmail.com",
  phone: "8709394023",
  phoneHref: "+918709394023",
  phones: [
    { label: "8709394023", href: "+918709394023" },
    { label: "8272956267", href: "+918272956267" },
  ],
  address: {
    line1: "Mohana Apartment, Holding No. 235, Gouri Nath Shastri Sarani",
    city: "Kolkata",
    region: "West Bengal",
    postal: "700055",
    country: "India",
  },
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/Viraldev23/", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com/traveldev.in/", icon: "instagram" },
  ] as const,
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
