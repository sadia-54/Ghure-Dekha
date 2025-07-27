
export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export type Activity = {
  placeName: string;
  placeDetails: string;
  placeImageUrl: string;
  geoCoordinates: GeoCoordinates;
  ticketPricing: string;
  rating: number;
  timeToTravel: string;
  bestTimeToVisit: string;
};

export type DayPlan = {
  day: number;
  dayPlan: string;
  plan: Activity[];
  activities?: Activity[]; // optional fallback
};

export type TravelPlan = {
  location: string;
  days: number;
  budget: string;
  travelPartner: string;
  hotelsOptions?: any[]; 
  itinerary: DayPlan[];
};

export type Trip = {
  tripData: {
    travelPlan: TravelPlan;
  };
};
