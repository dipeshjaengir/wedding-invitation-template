import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

export const Cursor = () => {
  const { position, isHovering, isVisible, isTouchDevice } = useCursor();

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for lagging/trailing ring
  const springConfig = { damping: 28, stiffness: 200, mass: 0.6 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;
    cursorX.set(position.x);
    cursorY.set(position.y);
  }, [position.x, position.y, isTouchDevice, cursorX, cursorY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-theme-primary pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
          borderColor: isHovering ? 'var(--theme-accent)' : 'var(--theme-primary)',
        }}
      />
      {/* Inner sharp dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-theme-primary pointer-events-none z-[9999] shadow-[0_0_10px_var(--theme-primary)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 0.7 : 1,
        }}
      />
    </>
  );
};

export default Cursor;
