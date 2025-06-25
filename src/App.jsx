// App.jsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import './styles/calendar.css';

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [popupTitle, setPopupTitle] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const prevMonth = () => setCurrentDate(currentDate.clone().subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.clone().add(1, 'month'));
  const goToToday = () => setCurrentDate(dayjs());

  const openEventPopup = (events, title) => {
    setSelectedEvents(events);
    setPopupTitle(title);
    setShowPopup(true);
  };

  const closeEventPopup = () => setShowPopup(false);

  const conflicts = events.reduce((acc, event, _, all) => {
    const sameDate = all.filter(e => e.date === event.date && e !== event);
    if (sameDate.some(e2 => e2.startTime < event.endTime && e2.endTime > event.startTime)) {
      acc.push(event);
    }
    return acc;
  }, []);

  const currentMonthEvents = events.filter(e =>
    dayjs(e.date).month() === currentDate.month() &&
    dayjs(e.date).year() === currentDate.year()
  );

  return (
    <div className="calendar-wrapper">
      <aside className="sidebar">
        <h3>📅 {currentDate.format('MMMM YYYY')} Events</h3>
        <ul className="event-list">
          {currentMonthEvents.length > 0 ? (
            currentMonthEvents.map((e, i) => (
              <li key={i} className="event-item">
                <strong>{dayjs(e.date).format('MMM D')}</strong>: {e.title} <br/>
                <small>{e.startTime} - {e.endTime}</small>
              </li>
            ))
          ) : (
            <p>No events this month.</p>
          )}
        </ul>

        <h3 style={{ marginTop: '2rem' }}>⚠️ Conflicts</h3>
        <ul className="conflict-list">
          {conflicts.length > 0 ? (
            conflicts.map((e, i) => (
              <li key={i} className="conflict-item">
                <strong>{e.date}</strong><br />
                {e.title} ({e.startTime}-{e.endTime})
              </li>
            ))
          ) : (
            <p>No conflicts found 🎉</p>
          )}
        </ul>
      </aside>

      <div className="calendar-container">
        <CalendarHeader
          currentDate={currentDate}
          onPrev={prevMonth}
          onNext={nextMonth}
          onToday={goToToday}
        />
        <CalendarGrid
          currentDate={currentDate}
          events={events}
          openEventPopup={openEventPopup}
        />

        {showPopup && (
          <div className="popup-overlay" onClick={closeEventPopup}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
              <h3>Events on {popupTitle}</h3>
              <ul className="popup-event-list">
                {selectedEvents.map((event, index) => (
                  <li key={index}>
                    <strong>{event.title}</strong> – {event.startTime} to {event.endTime}
                  </li>
                ))}
              </ul>
              <button className="close-popup" onClick={closeEventPopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
