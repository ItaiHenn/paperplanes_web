import type { FlightTicketData, HotelBookingData, VisaTripPlanData } from "@/types/documents";

export const dummyFlight: FlightTicketData = {
  bookingRef: "DPT-DEMO-FLT",
  pnr: "XK7R2M",
  passengerName: "Alex Traveler",
  passengerEmail: "alex@example.com",
  passengerPhone: "+1 555-0123",
  passengerPassport: "A12345678",
  segments: [
    {
      flightNumber: "EK 201",
      airline: "Emirates",
      airlineCode: "EK",
      origin: "JFK",
      originCity: "New York",
      destination: "DXB",
      destinationCity: "Dubai",
      departureDate: "Mon, 15 Sep 2026",
      departureTime: "23:10",
      arrivalDate: "Wed, 16 Sep 2026",
      arrivalTime: "19:25",
      duration: "12h 15m",
      cabin: "Economy",
      seatNumber: "32A",
    },
    {
      flightNumber: "EK 521",
      airline: "Emirates",
      airlineCode: "EK",
      origin: "DXB",
      originCity: "Dubai",
      destination: "BKK",
      destinationCity: "Bangkok",
      departureDate: "Wed, 16 Sep 2026",
      departureTime: "22:05",
      arrivalDate: "Thu, 17 Sep 2026",
      arrivalTime: "07:40",
      duration: "5h 35m",
      cabin: "Economy",
      seatNumber: "32A",
    },
  ],
  price: {
    baseFare: 620.0,
    taxes: 89.5,
    total: 709.5,
    currency: "USD",
  },
  issuedAt: "29 Jun 2026",
};

export const dummyHotel: HotelBookingData = {
  bookingRef: "DPT-DEMO-HTL",
  hotelConfirmationNumber: "MOB-8392847",
  guestName: "Alex Traveler",
  guestEmail: "alex@example.com",
  guestPhone: "+1 555-0123",
  hotelName: "Mandarin Oriental Bangkok",
  hotelAddress: "48 Oriental Avenue",
  hotelCity: "Bangkok",
  hotelCountry: "Thailand",
  hotelPhone: "+66 2 659 9000",
  hotelStars: 5,
  checkIn: "17 Sep 2026",
  checkOut: "24 Sep 2026",
  nights: 7,
  room: {
    type: "Deluxe Room — River View",
    beds: "King Bed",
    view: "Chao Phraya River",
  },
  price: {
    perNight: 320.0,
    total: 2352.0,
    taxes: 112.0,
    currency: "USD",
  },
  amenities: [
    "Free WiFi",
    "Daily Breakfast",
    "Pool Access",
    "Fitness Center",
    "Airport Shuttle",
    "Late Checkout",
  ],
  issuedAt: "29 Jun 2026",
};

export const dummyVisaPlan: VisaTripPlanData = {
  bookingRef: "DPT-DEMO-VSA",
  applicantName: "Alex Traveler",
  applicantEmail: "alex@example.com",
  applicantPhone: "+1 555-0123",
  passportNumber: "A12345678",
  nationality: "United States",
  tripTitle: "Thailand Cultural & Leisure Trip",
  destinationCountry: "Thailand",
  purpose: "Tourism & Cultural Exploration",
  departureDate: "17 Sep 2026",
  returnDate: "24 Sep 2026",
  totalDays: 7,
  accommodation: "Mandarin Oriental Bangkok",
  estimatedBudget: "USD 3,500",
  days: [
    {
      date: "17 Sep 2026",
      city: "Bangkok",
      activities: [
        {
          time: "14:00",
          name: "Hotel Check-In & Rest",
          description: "Arrival and check-in at Mandarin Oriental Bangkok. Settle in and freshen up.",
          location: "Mandarin Oriental Bangkok",
          duration: "2h",
        },
        {
          time: "17:00",
          name: "Wat Pho Temple Visit",
          description:
            "Explore the iconic Temple of the Reclining Buddha, one of Bangkok's oldest and largest temples.",
          location: "Wat Pho, Phra Nakhon",
          duration: "2h",
        },
        {
          time: "20:00",
          name: "Dinner at Sirocco Sky Bar",
          description: "Dinner at the world-famous rooftop restaurant with panoramic city views.",
          location: "State Tower, Silom",
          duration: "2h",
        },
      ],
    },
    {
      date: "18 Sep 2026",
      city: "Bangkok",
      activities: [
        {
          time: "09:00",
          name: "Grand Palace & Wat Phra Kaew",
          description:
            "Morning visit to the Grand Palace complex, home of the Emerald Buddha. Dress code required.",
          location: "Na Phra Lan Road, Phra Nakhon",
          duration: "3h",
        },
        {
          time: "13:00",
          name: "Chatuchak Weekend Market",
          description:
            "Explore one of the world's largest outdoor markets with 15,000+ stalls of food, antiques, and crafts.",
          location: "Chatuchak, Bangkok",
          duration: "3h",
        },
        {
          time: "19:00",
          name: "Chao Phraya Dinner Cruise",
          description:
            "Scenic evening cruise along the Chao Phraya River with Thai cuisine and live classical dance.",
          location: "Chao Phraya River Pier",
          duration: "2.5h",
        },
      ],
    },
    {
      date: "19 Sep 2026",
      city: "Ayutthaya",
      activities: [
        {
          time: "08:00",
          name: "Day Trip to Ayutthaya",
          description:
            "UNESCO World Heritage site — ancient capital of Siam with magnificent ruins of temples and royal palaces.",
          location: "Ayutthaya, 80km from Bangkok",
          duration: "8h",
        },
        {
          time: "17:00",
          name: "Return to Bangkok",
          description: "Scenic train ride back to Bangkok Hua Lamphong station.",
          location: "Ayutthaya Railway Station",
          duration: "1.5h",
        },
      ],
    },
    {
      date: "20 Sep 2026",
      city: "Bangkok",
      activities: [
        {
          time: "10:00",
          name: "Jim Thompson House Museum",
          description:
            "Visit the traditional Thai silk house and museum of American businessman Jim Thompson.",
          location: "Kasem San 2, Pathum Wan",
          duration: "1.5h",
        },
        {
          time: "14:00",
          name: "Lumphini Park & Relaxation",
          description: "Afternoon stroll through Bangkok's green lung and people-watching.",
          location: "Lumphini Park, Silom",
          duration: "2h",
        },
        {
          time: "19:00",
          name: "Yaowarat Chinatown Food Tour",
          description:
            "Guided street food tour through Bangkok's Chinatown sampling pad thai, mango sticky rice, and fresh seafood.",
          location: "Yaowarat Road, Chinatown",
          duration: "3h",
        },
      ],
    },
  ],
  issuedAt: "29 Jun 2026",
};
