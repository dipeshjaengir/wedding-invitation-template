import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9999] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-theme-primary via-theme-accent to-theme-primary shadow-[0_1px_10px_var(--theme-primary)] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
