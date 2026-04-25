import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  scrambleSpeed?: number;
  scrambleDuration?: number;
  trigger?: boolean; // External trigger to restart animation
  hoverTrigger?: boolean; // Whether to trigger on hover automatically
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  as: Component = 'span',
  className = '',
  scrambleSpeed = 30,
  scrambleDuration = 400,
  trigger = false,
  hoverTrigger = true
}) => {
  const [display, setDisplay] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const length = text.length;
    let frame = 0;
    const totalFrames = scrambleDuration / scrambleSpeed;

    intervalRef.current = window.setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          // Reveal characters based on progress
          if (index < length * progress) {
            return char;
          }
          // Return random character
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(scrambled);

      if (frame >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, scrambleSpeed);
  };

  // Trigger on external prop change
  useEffect(() => {
    startScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, text]);

  const handleMouseEnter = () => {
    if (hoverTrigger) {
      setIsHovered(true);
      startScramble();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Component 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {display}
    </Component>
  );
};