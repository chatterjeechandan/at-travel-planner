// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

interface Plan {
  itinerary: string;
  totalCost: number;
  suggestions: string[];
}

interface AppProps {
  plan?: Plan;
}

export function App({ plan }: AppProps) {
  return (
    <div style={{ border: '2px solid blue' }}>
      <h1>This is from React</h1>

      {plan ? (
        <div>
          <h2>Itinerary</h2>
          <pre>{plan.itinerary}</pre>

          <h3>Total Cost: ₹{plan.totalCost}</h3>

          <h4>Suggestions:</h4>
          <ul>
            {plan.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No plan yet. Submit the form above.</p>
      )}
    </div>
  );
}

export default App;