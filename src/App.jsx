import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import './styles/calendar.css';

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  // 👇 Modal popup state
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [popupTitle, setPopupTitle] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // 👇 Load events from static JSON
  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  // 👇 Navigation logic
const prevMonth = () => {
  const newDate = currentDate.clone().subtract(1, 'month');
  console.log("Prev:", newDate.format('MMMM YYYY'));
  setCurrentDate(newDate);
};

const nextMonth = () => {
  const newDate = currentDate.clone().add(1, 'month');
  console.log("Next:", newDate.format('MMMM YYYY'));
  setCurrentDate(newDate);
};

const goToToday = () => {
  const newDate = dayjs();
  console.log("Today:", newDate.format('MMMM YYYY'));
  setCurrentDate(newDate);
};



  // 👇 Open and close popup logic
  const openEventPopup = (events, title) => {
    setSelectedEvents(events);
    setPopupTitle(title);
    setShowPopup(true);
  };

  const closeEventPopup = () => {
    setShowPopup(false);
  };

  return (

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
                  <strong>{event.title}</strong> - {event.time} ({event.duration})
                </li>
              ))}
            </ul>
            <button className="close-popup" onClick={closeEventPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default App;
