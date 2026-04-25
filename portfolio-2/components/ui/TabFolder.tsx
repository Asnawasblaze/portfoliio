import React from 'react';
import { motion } from 'framer-motion';

interface TabFolderProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  headerColor?: string;
  bodyColor?: string;
  darkText?: boolean;
}

export const TabFolder: React.FC<TabFolderProps> = ({ 
  children, 
  label = "SYSTEM", 
  className = "",
  headerColor = "bg-kpr-light",
  bodyColor = "bg-kpr-light",
  darkText = true
}) => {
  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Tab Header */}
      <div className="flex items-end h-12">
        <div className={`${headerColor} h-full px-8 flex items-center rounded-t-2xl min-w-[150px]`}>
          <span className={`font-mono text-xs font-bold tracking-widest ${darkText ? 'text-kpr-dark' : 'text-white'}`}>
            • {label.toUpperCase()}
          </span>
        </div>
        {/* The slanted connector - simulating SVG path with borders */}
        <div 
          className={`h-full w-8 ${headerColor}`} 
          style={{ 
            clipPath: 'polygon(0 0, 0% 100%, 100% 100%)' 
          }}
        />
      </div>
      
      {/* Main Body */}
      <div className={`${bodyColor} w-full rounded-b-3xl rounded-tr-3xl p-6 md:p-10 relative overflow-hidden`}>
        {children}
      </div>
    </div>
  );
};