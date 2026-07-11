import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const useCountdown = (targetDateString) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    if (!targetDateString) return;

    const calculateTimeLeft = () => {
      const now = dayjs();
      const target = dayjs(targetDateString);
      const diffMs = target.diff(now);

      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return false;
      }

      const diffDuration = dayjs.duration(diffMs);
      
      // Calculate total days (including months/years as days)
      const days = Math.floor(diffDuration.asDays());
      const hours = diffDuration.hours();
      const minutes = diffDuration.minutes();
      const seconds = diffDuration.seconds();

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });

      return true;
    };

    // Calculate immediately
    const hasTimeRemaining = calculateTimeLeft();
    if (!hasTimeRemaining) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      if (!remaining) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateString]);

  return timeLeft;
};
