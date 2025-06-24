import React from 'react';
import dayjs from 'dayjs';
import calendarIcon from '../assets/calendar-icon.png';

function CalendarHeader({ currentDate, onPrev, onNext, onToday }) {
  return (
    <div className="calendar-header">
      <div className="calendar-title">
        <img src={calendarIcon} alt="calendar icon" className="calendar-icon" />
        <h2>Calendar</h2>
    </div>
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
