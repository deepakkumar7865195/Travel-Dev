export const galleryCategories = ["All", "Mountains", "Culture", "Adventure"] as const;

export type GalleryCategory = Exclude<(typeof galleryCategories)[number], "All">;

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  country: string;
  categories: GalleryCategory[];
  /** width / height — used for masonry sizing before the image loads. */
  ratio: number;
  credit: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "darjeeling-1",
    src: "/images/Darjeeling 1.jpeg",
    alt: "Hairpin road curving down a forested hillside above a wide river valley in Darjeeling",
    title: "The long way down",
    location: "Jhandu Dara Viewpoint",
    country: "Darjeeling",
    categories: ["Mountains", "Adventure"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-2",
    src: "/images/Darjeeling 2.jpeg",
    alt: "Stray dogs resting outside a small roadside shop in a Darjeeling hillside town",
    title: "Shopfront regulars",
    location: "Lal Bazaar",
    country: "Darjeeling",
    categories: ["Culture"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-3",
    src: "/images/Darjeeling 3.jpeg",
    alt: "Morning mist drifting through a hillside garden of tea bushes in Darjeeling",
    title: "Before the chai break",
    location: "Singbulli Tea Estate",
    country: "Darjeeling",
    categories: ["Mountains", "Culture"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-4",
    src: "/images/Darjeeling 4.jpeg",
    alt: "Two dogs lying in the doorway of a village shop in the Darjeeling hills",
    title: "Nobody hurries here",
    location: "Ging tea estate road",
    country: "Darjeeling",
    categories: ["Culture"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-5",
    src: "/images/Darjeeling 5.jpeg",
    alt: "Colourful Himalayan thali spread with rice, curry and bowls on a wooden table",
    title: "Lunch, Himalayan style",
    location: "Ging homestay kitchen",
    country: "Darjeeling",
    categories: ["Culture"],
    ratio: 1280 / 960,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-6",
    src: "/images/Darjeeling 6.jpeg",
    alt: "Group of friends posing together in a wood-panelled mountain lodge room",
    title: "Room 12, everyone in it",
    location: "Hill View Homestay",
    country: "Darjeeling",
    categories: ["Culture"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-7",
    src: "/images/Darjeeling 7.jpeg",
    alt: "Travelers standing on a misty viewpoint with forested ridges dropping away behind them",
    title: "Standing in the weather",
    location: "Tiger Hill trail",
    country: "Darjeeling",
    categories: ["Mountains", "Adventure"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-8",
    src: "/images/Darjeeling 8.jpeg",
    alt: "Aerial view of a river and terraced fields winding below a steep green ridge",
    title: "Below the clouds",
    location: "Teesta corridor",
    country: "Darjeeling",
    categories: ["Adventure", "Mountains"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-9",
    src: "/images/Darjeeling 9.jpeg",
    alt: "Friends checking their reflection in a mirror before heading out for the day",
    title: "Day three look",
    location: "Ging",
    country: "Darjeeling",
    categories: ["Culture"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-10",
    src: "/images/Darjeeling 10.jpeg",
    alt: "A long empty road descending through green hills toward a hazy river valley",
    title: "The quiet road out",
    location: "Siliguri corridor",
    country: "Darjeeling",
    categories: ["Adventure"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-11",
    src: "/images/Darjeeling 11.jpeg",
    alt: "Low cloud pouring over forested ridgelines above tin-roofed hillside homes",
    title: "When the hills disappear",
    location: "Jorethang ridge",
    country: "Darjeeling",
    categories: ["Mountains"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
  {
    id: "darjeeling-12",
    src: "/images/Darjeeling 12.jpeg",
    alt: "Fog threading through a garden of tall trees and prayer flags on a mountain hillside",
    title: "Prayer flags in fog",
    location: "Ging monastery path",
    country: "Darjeeling",
    categories: ["Mountains", "Culture"],
    ratio: 960 / 1280,
    credit: "TRAVEL DEV archive",
  },
];

export interface GalleryCollection {
  slug: string;
  title: string;
  count: number;
  description: string;
  cover: string;
  coverAlt: string;
  href: string;
}

export const galleryCollections: GalleryCollection[] = [
  {
    slug: "darjeeling-notes",
    title: "Darjeeling, frame by frame",
    count: 12,
    description:
      "Six unhurried days between the tea estates and Tiger Hill — shot on phones, kept for the story.",
    cover: "/images/Darjeeling 8.jpeg",
    coverAlt: "Aerial view of a river valley below a forested ridge in Darjeeling",
    href: "/gallery",
  },
  {
    slug: "island-clock",
    title: "Island clock",
    count: 21,
    description:
      "Reefs, overwater villas and a sunrise alarm that nobody resented.",
    cover: "/images/dest-maldives.jpg",
    coverAlt: "Turquoise lagoon and overwater villas in the Maldives",
    href: "/destinations",
  },
  {
    slug: "desert-and-stone",
    title: "Desert & stone",
    count: 18,
    description:
      "Fort mornings in Agra, dune nights in the Thar, and a tiger that stayed put.",
    cover: "/images/dest-rajasthan.jpg",
    coverAlt: "Hawa Mahal facade in Jaipur glowing at sunset",
    href: "/packages",
  },
  {
    slug: "city-after-dark",
    title: "City after dark",
    count: 24,
    description:
      "Rooftops, night markets and the last train — photographed between dinner and midnight.",
    cover: "/images/misc-city.jpg",
    coverAlt: "Night city street glowing with shop signs and traffic",
    href: "/experiences",
  },
];

export interface TravelerMemory {
  id: string;
  name: string;
  route: string;
  note: string;
  image: string;
  imageAlt: string;
  date: string;
  trip: string;
}

export const travelerMemories: TravelerMemory[] = [
  {
    id: "memory-1",
    name: "Ananya & Rohit",
    route: "Darjeeling → Kalimpong",
    note:
      "We almost didn't go up Tiger Hill because of the rain. Best decision we didn't make twice.",
    image: "/images/Darjeeling 11.jpeg",
    imageAlt: "Cloud pouring over forested ridges above hillside homes in Darjeeling",
    date: "September 2025",
    trip: "7 days, North Bengal",
  },
  {
    id: "memory-2",
    name: "Sneha",
    route: "Goa, off-season",
    note:
      "Six days in Goa with two of them on a scooter and one spectacular monsoon afternoon. I'd go again tomorrow.",
    image: "/images/exp-beach.jpg",
    imageAlt: "Tropical beach at sunset with waves and silhouetted palms",
    date: "August 2025",
    trip: "6 days, Konkan coast",
  },
  {
    id: "memory-3",
    name: "The Menon family",
    route: "Ranthambore → Jaipur",
    note:
      "The kids counted fifty-three vehicles on our safari drive. We count it as the highlight, not the tiger.",
    image: "/images/exp-wildlife.jpg",
    imageAlt: "Safari vehicle paused on a dirt track in a forest clearing",
    date: "October 2025",
    trip: "8 days, Rajasthan",
  },
  {
    id: "memory-4",
    name: "Imran",
    route: "Kerala backwaters",
    note:
      "A houseboat, no signal, and a cook who refused to let me help. Best four days of the year.",
    image: "/images/dest-kerala.jpg",
    imageAlt: "Houseboat cruising palm-lined Kerala backwaters",
    date: "January 2026",
    trip: "5 days, Alleppey",
  },
];

export interface InstagramTile {
  id: string;
  src: string;
  alt: string;
  caption: string;
  handle: string;
  likes: number;
}

export const instagramTiles: InstagramTile[] = [
  {
    id: "ig-1",
    src: "/images/Darjeeling 5.jpeg",
    alt: "Himalayan thali with rice, curry and bowls on a wooden table",
    caption: "Chai, then everything on a thali",
    handle: "@traveldev.in",
    likes: 1284,
  },
  {
    id: "ig-2",
    src: "/images/Darjeeling 1.jpeg",
    alt: "Hairpin road descending a forested hillside above a river valley",
    caption: "Every switchback counted",
    handle: "@traveldev.in",
    likes: 967,
  },
  {
    id: "ig-3",
    src: "/images/dest-bali.jpg",
    alt: "Bali rice terrace and palm trees at sunrise",
    caption: "Sunrise terraces in Bali",
    handle: "@traveldev.in",
    likes: 2410,
  },
  {
    id: "ig-4",
    src: "/images/Darjeeling 12.jpeg",
    alt: "Fog moving through trees and prayer flags on a hillside",
    caption: "Fog, flags, silence",
    handle: "@traveldev.in",
    likes: 812,
  },
  {
    id: "ig-5",
    src: "/images/dest-italy.jpg",
    alt: "Italian coastal town with colourful buildings above the sea",
    caption: "Five hours of walking, zero regrets",
    handle: "@traveldev.in",
    likes: 1876,
  },
  {
    id: "ig-6",
    src: "/images/Darjeeling 7.jpeg",
    alt: "Travelers on a misty viewpoint above forested ridges",
    caption: "Standing in the weather, obviously",
    handle: "@traveldev.in",
    likes: 1145,
  },
  {
    id: "ig-7",
    src: "/images/dest-japan.jpg",
    alt: "Japanese street with lanterns and a pagoda in spring",
    caption: "Kyoto in the rain",
    handle: "@traveldev.in",
    likes: 3021,
  },
  {
    id: "ig-8",
    src: "/images/misc-wave.jpg",
    alt: "Ocean wave curling under bright sunlight",
    caption: "The sea doing its thing",
    handle: "@traveldev.in",
    likes: 743,
  },
  {
    id: "ig-9",
    src: "/images/dest-kashmir.jpg",
    alt: "Shikara boat on a turquoise Himalayan lake",
    caption: "Dal Lake, no rush",
    handle: "@traveldev.in",
    likes: 2258,
  },
];

export function photosByCategory(category: GalleryCategory | "All") {
  if (category === "All") return galleryPhotos;
  return galleryPhotos.filter((p) => p.categories.includes(category));
}