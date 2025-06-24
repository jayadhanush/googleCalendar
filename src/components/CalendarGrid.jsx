import React from 'react';
import dayjs from 'dayjs';
import EventCard from './EventCard';

function CalendarGrid({ currentDate, events, openEventPopup }) {
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
                } ${day.month() !== currentDate.month() ? 'not-current-month' : ''}`}
            >

                <div className="date-number">{day.date()}</div>
                {dayEvents.length > 0 && (
  <>
                    <EventCard event={dayEvents[0]} />
                    {dayEvents.length > 1 && (
                    <button
                        className="more-events-btn"
                        onClick={() => openEventPopup(dayEvents, day.format('DD MMM YYYY'))}
                    >
                        +{dayEvents.length - 1} more
                    </button>
                    )}
                </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CalendarGrid;
