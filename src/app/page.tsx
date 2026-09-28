import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import FeaturedPackage from "@/components/sections/FeaturedPackage";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import WhyBand from "@/components/sections/WhyBand";
import ExperiencePreview from "@/components/sections/ExperiencePreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABand from "@/components/sections/CTABand";
import { destinations } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "TRAVEL DEV — Premium Journeys, Designed Around You",
  description:
    "Discover unforgettable destinations, seamless travel experiences and journeys designed around you. Plan trips from Kolkata to Kashmir, Kerala, Bali, Santorini and beyond.",
  alternates: { canonical: "/" },
};

const marqueeItems = [
  ...destinations.slice(0, 10).map((d) => d.name),
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-y border-navy/10 bg-white">
        <div className="container-x">
          <Marquee items={marqueeItems} />
        </div>
      </div>

      <FeaturedPackage />
      <FeaturedPackages />
      <WhyBand />
      <ExperiencePreview />
      <Testimonials />
      <CTABand />
    </>
  );
}
