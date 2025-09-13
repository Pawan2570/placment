import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1>
        <span className="header-icon">📅</span>
        Placement Day Planner
      </h1>
      <p>Track Day 1 & Day 2 study plan · timers · notifications · progress</p>
    </div>
  );
};

export default Header;
