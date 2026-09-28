import type { TourPackage } from "@/lib/types";

export const packages: TourPackage[] = [
  {
    slug: "kolkata-to-kashmir",
    title: "Kashmir Lakes & Valleys",
    route: "Kolkata to Kashmir",
    destination: "Srinagar · Gulmarg · Pahalgam",
    image: "/images/pkg-kashmir.jpg",
    imageAlt: "Hiker looking across a glassy Kashmiri mountain lake",
    days: 6,
    nights: 5,
    price: 23999,
    originalPrice: 28999,
    rating: 4.9,
    reviews: 263,
    type: "Domestic",
    style: ["Couple", "Luxury", "Family"],
    itinerary: ["Shikara check-in on Dal Lake", "Gulmarg gondola & meadows", "Pine valley & saffron fields", "Pahalgam betaab valley", "Mughal gardens & old bazaar", "Departure"],
    includes: {
      hotel: "Houseboat + 4★ valley stays",
      transport: "Flights + private cab",
      meals: "Daily breakfast + 2 wazwan dinners",
      activities: "Shikara, gondola, valley excursions",
    },
    bestFor: "Honeymooners, families and first-time visitors",
    famousFor: "Dal Lake shikara, Gondola ride, Betaab Valley",
    highlights: ["Shikara ride", "Gondola at Gulmarg", "Betaab Valley", "Mughal gardens"],
    plan: [
      {
        day: 1,
        title: "Srinagar arrival — Dal Lake shikara",
        detail:
          "Meet at Srinagar airport and transfer to your houseboat or hotel. Evening shikara ride across Dal Lake through the floating gardens. Overnight in Srinagar.",
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg — Gondola ride",
        detail:
          "Drive to Gulmarg through pine forest. Ride the gondola to the first or second phase for snow views, then return to Srinagar by evening. Overnight in Srinagar.",
      },
      {
        day: 3,
        title: "Srinagar to Pahalgam — Aru & Betaab Valley",
        detail:
          "Full day in Pahalgam: Aru Valley, Betaab Valley and Chandanwari. En route stop at saffron fields and the Lidder river. Overnight in Pahalgam.",
      },
      {
        day: 4,
        title: "Pahalgam to Sonmarg — Thajiwas Glacier",
        detail:
          "Drive to Sonmarg via Srinagar through the Sindh valley. Walk to Thajiwas Glacier for the afternoon, then continue to Srinagar. Overnight in Srinagar.",
      },
      {
        day: 5,
        title: "Srinagar local — Mughal Gardens",
        detail:
          "Nishat Bagh, Shalimar Bagh, Chashme Shahi and the Shankaracharya Temple. Afternoon free for old bazaar shopping. Overnight in Srinagar.",
      },
      {
        day: 6,
        title: "Srinagar — airport drop",
        detail:
          "Breakfast at the hotel, then transfer to Srinagar airport for your onward journey.",
      },
    ],
    inclusions: [
      "1 night on a Dal Lake houseboat + 4★ hotels",
      "Return flights and private cab throughout",
      "Daily breakfast plus 2 dinners",
      "Shikara ride and all valley transfers",
      "Toll, parking and driver allowance",
    ],
    exclusions: [
      "Gondola cable-car tickets (subject to availability)",
      "Lunch unless mentioned",
      "Entry fees, permits and personal expenses",
      "Anything not listed under inclusions",
    ],
  },
  {
    slug: "darjeeling-gangtok-hills",
    title: "Darjeeling & Gangtok Hills",
    route: "Kolkata to Darjeeling & Gangtok",
    destination: "Darjeeling · Gangtok",
    image: "/images/dest-darjeeling.jpg",
    imageAlt: "Toy train line threading through the pine hills above Darjeeling",
    days: 6,
    nights: 5,
    price: 22999,
    originalPrice: 26499,
    rating: 4.8,
    reviews: 168,
    type: "Domestic",
    style: ["Family", "Couple", "Adventure"],
    itinerary: [
      "NJP to Darjeeling via Teesta",
      "Tiger Hill sunrise, Batasia Loop & tea garden",
      "Drive to Gangtok via Teesta river",
      "Tsomgo Lake & Baba Mandir",
      "Gangtok local sightseeing",
      "Drop to NJP",
    ],
    includes: {
      hotel: "3★ / 4★ stays with breakfast & dinner",
      transport: "Private AC cab for all days",
      meals: "Breakfast + dinner daily (MAP)",
      activities: "Tiger Hill, Tsomgo Lake, monastery circuit",
    },
    bestFor: "Bengal bestseller — families and first-timers",
    famousFor: "Tiger Hill sunrise, Tsomgo Lake, MG Marg",
    highlights: ["Tiger Hill sunrise", "Batasia Loop", "Tsomgo Lake 12,400 ft", "MG Marg"],
    plan: [
      {
        day: 1,
        title: "NJP to Darjeeling (75 km)",
        detail:
          "Morning pickup from NJP / Siliguri station. Scenic drive to Darjeeling along the Teesta river. Evening free at Mall Road. Overnight in Darjeeling.",
      },
      {
        day: 2,
        title: "Darjeeling full sightseeing",
        detail:
          "Early morning Tiger Hill sunrise, Batasia Loop and Ghoom Monastery. After breakfast: Himalayan Zoo, Tenzing Rock, Tea Garden and Japanese Temple. Overnight in Darjeeling.",
      },
      {
        day: 3,
        title: "Darjeeling to Gangtok (100 km)",
        detail:
          "After breakfast, drive to Gangtok via the Teesta river road. Evening at leisure on MG Marg. Overnight in Gangtok.",
      },
      {
        day: 4,
        title: "Tsomgo Lake + Baba Mandir excursion",
        detail:
          "Full day trip to Changu (Tsomgo) Lake at 12,400 ft and Baba Harbhajan Mandir. Nathula Pass can be added at extra cost (permit subject to availability). Overnight in Gangtok.",
      },
      {
        day: 5,
        title: "Gangtok local sightseeing",
        detail:
          "Rumtek Monastery, ropeway, Ganesh Tok and Flower Show. Evening free for local shopping. Overnight in Gangtok.",
      },
      {
        day: 6,
        title: "Gangtok to NJP drop",
        detail:
          "After breakfast, transfer to NJP / Bagdogra for your return journey.",
      },
    ],
    inclusions: [
      "3★ / 4★ hotels with breakfast and dinner",
      "Private AC cab for all transfers and sightseeing",
      "All toll, parking and driver allowance",
      "Sightseeing exactly as per the itinerary",
    ],
    exclusions: [
      "Train / flight tickets",
      "Lunch",
      "Nathula Permit fee and entry tickets",
      "Personal expenses, tips and anything not listed above",
    ],
  },
  {
    slug: "dubai-explorer",
    title: "Dubai Explorer — 4N / 5D",
    route: "Kolkata to Dubai",
    destination: "Dubai",
    image: "/images/dest-dubai.jpg",
    imageAlt: "City skyline and river seen from above at golden hour",
    days: 5,
    nights: 4,
    price: 29999,
    originalPrice: 34999,
    rating: 4.7,
    reviews: 124,
    type: "International",
    style: ["Luxury", "Couple", "Family"],
    itinerary: [
      "Arrival + Marina dhow cruise",
      "City tour & Burj Khalifa top floor",
      "Desert safari with BBQ",
      "Abu Dhabi — mosque & Ferrari World",
      "Return",
    ],
    includes: {
      hotel: "4★ Dubai stays with breakfast",
      transport: "Return flights + all transfers",
      meals: "Daily breakfast, 2 dinners (cruise + safari BBQ)",
      activities: "Dhow cruise, Burj Khalifa 124th, desert safari",
    },
    bestFor: "NRI families and short-break travellers",
    famousFor: "Burj Khalifa, desert safari, Marina dhow cruise",
    highlights: ["Marina dhow cruise", "Burj Khalifa 124th", "Desert safari", "Sheikh Zayed Mosque"],
    plan: [
      {
        day: 1,
        title: "Kolkata to Dubai — Marina dhow cruise",
        detail:
          "Arrive Dubai, meet at the airport and transfer to your hotel. Evening board a Marina dhow cruise with dinner and live entertainment. Overnight in Dubai.",
      },
      {
        day: 2,
        title: "Half-day city tour + Burj Khalifa",
        detail:
          "Dubai Frame, Gold Souk, Jumeirah beach and a photo stop at Burj Al Arab. Evening: Burj Khalifa 124th floor and the Dubai Mall fountain show. Overnight in Dubai.",
      },
      {
        day: 3,
        title: "Desert safari with BBQ dinner",
        detail:
          "Morning free for Miracle Garden. Afternoon desert safari with dune bashing, camel ride, henna and a BBQ dinner with belly dance. Overnight in Dubai.",
      },
      {
        day: 4,
        title: "Abu Dhabi — Sheikh Zayed Mosque & Ferrari World",
        detail:
          "Full day in Abu Dhabi: Sheikh Zayed Grand Mosque, Louvre Abu Dhabi and Yas Island with entry to Ferrari World. Overnight in Dubai.",
      },
      {
        day: 5,
        title: "Return to Kolkata",
        detail:
          "Breakfast, then free time for last-minute shopping at Meena Bazaar before airport transfer for your flight home.",
      },
    ],
    inclusions: [
      "Return economy flights Kolkata–Dubai",
      "4★ hotels with daily breakfast",
      "Marina dhow cruise dinner + desert safari BBQ",
      "All airport transfers and sightseeing by coach",
      "Visa assistance and travel insurance",
    ],
    exclusions: [
      "Lunch unless mentioned",
      "Optional activities and entry fees not listed",
      "Nol card, tips and personal expenses",
      "Anything not mentioned under inclusions",
    ],
  },
  {
    slug: "thailand-phuket-krabi-bangkok",
    title: "Thailand — Phuket, Krabi & Bangkok",
    route: "Kolkata to Thailand",
    destination: "Phuket · Krabi · Bangkok",
    image: "/images/dest-vietnam.jpg",
    imageAlt: "Turquoise bay ringed by limestone cliffs and longtail boats in Thailand",
    days: 7,
    nights: 6,
    price: 34999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 212,
    type: "International",
    style: ["Couple", "Adventure", "Family"],
    itinerary: [
      "Kolkata to Phuket, Patong evening",
      "Phi Phi Island speedboat tour",
      "Phuket to Krabi, Ao Nang",
      "4 Island tour by speedboat",
      "Krabi to Bangkok, dinner cruise",
      "Bangkok city tour",
      "Return to Kolkata",
    ],
    includes: {
      hotel: "4★ stays with breakfast",
      transport: "Return flights + 1 domestic sector",
      meals: "Daily breakfast + 2 dinners",
      activities: "Phi Phi, 4 Island, desert-free city tour",
    },
    bestFor: "Couples, Friends",
    famousFor: "Beaches + Nightlife",
    highlights: [
      "Patong Beach",
      "Phi Phi Island",
      "James Bond Island",
      "Big Buddha",
      "Tiger Cave Temple",
      "Bangkok City Temple",
      "Safari World",
    ],
    plan: [
      {
        day: 1,
        title: "Kolkata to Phuket — arrival",
        detail:
          "Fly into Phuket and transfer to Patong. Evening at Patong Beach and Bangla Walking Street. Overnight in Phuket.",
      },
      {
        day: 2,
        title: "Phi Phi Island tour by speedboat",
        detail:
          "Full day speedboat to Phi Phi Island: Maya Bay, Viking Cave and snorkelling stops, with lunch on the island. Overnight in Phuket.",
      },
      {
        day: 3,
        title: "Phuket to Krabi",
        detail:
          "Drive to Krabi (about 3 hours). Evening at Ao Nang Beach and the Krabi night market. Overnight in Krabi.",
      },
      {
        day: 4,
        title: "4 Island tour — Krabi",
        detail:
          "Speedboat to Tup Island, Chicken Island, Poda Island and Phra Nang Cave Beach with snorkelling. Overnight in Krabi.",
      },
      {
        day: 5,
        title: "Krabi to Bangkok",
        detail:
          "Short flight to Bangkok. Evening at Asiatique Riverfront followed by a Chao Phraya dinner cruise. Overnight in Bangkok.",
      },
      {
        day: 6,
        title: "Bangkok city tour",
        detail:
          "Grand Palace, Wat Arun, Wat Pho, Gems Gallery and Indra Market shopping. Overnight in Bangkok.",
      },
      {
        day: 7,
        title: "Return to Kolkata",
        detail:
          "Breakfast and airport transfer for your flight back to Kolkata.",
      },
    ],
    inclusions: [
      "Return flights Kolkata–Bangkok–Phuket (and Krabi–Bangkok)",
      "4★ hotels with daily breakfast",
      "Phi Phi and 4 Island speedboat tours",
      "All airport transfers and city sightseeing",
      "Thailand visa assistance",
    ],
    exclusions: [
      "Lunch and dinners unless mentioned",
      "Island national park fees",
      "Optional tours, water sports and tips",
      "Personal expenses and shopping",
    ],
  },
  {
    slug: "bali-ubud-kuta-nusa-penida",
    title: "Bali — Ubud, Kuta & Nusa Penida",
    route: "Kolkata to Bali",
    destination: "Ubud · Kuta · Nusa Penida",
    image: "/images/dest-bali.jpg",
    imageAlt: "Terraced rice fields and palms in the Ubud highlands of Bali",
    days: 6,
    nights: 5,
    price: 32999,
    originalPrice: 37999,
    rating: 4.9,
    reviews: 186,
    type: "International",
    style: ["Couple", "Luxury", "Family"],
    itinerary: [
      "Arrival, Kuta + Tanah Lot sunset",
      "South Bali tour + Jimbaran dinner",
      "Kintamani, Bali Swing & Ubud",
      "Nusa Penida day trip",
      "Water sports + Kuta shopping",
      "Return",
    ],
    includes: {
      hotel: "4★ resorts with breakfast",
      transport: "Return flights + private car",
      meals: "Daily breakfast + Jimbaran dinner",
      activities: "Tanah Lot, Bali Swing, Nusa Penida",
    },
    bestFor: "Honeymoon",
    famousFor: "Volcano, Waterfalls, Bali Swing",
    highlights: [
      "Tanah Lot",
      "Uluwatu Temple",
      "Ubud Monkey Forest",
      "Tegallalang Rice Terrace",
      "Kintamani Volcano",
      "Kelingking Beach",
      "Waterblow",
    ],
    plan: [
      {
        day: 1,
        title: "Kolkata to Bali — arrival",
        detail:
          "Arrive Denpasar and transfer to Kuta. Evening at Kuta Beach followed by the Tanah Lot sunset. Overnight in Kuta.",
      },
      {
        day: 2,
        title: "South Bali tour",
        detail:
          "Waterblow, Uluwatu Temple, Padang Padang Beach and a seafood dinner at Jimbaran Beach. Overnight in Kuta.",
      },
      {
        day: 3,
        title: "Kintamani + Ubud tour",
        detail:
          "Bali Swing, Tegallalang Rice Terrace, a coffee plantation, Tegenungan Waterfall and the Ubud Monkey Forest. Overnight in Ubud.",
      },
      {
        day: 4,
        title: "Nusa Penida day trip",
        detail:
          "Speedboat to Nusa Penida for Kelingking Beach, Broken Beach, Angel's Billabong and Diamond Beach. Overnight in Ubud.",
      },
      {
        day: 5,
        title: "Water sports + shopping",
        detail:
          "Jet ski, parasailing and banana boat at Tanjung Benoa. Evening free for Kuta shopping. Overnight in Kuta.",
      },
      {
        day: 6,
        title: "Return",
        detail:
          "Breakfast, then transfer to Denpasar airport for your flight back to Kolkata.",
      },
    ],
    inclusions: [
      "Return flights Kolkata–Bali",
      "4★ resorts with daily breakfast",
      "Private air-conditioned car with driver",
      "Nusa Penida fast boat and all transfers",
      "Jimbaran beach dinner",
    ],
    exclusions: [
      "Bali visa on arrival fee",
      "Lunch unless mentioned",
      "Water sports beyond the listed inclusions",
      "Tips, personal expenses and shopping",
    ],
  },
  {
    slug: "vietnam-discovery",
    title: "Vietnam Discovery — Hanoi to Ho Chi Minh",
    route: "Kolkata to Vietnam",
    destination: "Hanoi · Halong · Da Nang · Ho Chi Minh",
    image: "/images/dest-thailand.jpg",
    imageAlt: "Karst limestone hills rising behind a village in northern Vietnam",
    days: 8,
    nights: 7,
    price: 44999,
    originalPrice: 49999,
    rating: 4.8,
    reviews: 142,
    type: "International",
    style: ["Family", "Adventure", "Couple"],
    itinerary: [
      "Hanoi arrival, Old Quarter",
      "Halong Bay overnight cruise",
      "Cruise return to Hanoi",
      "Fly to Da Nang, Ba Na Hills",
      "Hoi An ancient town",
      "Fly to Ho Chi Minh, Cu Chi tunnels",
      "Mekong Delta day trip",
      "Return to Kolkata",
    ],
    includes: {
      hotel: "4★ hotels + 1 night on a 5★ cruise",
      transport: "Return flights + 2 domestic sectors",
      meals: "Daily breakfast + cruise meals",
      activities: "Halong cruise, Ba Na Hills, Cu Chi",
    },
    bestFor: "Family, Group",
    famousFor: "Halong Bay Cruise, Ba Na Hills",
    highlights: [
      "Halong Bay",
      "Golden Bridge (Ba Na Hills)",
      "My Son Sanctuary",
      "Cu Chi Tunnel",
      "War Museum",
      "Ninh Binh",
    ],
    plan: [
      {
        day: 1,
        title: "Hanoi arrival",
        detail:
          "Arrive Hanoi and transfer to your hotel. Evening walk through the Old Quarter and the Train Street. Overnight in Hanoi.",
      },
      {
        day: 2,
        title: "Halong Bay overnight cruise",
        detail:
          "Drive to Halong Bay (about 3.5 hours) and board a 5-star cruise. Kayaking, cave visit and sunset on the deck. Overnight on the cruise.",
      },
      {
        day: 3,
        title: "Halong Bay to Hanoi",
        detail:
          "Sunrise on the bay and brunch on board, then return to Hanoi. Afternoon free for shopping. Overnight in Hanoi.",
      },
      {
        day: 4,
        title: "Hanoi to Da Nang — Ba Na Hills",
        detail:
          "Fly to Da Nang and visit Ba Na Hills: the famous Golden Bridge, French Village and Fantasy Park. Overnight in Da Nang.",
      },
      {
        day: 5,
        title: "Da Nang — Hoi An ancient town",
        detail:
          "Marble Mountains and Hoi An Ancient Town, with an evening lantern boat ride. Overnight in Hoi An.",
      },
      {
        day: 6,
        title: "Da Nang to Ho Chi Minh City",
        detail:
          "Fly to Ho Chi Minh City. Visit the Cu Chi Tunnels and War Remnants Museum, then Ben Thanh Market. Overnight in Ho Chi Minh.",
      },
      {
        day: 7,
        title: "Mekong Delta day trip",
        detail:
          "Full day in My Tho: boat ride through the Mekong canals, Coconut Island and a honey farm with lunch. Overnight in Ho Chi Minh.",
      },
      {
        day: 8,
        title: "Return to Kolkata",
        detail:
          "Breakfast and airport transfer for your flight back to Kolkata.",
      },
    ],
    inclusions: [
      "Return flights Kolkata–Hanoi / Ho Chi Minh–Kolkata",
      "2 domestic flights (Hanoi–Da Nang, Da Nang–Ho Chi Minh)",
      "4★ hotels plus 1 night on a 5★ Halong cruise",
      "Daily breakfast and cruise meals",
      "All transfers, sightseeing and entrance fees as per itinerary",
    ],
    exclusions: [
      "Vietnam e-visa fee",
      "Lunch and dinners unless mentioned",
      "Cruise upgrades and optional shows",
      "Tips, personal expenses and shopping",
    ],
  },
  {
    slug: "dubai-abu-dhabi",
    title: "Dubai + Abu Dhabi",
    route: "Kolkata to Dubai & Abu Dhabi",
    destination: "Dubai · Abu Dhabi",
    image: "/images/misc-city.jpg",
    imageAlt: "Aerial view of a modern city skyline and river at dusk",
    days: 6,
    nights: 5,
    price: 38999,
    originalPrice: 43999,
    rating: 4.8,
    reviews: 157,
    type: "International",
    style: ["Family", "Luxury", "Couple"],
    itinerary: [
      "Arrival + Marina dhow cruise",
      "Dubai Frame, souks & Burj Khalifa",
      "Miracle Garden + desert safari",
      "Abu Dhabi full day",
      "Free day — Aquaventure / Global Village",
      "Return",
    ],
    includes: {
      hotel: "5★ stays with breakfast",
      transport: "Return flights + all transfers",
      meals: "Daily breakfast + 2 dinners",
      activities: "Burj Khalifa, desert safari, Ferrari World",
    },
    bestFor: "Family, Luxury",
    famousFor: "Burj Khalifa, Desert Safari",
    highlights: [
      "Burj Khalifa",
      "Dubai Frame",
      "Miracle Garden",
      "Desert Safari",
      "Sheikh Zayed Mosque",
      "Ferrari World",
      "Marina Cruise",
    ],
    plan: [
      {
        day: 1,
        title: "Dubai arrival — Marina dhow cruise",
        detail:
          "Arrive Dubai, meet at the airport and check in. Evening Marina dhow cruise with dinner. Overnight in Dubai.",
      },
      {
        day: 2,
        title: "Dubai city tour + Burj Khalifa",
        detail:
          "Dubai Frame, Gold Souk, Jumeirah Beach and a photo stop at Burj Al Arab. Evening Burj Khalifa 124th floor and Dubai Mall fountain show. Overnight in Dubai.",
      },
      {
        day: 3,
        title: "Desert Safari + Dubai Garden",
        detail:
          "Morning at Dubai Miracle Garden. Afternoon desert safari with dune bashing, camel ride, henna and a BBQ dinner with belly dance. Overnight in Dubai.",
      },
      {
        day: 4,
        title: "Abu Dhabi full day",
        detail:
          "Sheikh Zayed Grand Mosque, Louvre Museum, Yas Island photo stop and entry to Ferrari World. Overnight in Dubai.",
      },
      {
        day: 5,
        title: "Free day — Aquaventure or Global Village",
        detail:
          "Free for shopping at Meena Bazaar or Dubai Mall, with an optional add-on for Aquaventure Waterpark or Global Village. Overnight in Dubai.",
      },
      {
        day: 6,
        title: "Return",
        detail:
          "Breakfast and airport transfer for your flight back to Kolkata.",
      },
    ],
    inclusions: [
      "Return economy flights Kolkata–Dubai",
      "5★ hotels with daily breakfast",
      "Desert safari with BBQ dinner and Marina dhow cruise",
      "Ferrari World entry and all city transfers",
      "Visa assistance and travel insurance",
    ],
    exclusions: [
      "Lunch unless mentioned",
      "Aquaventure / Global Village tickets (optional)",
      "Nol card, tips and personal expenses",
      "Anything not mentioned under inclusions",
    ],
  },
  {
    slug: "japan-tokyo-fuji-kyoto-osaka",
    title: "Japan — Tokyo, Mt Fuji, Kyoto & Osaka",
    route: "Kolkata to Japan",
    destination: "Tokyo · Mt Fuji · Kyoto · Osaka",
    image: "/images/dest-japan.jpg",
    imageAlt: "Snow-capped Mount Fuji rising behind a red pagoda in Japan",
    days: 8,
    nights: 7,
    price: 115000,
    originalPrice: 125000,
    rating: 4.9,
    reviews: 96,
    type: "International",
    style: ["Luxury", "Couple", "Adventure"],
    itinerary: [
      "Tokyo arrival, Shibuya Crossing",
      "Tokyo city tour",
      "Mt Fuji & Hakone day trip",
      "Bullet train to Kyoto",
      "Kyoto full day",
      "Kyoto to Osaka, Dotonbori",
      "Disneyland or Universal",
      "Return to Kolkata",
    ],
    includes: {
      hotel: "4★ hotels with breakfast",
      transport: "Return flights + 7-day rail pass",
      meals: "Daily breakfast",
      activities: "Fuji 5th Station, Kyoto temples, theme park",
    },
    bestFor: "Premium Customers",
    famousFor: "Mt Fuji, Bullet Train, Disneyland",
    highlights: [
      "Tokyo Skytree",
      "Shibuya Crossing",
      "Mt Fuji 5th Station",
      "Fushimi Inari",
      "Osaka Castle",
      "Disneyland / Universal",
    ],
    plan: [
      {
        day: 1,
        title: "Tokyo arrival",
        detail:
          "Arrive at Narita / Haneda and transfer to your hotel. Evening at Shinjuku and Shibuya Crossing. Overnight in Tokyo.",
      },
      {
        day: 2,
        title: "Tokyo city tour",
        detail:
          "Asakusa Temple, Tokyo Skytree, Imperial Palace gardens and Odaiba. Overnight in Tokyo.",
      },
      {
        day: 3,
        title: "Mt Fuji + Hakone day trip",
        detail:
          "Visit the Mt Fuji 5th Station, Lake Ashi cruise and a bullet train experience. Overnight in Tokyo.",
      },
      {
        day: 4,
        title: "Tokyo to Kyoto — bullet train",
        detail:
          "Board the Shinkansen to Kyoto (about 2 hours). Evening walk through the Gion district. Overnight in Kyoto.",
      },
      {
        day: 5,
        title: "Kyoto full day",
        detail:
          "Fushimi Inari with its 1000 torii gates, Arashiyama Bamboo Forest and Kinkaku-ji Golden Temple. Overnight in Kyoto.",
      },
      {
        day: 6,
        title: "Kyoto to Osaka",
        detail:
          "Nara Deer Park, Osaka Castle and an evening of street food at Dotonbori. Overnight in Osaka.",
      },
      {
        day: 7,
        title: "Disneyland or Universal Studios",
        detail:
          "Full day at Tokyo Disneyland, or Universal Studios Japan in Osaka — choose one when you book. Overnight in Osaka.",
      },
      {
        day: 8,
        title: "Return to Kolkata",
        detail:
          "Breakfast and airport transfer for your flight back to Kolkata.",
      },
    ],
    inclusions: [
      "Return economy flights Kolkata–Japan",
      "7-day Japan Rail Pass (Shinkansen included)",
      "4★ hotels with daily breakfast",
      "Airport transfers and all sightseeing listed",
      "Theme park ticket (Disneyland or Universal)",
    ],
    exclusions: [
      "Japan visa fee",
      "Lunch and dinners unless mentioned",
      "Local metro tickets outside the rail pass",
      "Tips, personal expenses and shopping",
    ],
  },
];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export const featuredPackage = packages.find((p) => p.slug === "kolkata-to-kashmir")!;
