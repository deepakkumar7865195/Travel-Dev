export const siteConfig = {
  name: "TRAVEL DEV",
  tagline: "Let's Go",
  legalName: "Travel Dev Private Limited",
  description:
    "TRAVEL DEV is a modern travel technology company crafting unforgettable destinations, seamless travel experiences and journeys designed around you.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.traveldev.in",
  email: "hello@traveldev.in",
  phone: "+91 98300 12345",
  phoneHref: "+919830012345",
  address: {
    line1: "Level 4, Cyber Heights, Sector V",
    city: "Kolkata",
    region: "West Bengal",
    postal: "700091",
    country: "India",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "X", href: "https://x.com", icon: "twitter" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  ] as const,
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Trip Planner", href: "/trip-planner" },
  { label: "Experiences", href: "/experiences" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
