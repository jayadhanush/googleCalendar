import React from 'react';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <p className="event-title">{event.title}</p>
      <p className="event-time">{event.time} ({event.duration})</p>
    </div>
  );
}

export default EventCard;
