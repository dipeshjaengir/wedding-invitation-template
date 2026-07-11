import { useState, useEffect } from 'react';

export const useCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch device / pointer type
    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    
    const updateDeviceStatus = (e) => {
      const isTouch = e.matches;
      setIsTouchDevice(isTouch);
      if (isTouch) {
        document.documentElement.classList.remove('custom-cursor-enabled');
      } else {
        document.documentElement.classList.add('custom-cursor-enabled');
      }
    };

    updateDeviceStatus(touchQuery);
    touchQuery.addEventListener('change', updateDeviceStatus);

    if (touchQuery.matches) {
      return () => {
        touchQuery.removeEventListener('change', updateDeviceStatus);
        document.documentElement.classList.remove('custom-cursor-enabled');
      };
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickable elements for hover effects
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');

      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      touchQuery.removeEventListener('change', updateDeviceStatus);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, [isVisible]);

  return { position, isHovering, isVisible, isTouchDevice };
};
