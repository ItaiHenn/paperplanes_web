export interface FlightSegment {
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  duration: string;
  cabin: string;
  seatNumber?: string;
}

export interface FlightTicketData {
  bookingRef: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  passengerPassport?: string;
  segments: FlightSegment[];
  price: {
    baseFare: number;
    taxes: number;
    total: number;
    currency: string;
  };
  issuedAt: string;
}

export interface HotelRoom {
  type: string;
  beds: string;
  view?: string;
}

export interface HotelBookingData {
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  hotelName: string;
  hotelAddress: string;
  hotelCity: string;
  hotelCountry: string;
  hotelPhone?: string;
  hotelStars: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  room: HotelRoom;
  price: {
    perNight: number;
    total: number;
    taxes: number;
    currency: string;
  };
  amenities: string[];
  issuedAt: string;
}

export interface TripActivity {
  time: string;
  name: string;
  description: string;
  location: string;
  duration: string;
}

export interface TripDay {
  date: string;
  city: string;
  activities: TripActivity[];
}

export interface VisaTripPlanData {
  bookingRef: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  passportNumber?: string;
  nationality?: string;
  tripTitle: string;
  destinationCountry: string;
  purpose: string;
  departureDate: string;
  returnDate: string;
  totalDays: number;
  days: TripDay[];
  accommodation: string;
  estimatedBudget?: string;
  issuedAt: string;
}
