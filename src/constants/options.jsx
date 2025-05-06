import { modelResponse } from "@/service/AIModal";
export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler seeking adventure and new experiences.",
    icon: "✈",
    people: 1,
  },
  {
    id: 2,
    title: "Couple Getaway",
    desc: "Romantic escape for two, exploring together.",
    icon: "❤️",
    people: 2,
  },
  {
    id: 3,
    title: "Family Trip",
    desc: "Fun-filled vacation with kids and loved ones.",
    icon: "👨‍👩‍👧‍👦",
    people: 4,
  },
  {
    id: 4,
    title: "Friends Adventure",
    desc: "Exploring new places with your closest friends.",
    icon: "👫",
    people: 3,
  },
  {
    id: 5,
    title: "Solo Backpacker",
    desc: "Budget-friendly travel with a free spirit.",
    icon: "🎒",
    people: 1,
  },
  {
    id: 6,
    title: "Business Travel",
    desc: "Work-related trips with efficiency in mind.",
    icon: "💼",
    people: 1,
  },
  {
    id: 7,
    title: "Group Tour",
    desc: "Guided experiences with fellow travelers.",
    icon: "🚌",
    people: 10,
  },
  {
    id: 8,
    title: "Honeymoon",
    desc: "Luxurious and intimate post-wedding escape.",
    icon: "💍",
    people: 2,
  },
  {
    id: 9,
    title: "Pet-Friendly Trip",
    desc: "Bringing your furry friend along for the journey.",
    icon: "🐕",
    people: 2,
  },
  {
    id: 10,
    title: "Retirement Travel",
    desc: "Leisurely exploration at a relaxed pace.",
    icon: "🌴",
    people: 2,
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Budget Traveler",
    desc: "Affordable options for the frugal explorer.",
    icon: "💰",
    budget: 100,
  },
  {
    id: 2,
    title: "Mid-Range Explorer",
    desc: "Comfortable travel without breaking the bank.",
    icon: "💳",
    budget: 500,
  },
  {
    id: 3,
    title: "Luxury Seeker",
    desc: "Indulging in high-end experiences and accommodations.",
    icon: "💎",
    budget: 1000,
  },
  {
    id: 4,
    title: "All-Inclusive Traveler",
    desc: "Packages that cover everything for a hassle-free trip.",
    icon: "🏖️",
    budget: 2000,
  },
];

export const AI_PROMPT = `Generate a travel itinerary for a trip to {destination} for {travelers} travelers in {noOfDays} day(s), with a budget of $ {budget}. Include activities, accommodations, and dining options. Make it fun and engaging! Also Give me a list of 3 hotels. Follow this response format: ${modelResponse}. For the best time to visit field, you only need to provide the time from .. AM(or PM) to ..AM(or PM)`;
