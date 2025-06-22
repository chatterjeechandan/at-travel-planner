import { PlanCard } from './PlanCard/PlanCard';
import { DestinationsGrid } from './DestinationsGrid/DestinationsGrid';
import { WidgetName } from '@ai-travel/models';

export const WIDGETS: Record<WidgetName, React.ElementType> = {
  PlanCard,
  DestinationsGrid,
};
