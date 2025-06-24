import React from 'react';
import dayjs from 'dayjs';

function CalendarHeader({ currentDate, onPrev, onNext, onToday }) {
  return (
    <div className="calendar-header">
      <h2>Calendar</h2>
      <div className="calendar-controls">
        <button onClick={onPrev}>&lt;</button>
        <span>{currentDate.format('MMMM YYYY')}</span>
        <button onClick={onNext}>&gt;</button>
        <button onClick={onToday} className="today-button">Today</button>
      </div>
    </div>
  );
}


export default CalendarHeader;
