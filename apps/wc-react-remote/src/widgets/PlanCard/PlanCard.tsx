import './PlanCard.scss';
import { WidgetProps } from '@ai-travel/models';

export function PlanCard({ plan }: WidgetProps['PlanCard']) {
  if (!plan) return;

  const days = plan.itinerary.split(/Day \d+:/).filter(Boolean).map(s => s.trim());

  return (
    <div className="plan-card">
      <h2 className="plan-card__title">Your AI Travel Plan</h2>

      <section className="plan-card__section">
        <h3>Itinerary</h3>
        <ul className="plan-card__itinerary">
          {days.map((text, idx) => (
            <li key={idx}>
              <strong>Day {idx + 1}:</strong> {text}
            </li>
          ))}
        </ul>
      </section>

      <section className="plan-card__section plan-card__cost">
        <h3>Total Cost</h3>
        <p>₹{plan.totalCost}</p>
      </section>

      <section className="plan-card__section">
        <h3>Suggestions</h3>
        <ul className="plan-card__suggestions">
          {plan.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
