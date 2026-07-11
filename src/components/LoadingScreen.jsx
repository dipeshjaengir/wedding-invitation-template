import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ monogram, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let start = 0;
    const duration = 2500; // 2.5 seconds total loading time
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        start = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsCompleted(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800); // Wait for exit animation
        }, 600); // Hold at 100%
      }
      setProgress(Math.floor(start));
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-theme-bg z-[99999] flex flex-col items-center justify-center select-none"
        >
          {/* Subtle gold radial background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

          <div className="z-10 flex flex-col items-center max-w-xs w-full text-center space-y-12">
            {/* Monogram Logo */}
            {monogram && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-32 h-32 md:w-36 md:h-36 drop-shadow-[0_0_12px_rgba(212,175,55,0.2)]"
              >
                <img
                  src={monogram}
                  alt="Wedding Monogram"
                  className="w-full h-full object-contain filter"
                />
              </motion.div>
            )}

            <div className="space-y-4 w-full">
              {/* Apple-Quality Counter percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-heading text-4xl md:text-5xl font-light tracking-[0.2em] text-theme-primary text-shimmer"
              >
                {progress}%
              </motion.div>

              {/* Progress bar container */}
              <div className="w-48 h-[1px] bg-theme-primary/10 mx-auto relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-theme-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status indicator */}
              <div className="font-body text-[9px] uppercase tracking-[0.3em] text-theme-text-muted">
                {progress < 40
                  ? 'Unfolding Invitation'
                  : progress < 80
                  ? 'Preloading Memories'
                  : 'Preparing Entrance'}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
