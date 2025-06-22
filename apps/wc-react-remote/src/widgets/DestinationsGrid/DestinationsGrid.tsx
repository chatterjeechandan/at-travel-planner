import React from 'react';
import { WidgetProps } from '@ai-travel/models';
import './DestinationsGrid.scss';

export function DestinationsGrid({ destinations = [] }: WidgetProps['DestinationsGrid']) {
  return (
    <section className="destinations-grid">
      <h2>Popular Holiday Destinations</h2>

      {destinations.length === 0 ? (
        <p className="empty">No destinations found.</p>
      ) : (
        <div className="grid">
          {destinations.map((d) => (
            <div className="card" key={d.id}>
              <div
                className="card__image"
                style={{ backgroundImage: `url(${d.image})` }}
              />
              <div className="card__body">
                <h3>{d.name}</h3>
                {d.price && <p className="card__price">From ₹{d.price}</p>}
                <button className="card__button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
