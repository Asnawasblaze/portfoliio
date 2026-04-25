import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

const navItems = [
  { label: 'PROJECT', href: '#' },
  { label: 'THE KEEP', href: '#' },
  { label: 'FACTIONS', href: '#' },
  { label: 'WORLD', href: '#' },
];

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 pointer-events-auto">
        <div className={`
          relative flex items-center justify-between px-6 py-3 rounded-full
          ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border border-black/5' : 'bg-transparent'}
        `}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rotate-45" />
            </div>
            <span className="font-bold font-sans text-xl tracking-tighter hidden md:block">KPR</span>
          </div>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-xs font-bold tracking-widest hover:text-kpr-purple transition-colors"
              >
                • {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden md:block">
              <button className="px-6 py-2 bg-black text-white font-mono text-xs font-bold rounded-lg hover:bg-kpr-purple transition-colors">
                SIGN IN
              </button>
            </div>

            {/* Mobile Toggle Triggering Sidebar */}
            <button 
              className="md:hidden p-2 text-black"
              onClick={onMenuClick}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};