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
  const week = [];

  for (let i = 0; i < 7; i++) {
    week.push(day.clone());
    day = day.add(1, 'day');
  }

  calendar.push(week);
}

  const isSecondOrFourthSaturday = (date) => {
  if (date.day() !== 6) return false; // not Saturday
  const firstDayOfMonth = date.startOf('month');
  let saturdayCount = 0;

  for (let d = firstDayOfMonth.clone(); d.isBefore(date); d = d.add(1, 'day')) {
    if (d.day() === 6) {
      saturdayCount++;
    }
  }

  return saturdayCount === 1 || saturdayCount === 3; // 2nd or 4th Saturday
};


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
                className={`day-cell
                  ${day.isSame(today, 'day') ? 'today' : ''}
                  ${day.month() !== currentDate.month() ? 'not-current-month' : ''}
                  ${day.day() === 0 && day.month() === currentDate.month() ? 'sunday' : ''}
                  ${day.day() === 6 && isSecondOrFourthSaturday(day) ? 'alt-saturday' : ''}
                `}
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
