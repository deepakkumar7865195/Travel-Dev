import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import TripPlanner from "@/components/sections/TripPlanner";
import CTABand from "@/components/sections/CTABand";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trip Planner — Build Your Perfect Journey in 5 Steps",
  description:
    "Choose your destination, dates, travellers and travel style — get an instant estimated package from TRAVEL DEV, then request a tailored quote.",
  alternates: { canonical: "/trip-planner" },
  openGraph: {
    title: "Plan Your Perfect Trip | TRAVEL DEV",
    description: "An interactive five-step planner with live pricing estimates.",
    url: `${siteConfig.url}/trip-planner`,
  },
};

export default function TripPlannerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trip planner"
        title="PLAN YOUR PERFECT TRIP"
        description="Five quick steps, one live estimate. Everything updates as you go — no forms, no waiting."
        crumbs={[{ label: "Trip Planner", href: "/trip-planner" }]}
        image="/images/misc-wing.jpg"
        imageAlt="Aircraft wing above a soft layer of clouds"
      />

      <section className="container-x py-16 md:py-20" aria-label="Interactive trip planner">
        <TripPlanner />
      </section>

      <CTABand
        eyebrow="Next step"
        title="Like what you see? Lock it in"
        description="Send your plan to our trip designers and get a confirmed quote with real hotel options within one working day."
        primary={{ label: "Request My Trip", href: "/contact" }}
        secondary={{ label: "See ready packages", href: "/packages" }}
      />
    </>
  );
}
