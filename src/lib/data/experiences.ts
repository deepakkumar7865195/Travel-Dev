import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    slug: "mountain-adventures",
    title: "Mountain Adventures",
    kicker: "Altitude",
    description:
      "Ridge-line treks, gondola rides and glacier mornings for travellers who chase the horizon upward.",
    image: "/images/exp-mountains.jpg",
    imageAlt: "Snow-covered mountain peaks lit by alpenglow",
    count: 24,
  },
  {
    slug: "beach-escapes",
    title: "Beach Escapes",
    kicker: "Salt",
    description:
      "Barefoot mornings, reef snorkelling and slow sunsets on coastlines chosen for their calm.",
    image: "/images/exp-beach.jpg",
    imageAlt: "Gentle waves rolling onto a quiet tropical beach at sunrise",
    count: 18,
  },
  {
    slug: "cultural-journeys",
    title: "Cultural Journeys",
    kicker: "Stories",
    description:
      "Lantern-lit lanes, temple rituals and local kitchens that explain a place better than any guidebook.",
    image: "/images/exp-culture.jpg",
    imageAlt: "Traditional pagoda-lined street in Kyoto during autumn",
    count: 21,
  },
  {
    slug: "wildlife",
    title: "Wildlife",
    kicker: "Wild",
    description:
      "Great migrations, canopy safaris and guided tracking with guides who read the forest like a map.",
    image: "/images/exp-wildlife.jpg",
    imageAlt: "Elephant emerging from deep green jungle foliage",
    count: 12,
  },
  {
    slug: "luxury-holidays",
    title: "Luxury Holidays",
    kicker: "Signature",
    description:
      "Design hotels, private transfers and itineraries with every seam quietly smoothed away.",
    image: "/images/exp-luxury.jpg",
    imageAlt: "Contemporary luxury resort glowing beside still water at dusk",
    count: 16,
  },
  {
    slug: "honeymoon",
    title: "Honeymoon",
    kicker: "Two",
    description:
      "Overwater villas, private dinners and slow itineraries built around doing very little, beautifully.",
    image: "/images/exp-honeymoon.jpg",
    imageAlt: "Overwater villas stretching into a bright Maldivian lagoon",
    count: 14,
  },
  {
    slug: "family-trips",
    title: "Family Trips",
    kicker: "Together",
    description:
      "Right-paced days, connecting rooms and experiences that work for eight-year-olds and eighty-year-olds.",
    image: "/images/exp-family.jpg",
    imageAlt: "Palm-lined resort pool overlooking the ocean, ideal for families",
    count: 19,
  },
  {
    slug: "weekend-getaways",
    title: "Weekend Getaways",
    kicker: "48 Hours",
    description:
      "Short-haul resets planned door to door, so Friday evening to Sunday night never wastes a minute.",
    image: "/images/exp-weekend.jpg",
    imageAlt: "Waterfall dropping into a hidden jungle pool",
    count: 27,
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
