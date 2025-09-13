import { useEffect, useRef } from 'react';

export function useTimer(callback, delay, isActive) {
  const savedCallback = useRef();
  const intervalRef = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (isActive && delay !== null) {
      intervalRef.current = setInterval(() => {
        savedCallback.current();
      }, delay);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isActive, delay]);
}
