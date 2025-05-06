import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
});

const generationConfig = {
  temperature: 1,
  topP: 0.9,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Convert the model response to a properly formatted JSON string
export const modelResponse = JSON.stringify(
  {
    trip_summary: {
      destination: "Las Vegas, Nevada",
      duration: "3 days",
      audience: "Couple",
      budget: "Cheap ($50–$100/night hotels, free/affordable activities)",
    },
    hotel_options: [
      {
        name: "Circus Circus Hotel & Casino",
        address: "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
        price_per_night: "$55",
        image_url: "https://example.com/circus-circus.jpg",
        geo_coordinates: [36.135, -115.1689],
        rating: 3.5,
        description: "Budget-friendly with free circus acts and a midway.",
      },
      {
        name: "Excalibur Hotel & Casino",
        address: "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
        price_per_night: "$70",
        image_url: "https://example.com/excalibur.jpg",
        geo_coordinates: [36.0989, -115.1759],
        rating: 3.8,
        description: "Medieval-themed affordable stay on the Strip.",
      },
    ],
    itinerary: [
      {
        day: 1,
        plans: [
          {
            place_name: "Fremont Street Experience",
            details: "Free light shows, live music, and vintage casinos.",
            image_url: "https://example.com/fremont-street.jpg",
            geo_coordinates: [36.1699, -115.1398],
            ticket: "Free",
            best_time_to_visit: "Evening (7 PM–11 PM)",
            time_spent: "2–3 hours",
          },
          {
            place_name: "Container Park",
            details:
              "Quirky shopping/dining area with a free treehouse playground.",
            image_url: "https://example.com/container-park.jpg",
            geo_coordinates: [36.1716, -115.1391],
            ticket: "Free",
            best_time_to_visit: "Afternoon (3 PM–6 PM)",
            time_spent: "1–2 hours",
          },
        ],
      },
      {
        day: 2,
        plans: [
          {
            place_name: "Bellagio Fountains",
            details: "Free iconic water show synchronized to music.",
            image_url: "https://example.com/bellagio-fountains.jpg",
            geo_coordinates: [36.1129, -115.1755],
            ticket: "Free",
            best_time_to_visit: "Evening (8 PM–10 PM)",
            time_spent: "30 mins",
          },
          {
            place_name: "The High Roller (Happy Half-Hour)",
            details:
              "Cheap daytime tickets for 30-min Ferris wheel ride with views.",
            image_url: "https://example.com/high-roller.jpg",
            geo_coordinates: [36.1176, -115.1719],
            ticket: "$25/person (daytime discount)",
            best_time_to_visit: "Sunset (5 PM–7 PM)",
            time_spent: "1 hour",
          },
        ],
      },
      {
        day: 3,
        plans: [
          {
            place_name: "Red Rock Canyon (Scenic Drive)",
            details:
              "$15/car entry for stunning desert views (30-min drive from Strip).",
            image_url: "https://example.com/red-rock.jpg",
            geo_coordinates: [36.1357, -115.4289],
            ticket: "$15/vehicle",
            best_time_to_visit: "Morning (8 AM–11 AM)",
            time_spent: "3 hours",
          },
          {
            place_name: "Pinball Hall of Fame",
            details: "Cheap retro arcade ($0.25–$1 per game).",
            image_url: "https://example.com/pinball-hall.jpg",
            geo_coordinates: [36.082, -115.1531],
            ticket: "Pay-per-game",
            best_time_to_visit: "Afternoon (1 PM–4 PM)",
            time_spent: "1–2 hours",
          },
        ],
      },
    ],
  },
  null,
  2
);

export const chat = ai.chats.create({
  model: "gemini-2.0-flash",
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a 3-day budget-friendly travel itinerary for a couple visiting Las Vegas, including:
                1. List of Hotel Options (List with details):      
                - Hotel Name
                - Hotel Address
                - Price per night
                - Hotel Image URL
                - Geo Coordinates (latitude, longitude)
                - Rating (out of 5)
                - Brief Description
                - Daily Itinerary (Day 1, Day 2, Day 3):
                - Places to Visit (Name, Details, Image URL, Geo Coordinates)
                - Ticket & Pricing Info (Free/Paid, Cost)
                - Rating (if available)
                - Best Time to Visit (Morning/Afternoon/Evening)
                - Travel Time Between Locations

                2. Format:
                - Strictly in JSON (validated structure).

                3. Budget Focus:
                - Prioritize free/cheap attractions, affordable dining, and low-cost entertainment.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: modelResponse,
        },
      ],
    },
  ],
  generationConfig,
});
