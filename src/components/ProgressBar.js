import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
  progress, 
  autoNext, 
  onAutoNextChange, 
  onMarkAll, 
  onResetDay 
}) => {
  return (
    <div className="progress-container">
      <div className="progress-info">Daily Progress</div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress-percent">{progress}%</div>
      
      <div className="progress-controls">
        <label className="toggle-label">
          <span className="toggle-switch">
            <input 
              type="checkbox" 
              checked={autoNext}
              onChange={(e) => onAutoNextChange(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </span>
          Auto next
        </label>
        
        <button className="btn btn-primary" onClick={onMarkAll}>
          <span className="btn-icon">✅</span>
          Mark all done
        </button>
        
        <button className="btn btn-secondary" onClick={onResetDay}>
          <span className="btn-icon">🔄</span>
          Reset day
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
