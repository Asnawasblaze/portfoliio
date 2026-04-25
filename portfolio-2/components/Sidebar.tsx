import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Sparkles, 
  BrainCircuit, 
  Image as ImageIcon, 
  Mail, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  User,
  MoreVertical,
  Terminal
} from 'lucide-react';
import { ScrambleText } from './ui/ScrambleText';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, isMobile }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Handle auto-collapse on mobile when resizing
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile]); // eslint-disable-line

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Projects', icon: FolderKanban },
    { label: 'Experience', icon: Sparkles },
    { label: 'Skills', icon: BrainCircuit },
    { label: 'Gallery', icon: ImageIcon },
    { label: 'Contact', icon: Mail },
  ];

  const bottomItems = [
    { label: 'Settings', icon: Settings },
    { label: 'Log Out', icon: LogOut },
  ];

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 },
    mobileClosed: { x: '-100%' },
    mobileOpen: { x: 0, width: 280 }
  };

  const getVariant = () => {
    if (isMobile) return isOpen ? 'mobileOpen' : 'mobileClosed';
    return isOpen ? 'expanded' : 'collapsed';
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.nav
        variants={sidebarVariants}
        initial={false}
        animate={getVariant()}
        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col 
          bg-kpr-dark/95 backdrop-blur-xl border-r border-white/10
          shadow-[10px_0_30px_-10px_rgba(0,0,0,0.5)]
        `}
      >
        {/* === Header / Profile Section === */}
        <div className="p-4 border-b border-white/10 relative overflow-hidden group">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-kpr-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className={`flex items-center ${isOpen ? 'gap-4' : 'justify-center'} transition-all duration-300`}>
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-kpr-purple to-blue-500 p-[2px]">
                   <img 
                     src="https://picsum.photos/seed/kpravatar/100/100" 
                     className="w-full h-full rounded-full border-2 border-black object-cover" 
                     alt="Profile"
                   />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col overflow-hidden whitespace-nowrap"
                  >
                    <ScrambleText 
                       text="KPR_OPERATIVE" 
                       className="font-sans font-bold text-white text-sm tracking-wide" 
                       trigger={isOpen}
                    />
                    <span className="font-mono text-[10px] text-gray-400">UNIT-734 // ONLINE</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>

        {/* === Toggle Button (Desktop Only) === */}
        {!isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-20 w-6 h-6 bg-kpr-purple text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 border border-white/20"
          >
            {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        )}

        {/* === Main Navigation === */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 custom-scrollbar">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.label}
                icon={item.icon}
                label={item.label}
                isOpen={isOpen}
                isActive={activeItem === item.label}
                onClick={() => setActiveItem(item.label)}
              />
            ))}
          </ul>

           {/* Divider */}
           <div className="my-6 mx-4 border-t border-white/10" />

           <ul className="space-y-2 px-3">
             <SidebarItem 
                icon={Terminal}
                label="Console"
                isOpen={isOpen}
                isActive={activeItem === 'Console'}
                onClick={() => setActiveItem('Console')}
                isSpecial
             />
           </ul>
        </div>

        {/* === Footer Actions === */}
        <div className="p-3 border-t border-white/10 bg-black/20">
          <ul className="space-y-1">
             {bottomItems.map((item) => (
                <SidebarItem 
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isOpen={isOpen}
                  isActive={false}
                  onClick={() => {}}
                  isCompact
                />
             ))}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

// --- Helper Components ---

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
  isSpecial?: boolean;
  isCompact?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  isOpen, 
  isActive, 
  onClick,
  isSpecial = false,
  isCompact = false
}) => {
  return (
    <li className="relative group">
      {/* Active Indicator (Left Bar) */}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute left-0 top-0 bottom-0 w-1 bg-kpr-purple rounded-full shadow-[0_0_10px_#a855f7]"
        />
      )}

      {/* Background Glow on Hover */}
      <div className={`
        absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100
        ${isActive ? 'bg-white/10' : 'bg-white/5'}
      `} />

      <button
        onClick={onClick}
        className={`
          relative w-full flex items-center gap-4 rounded-lg transition-all duration-300 group
          ${isCompact ? 'p-2' : 'p-3'}
          ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
        `}
      >
        {/* Icon Container with Morph Effect */}
        <div className={`
          relative flex items-center justify-center transition-all duration-300
          ${isOpen ? '' : 'mx-auto'}
          ${isActive ? 'text-kpr-purple' : ''}
          ${isSpecial ? 'text-green-400' : ''}
        `}>
          <Icon 
            size={isCompact ? 18 : 22} 
            className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]' : ''}`}
          />
        </div>

        {/* Text Label with Scramble Effect */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <ScrambleText 
                text={label.toUpperCase()} 
                className={`
                  font-mono text-sm tracking-wider
                  ${isActive ? 'font-bold' : 'font-normal'}
                `}
                hoverTrigger={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip for Collapsed State */}
        {!isOpen && (
           <div className="absolute left-full ml-4 px-2 py-1 bg-kpr-purple text-white text-xs font-mono rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
             {label}
             {/* Tiny Arrow */}
             <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-kpr-purple rotate-45" />
           </div>
        )}
      </button>
    </li>
  );
};
