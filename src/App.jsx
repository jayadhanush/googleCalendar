import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import './styles/calendar.css';

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const goToToday = () => setCurrentDate(dayjs());

  return (
    <div className="calendar-container">
      <CalendarHeader
        currentDate={currentDate}
        onPrev={prevMonth}
        onNext={nextMonth}
        onToday={goToToday} 
      />
      <CalendarGrid currentDate={currentDate} events={events} />
    </div>
  );
}

export default App;
