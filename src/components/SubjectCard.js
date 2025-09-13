import React, { useState } from 'react';
import './SubjectCard.css';

const SubjectCard = ({ 
  subject, 
  onStart, 
  onPause, 
  onReset, 
  onToggleComplete,
  isRunning,
  isCompleted 
}) => {
  const [showTopics, setShowTopics] = useState(false);
  const [selfIntro, setSelfIntro] = useState(subject.selfIntro || '');

  const formatTime = (seconds) => {
    if (seconds <= 0) return '00:00';
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const handleSelfIntroChange = (value) => {
    setSelfIntro(value);
    // You might want to save this to state/parent component
  };

  return (
    <div className={`subject-card ${isCompleted ? 'done' : ''} ${isRunning ? 'running' : ''}`}>
      <div className="subject-header">
        <div>
          <h3 className="subject-title">{subject.title}</h3>
          <div className="subject-meta">
            <span className="time-badge">
              <span className="time-icon">⏰</span>
              {Math.round(subject.totalSeconds / 60)} min
            </span>
            <span className={`status-badge ${isRunning ? 'status-running' : isCompleted ? 'status-done' : 'status-idle'}`}>
              {isRunning ? 'Running' : isCompleted ? 'Completed' : 'Planned'}
            </span>
          </div>
        </div>
      </div>

      <div className="subject-timer">
        {formatTime(subject.remainingSeconds)}
      </div>

      <div className="subject-controls">
        <button 
          className="btn btn-primary" 
          onClick={onStart}
          disabled={isRunning || isCompleted}
        >
          <span className="btn-icon">▶️</span>
          Start
        </button>
        
        <button 
          className="btn btn-warning" 
          onClick={onPause}
          disabled={!isRunning}
        >
          <span className="btn-icon">⏸️</span>
          Pause
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={onReset}
        >
          <span className="btn-icon">🔄</span>
          Reset
        </button>
        
        <button 
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
          onClick={onToggleComplete}
        >
          {isCompleted ? (
            <>
              <span className="btn-icon">↩️</span>
              Undo
            </>
          ) : (
            <>
              <span className="btn-icon">✅</span>
              Mark done
            </>
          )}
        </button>
      </div>

      <div className="topics-container">
        <div 
          className="topics-title"
          onClick={() => setShowTopics(!showTopics)}
        >
          <span className="topics-icon">📚</span>
          Study topics & notes
          <span className="chevron">{showTopics ? '▲' : '▼'}</span>
        </div>
        
        {showTopics && (
          <div className="topics-list">
            {subject.topics.map((topic, index) => (
              <div key={index} className="topic-tag">
                {topic}
              </div>
            ))}
          </div>
        )}
      </div>

      {subject.id === 'comm' && (
        <div className="self-intro">
          <div className="topics-title">
            <span className="topics-icon">👤</span>
            Your self-introduction:
          </div>
          <textarea
            value={selfIntro}
            onChange={(e) => handleSelfIntroChange(e.target.value)}
            placeholder="Edit your self-introduction here..."
            className="self-intro-textarea"
          />
        </div>
      )}
    </div>
  );
};

export default SubjectCard;
