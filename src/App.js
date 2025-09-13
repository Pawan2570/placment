import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTimer } from './hooks/useTimer';
import { createFinishTone, showNotification } from './utils/audioUtils';
import { exportToCSV } from './utils/csvUtils';
import { DEFAULT_PLAN } from './data/studyPlan';

import Header from './components/Header';
import DaySelector from './components/DaySelector';
import ProgressBar from './components/ProgressBar';
import SubjectCard from './components/SubjectCard';
import Footer from './components/Footer';
import Instructions from './components/Instructions';

import './App.css';

const STORAGE_KEY = 'placement_planner_pawan_v2';

function App() {
  const [state, setState] = useLocalStorage(STORAGE_KEY, null);
  const [selectedDay, setSelectedDay] = useState('Day 1');
  const [autoNext, setAutoNext] = useState(true);
  const [runningTimer, setRunningTimer] = useState(null);

  // Initialize state if not exists
  useEffect(() => {
    if (!state) {
      const initialState = {
        days: {},
        createdAt: new Date().toISOString()
      };
      
      Object.keys(DEFAULT_PLAN).forEach(day => {
        initialState.days[day] = DEFAULT_PLAN[day].map(item => ({
          id: item.id,
          title: item.title,
          minutes: item.minutes,
          totalSeconds: (item.minutes || 0) * 60,
          remainingSeconds: (item.minutes || 0) * 60,
          completed: false,
          running: false,
          topics: item.topics || [],
          selfIntro: item.selfIntro || ""
        }));
      });
      
      setState(initialState);
    }
  }, [state, setState]);

  // Calculate progress for current day
  const calculateProgress = useCallback((day) => {
    if (!state?.days?.[day]) return 0;
    
    const items = state.days[day];
    const total = items.reduce((acc, item) => acc + item.totalSeconds, 0) || 1;
    const completed = items.reduce((acc, item) => {
      const completedSeconds = item.completed ? item.totalSeconds : (item.totalSeconds - item.remainingSeconds);
      return acc + completedSeconds;
    }, 0);
    
    return Math.round((completed / total) * 100);
  }, [state]);

  // Timer callback
  const timerCallback = useCallback(() => {
    if (!runningTimer) return;
    
    setState(prevState => {
      const newState = { ...prevState };
      const { day, subjectId } = runningTimer;
      const subject = newState.days[day]?.find(s => s.id === subjectId);
      
      if (!subject) return prevState;
      
      if (subject.remainingSeconds <= 0) {
        // Timer finished
        subject.running = false;
        subject.completed = true;
        subject.remainingSeconds = 0;
        setRunningTimer(null);
        
        // Play sound and show notification
        try {
          createFinishTone()();
        } catch (e) {
          console.warn('Audio failed:', e);
        }
        
        showNotification('Session finished', `${subject.title} — ${day}`);
        
        // Auto next logic
        if (autoNext) {
          const nextSubject = newState.days[day].find(s => !s.completed && s.id !== subjectId);
          if (nextSubject) {
            nextSubject.running = true;
            setRunningTimer({ day, subjectId: nextSubject.id });
          }
        }
        
        return newState;
      }
      
      subject.remainingSeconds = Math.max(0, subject.remainingSeconds - 1);
      return newState;
    });
  }, [runningTimer, autoNext, setState]);

  // Use timer hook
  useTimer(timerCallback, 1000, !!runningTimer);

  // Start timer
  const startTimer = useCallback((day, subjectId) => {
    setState(prevState => {
      const newState = { ...prevState };
      
      // Stop any other running timers for the same day
      newState.days[day].forEach(subject => {
        if (subject.id !== subjectId && subject.running) {
          subject.running = false;
        }
      });
      
      // Start the new timer
      const subject = newState.days[day].find(s => s.id === subjectId);
      if (subject && !subject.completed) {
        subject.running = true;
        setRunningTimer({ day, subjectId });
      }
      
      return newState;
    });
  }, [setState]);

  // Pause timer
  const pauseTimer = useCallback((day, subjectId) => {
    setState(prevState => {
      const newState = { ...prevState };
      const subject = newState.days[day].find(s => s.id === subjectId);
      if (subject) {
        subject.running = false;
      }
      return newState;
    });
    setRunningTimer(null);
  }, [setState]);

  // Reset timer
  const resetTimer = useCallback((day, subjectId) => {
    setState(prevState => {
      const newState = { ...prevState };
      const subject = newState.days[day].find(s => s.id === subjectId);
      if (subject) {
        subject.running = false;
        subject.remainingSeconds = subject.totalSeconds;
        subject.completed = false;
      }
      return newState;
    });
    setRunningTimer(null);
  }, [setState]);

  // Toggle complete
  const toggleComplete = useCallback((day, subjectId) => {
    setState(prevState => {
      const newState = { ...prevState };
      const subject = newState.days[day].find(s => s.id === subjectId);
      if (subject) {
        subject.running = false;
        subject.completed = !subject.completed;
        if (subject.completed) {
          subject.remainingSeconds = 0;
        } else {
          subject.remainingSeconds = subject.totalSeconds;
        }
      }
      return newState;
    });
    setRunningTimer(null);
  }, [setState]);

  // Mark all done
  const markAllDone = useCallback(() => {
    setState(prevState => {
      const newState = { ...prevState };
      newState.days[selectedDay] = newState.days[selectedDay].map(subject => ({
        ...subject,
        completed: true,
        running: false,
        remainingSeconds: 0
      }));
      return newState;
    });
    setRunningTimer(null);
  }, [selectedDay, setState]);

  // Reset day
  const resetDay = useCallback(() => {
    setState(prevState => {
      const newState = { ...prevState };
      newState.days[selectedDay] = DEFAULT_PLAN[selectedDay].map(item => ({
        id: item.id,
        title: item.title,
        minutes: item.minutes || 0,
        totalSeconds: (item.minutes || 0) * 60,
        remainingSeconds: (item.minutes || 0) * 60,
        completed: false,
        running: false,
        topics: item.topics || [],
        selfIntro: item.selfIntro || ""
      }));
      return newState;
    });
    setRunningTimer(null);
  }, [selectedDay, setState]);

  // Export CSV
  const handleExportCSV = useCallback(() => {
    if (state) {
      exportToCSV(state);
    }
  }, [state]);

  // Clear storage
  const handleClearStorage = useCallback(() => {
    if (window.confirm('Clear saved progress? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  }, []);

  if (!state) {
    return <div className="loading">Loading...</div>;
  }

  const currentDaySubjects = state.days[selectedDay] || [];
  const progress = calculateProgress(selectedDay);

  return (
    <div className="app-container">
      <Header />
      
      <div className="card">
        <DaySelector 
          days={Object.keys(state.days)}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
        />

        <ProgressBar 
          progress={progress}
          autoNext={autoNext}
          onAutoNextChange={setAutoNext}
          onMarkAll={markAllDone}
          onResetDay={resetDay}
        />

        <div className="subjects-grid">
          {currentDaySubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onStart={() => startTimer(selectedDay, subject.id)}
              onPause={() => pauseTimer(selectedDay, subject.id)}
              onReset={() => resetTimer(selectedDay, subject.id)}
              onToggleComplete={() => toggleComplete(selectedDay, subject.id)}
              isRunning={subject.running}
              isCompleted={subject.completed}
            />
          ))}
        </div>

        <Footer 
          onExportCSV={handleExportCSV}
          onClearStorage={handleClearStorage}
        />
      </div>

      <div className="card">
        <Instructions />
      </div>
    </div>
  );
}

export default App;
