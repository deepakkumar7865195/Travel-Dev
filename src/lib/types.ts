export type DestinationCategory =
  | "India"
  | "Asia"
  | "Europe"
  | "Middle East"
  | "Beach"
  | "Mountains"
  | "Adventure"
  | "Luxury";

export interface Destination {
  slug: string;
  name: string;
  country: string;
  continent: string;
  categories: DestinationCategory[];
  image: string;
  imageAlt: string;
  bestTime: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  blurb: string;
  featured?: boolean;
}

export type PackageType = "Domestic" | "International";
export type TravelStyle = "Budget" | "Couple" | "Family" | "Luxury" | "Adventure";

export interface PackageDay {
  day: number;
  title: string;
  detail: string;
}

export interface TourPackage {
  slug: string;
  title: string;
  route: string;
  destination: string;
  image: string;
  imageAlt: string;
  days: number;
  nights: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  type: PackageType;
  style: TravelStyle[];
  itinerary: string[];
  includes: {
    hotel: string;
    transport: string;
    meals: string;
    activities: string;
  };
  /** Full day-by-day plan, when published. */
  plan?: PackageDay[];
  inclusions?: string[];
  exclusions?: string[];
  bestFor?: string;
  famousFor?: string;
  highlights?: string[];
  featured?: boolean;
}

export interface Experience {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  imageAlt: string;
  count: number;
}
