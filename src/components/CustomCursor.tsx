import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent | TouchEvent) => {
      if (!isVisible) setIsVisible(true);
      let x, y;
      if ('touches' in e) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }
      setPosition({ x, y });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleTouchStart = (e: TouchEvent) => {
      updatePosition(e);
      setIsClicking(true);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('touchmove', updatePosition);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('touchmove', updatePosition);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isClicking ? 0.85 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 40,
        mass: 0.1
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Minimalist Dot */}
        <circle cx="16" cy="16" r="4" className="fill-theme-accent" />
        
        {/* Minimalist Ring */}
        <circle cx="16" cy="16" r="14" className="stroke-theme-accent" strokeWidth="1.5" opacity="0.4" />
      </svg>
    </motion.div>
  );
}
