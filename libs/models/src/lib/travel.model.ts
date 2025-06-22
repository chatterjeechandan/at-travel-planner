export type WidgetName = 'PlanCard' | 'DestinationsGrid';

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

export interface Destination {
  id: string;
  name: string;
  image: string;
  price?: number;
}

export type WidgetProps = {
  PlanCard: { plan: TravelPlanResult };
  DestinationsGrid: { destinations: Destination[] };
};
