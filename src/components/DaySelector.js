import React from 'react';
import './DaySelector.css';

const DaySelector = ({ days, selectedDay, onDayChange }) => {
  return (
    <div className="days-container">
      {days.map(day => (
        <button
          key={day}
          className={`day-btn ${day === selectedDay ? 'active' : ''}`}
          onClick={() => onDayChange(day)}
        >
          <span className="day-icon">📅</span>
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
