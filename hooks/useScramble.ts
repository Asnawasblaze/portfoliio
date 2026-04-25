import { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export const useScramble = (text: string, speed: number = 30) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScramble = useCallback(() => {
    setIsHovering(true);
    setActiveIndex(0);
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const currentIndex = Math.floor(iteration);
      setActiveIndex(currentIndex < text.length ? currentIndex : -1);

      setDisplayText(prev => 
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsHovering(false);
        setActiveIndex(-1);
        setDisplayText(text);
      }

      iteration += 1 / 3;
    }, speed);
  }, [text, speed]);

  const stopScramble = useCallback(() => {
    setIsHovering(false);
    setActiveIndex(-1);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { displayText, startScramble, stopScramble, isHovering, activeIndex };
};