import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <h2>
        <span className="instructions-icon">ℹ️</span>
        How to use this planner
      </h2>
      <ol>
        <li>Pick <strong>Day 1</strong> or <strong>Day 2</strong> on top. Each day has planned subjects and times.</li>
        <li>Open a subject, click <strong>Start</strong> to begin timer. You can Pause or Reset anytime.</li>
        <li>When a timer finishes it will mark the subject done (if enabled), notify you, play sound and optionally start next subject.</li>
        <li>Use <strong>Mark all done</strong> to complete the day or <strong>Reset day</strong> to restart schedule.</li>
        <li>Click <strong>Export progress CSV</strong> to download a report you can keep or upload to GitHub.</li>
      </ol>
    </div>
  );
};

export default Instructions;
