import React, { useState, useEffect } from 'react';
import ScrambleText from './ScrambleText';
import BatAnimation from './BatAnimation';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Determine if we are in a light or dark section
      // Simplification: Dark if scroll < 100vh (hero) or in specific dark sections
      // For real implementation, intersection observer is better, but scroll position is faster for this demo
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Assuming alternating sections. 
      // Hero: Dark
      // Story: Light
      // Protocol: Dark
      // Journal: Light
      // Media: Dark
      // Gallery: Light
      // About: Dark
      // Careers: Light

      // Rough estimation based on vh
      const vh = window.innerHeight;
      const sectionIndex = Math.floor((scrollY + 100) / vh);

      if (sectionIndex === 0 || sectionIndex === 1) {
        setIsDark(false);
      } else {
        setIsDark(sectionIndex % 2 === 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColorClass = isDark ? 'text-white' : 'text-black';
  const borderColorClass = isDark ? 'border-white' : 'border-black';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-12 py-6 flex justify-between items-center transition-colors duration-300 bg-transparent mix-blend-difference`}>
      <div className="flex-1 flex items-center">
        <BatAnimation />
      </div>

      <div className="flex-1 flex justify-center">
        <nav>
          <ul className={`flex gap-10 list-none text-xs tracking-wider nav-item ${textColorClass}`}>
            <li><a href="#project"><ScrambleText text="IDEAS" variant="decrypt-mask" autoPlay /></a></li>
            <li><a href="#keep"><ScrambleText text="PROJECTS" variant="decrypt-mask" autoPlay /></a></li>
            <li><a href="#factions"><ScrambleText text="CERTIFICATES" variant="decrypt-mask" autoPlay /></a></li>
            <li><a href="#game"><ScrambleText text="BOARED ?" variant="decrypt-mask" autoPlay /></a></li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        <button className={`bg-white text-black px-5 py-2 text-sm font-medium hover:bg-gray-200 transition-colors`}>
          <ScrambleText text="Download CV" variant="decrypt-mask" autoPlay />
        </button>
        <button
          onClick={onMenuClick}
          className={`bg-transparent border-none text-xl cursor-pointer p-2 flex items-center gap-2 text-white mix-blend-difference`}
        >
          <span className="text-xs font-normal tracking-widest">☰☰</span>
        </button>
      </div>
    </header>
  );
};

export default Header;