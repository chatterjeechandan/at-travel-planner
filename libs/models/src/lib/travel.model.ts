export interface TravelQuery {
  source: string;
  destination: string;
  startDate: string;
  returnDate: string;
  adults: number;
  children: number;
  budget: number;
}

export interface TravelPlanResult {
  itinerary: string;
  totalCost: number;
  suggestions: string[];
}
