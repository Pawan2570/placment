import React from 'react';
import './Footer.css';

const Footer = ({ onExportCSV, onClearStorage }) => {
  return (
    <div className="footer">
      <div className="footer-actions">
        <button className="btn btn-primary" onClick={onExportCSV}>
          <span className="btn-icon">📊</span>
          Export progress CSV
        </button>
        <button className="btn btn-secondary" onClick={onClearStorage}>
          <span className="btn-icon">🗑️</span>
          Clear saved progress
        </button>
      </div>
      <div className="footer-tip">
        <span className="tip-icon">💡</span>
        Tip: Allow browser notifications when prompted. Sound alert will play when a session ends.
      </div>
    </div>
  );
};

export default Footer;
