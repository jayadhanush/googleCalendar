import React from 'react';

function EventCard({ event }) {
  return (
    <div
      className="event-card"
      style={{
        borderLeft: `4px solid ${event.color || '#0288d1'}`,
        backgroundColor: event.conflict ? '#ffe0e0' : '#e1f5fe',
        color: event.conflict ? '#d32f2f' : '#0277bd'
      }}
    >
      <p className="event-title">
        {event.title}
        {event.conflict && <span style={{ marginLeft: 6, fontWeight: 'bold' }}>⚠️ Conflict</span>}
      </p>
      <p className="event-time">{event.startTime} - {event.endTime}</p>
    </div>
  );
}

export default EventCard;
