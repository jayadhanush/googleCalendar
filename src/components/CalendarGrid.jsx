import React from 'react';
import dayjs from 'dayjs';
import EventCard from './EventCard';

function CalendarGrid({ currentDate, events }) {
  const startDay = currentDate.startOf('month').startOf('week');
  const endDay = currentDate.endOf('month').endOf('week');
  const today = dayjs();
  const calendar = [];

  let day = startDay.clone();

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => {
          const d = day.clone();
          day = day.add(1, 'day');
          return d;
        })
    );
  }

  return (
    <div className="calendar-grid">
      <div className="week-days">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="week-day">{day}</div>
        ))}
      </div>
      {calendar.map((week, i) => (
        <div key={i} className="week-row">
          {week.map(day => {
            const dayEvents = events.filter(
              e => e.date === day.format('YYYY-MM-DD')
            );
            return (
              <div
                key={day}
                className={`day-cell ${
                  day.isSame(today, 'day') ? 'today' : ''
                }`}
              >
                <div className="date-number">{day.date()}</div>
                {dayEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CalendarGrid;
