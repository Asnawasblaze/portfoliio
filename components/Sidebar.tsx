import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrambleText from './ScrambleText';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Playlist containing background instrumental audio
  const playlist = [
    '/music/timeless-instrumental.wav',
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(() => Math.floor(Math.random() * playlist.length));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('story');

  // Attempt autoplay on mount
  useEffect(() => {
    const attemptPlay = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.4;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.log("Autoplay blocked by browser policy:", e);
          setIsPlaying(false);
        }
      }
    };

    const timer = setTimeout(attemptPlay, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Play/Pause control for background music
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Slide-in and fade-in animations with GSAP
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        display: 'flex',
        opacity: 1
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3
      });
    } else {
      document.body.style.overflow = '';
      gsap.to(sidebarRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.in',
        opacity: 0,
        onComplete: () => {
          if (sidebarRef.current) sidebarRef.current.style.display = 'none';
        }
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3
      });
    }
  }, [isOpen]);

  // Set up IntersectionObserver to automatically highlight active scroll section
  useEffect(() => {
    const sections = ['story', 'protocol', 'journal', 'media', 'gallery', 'about'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Highlights when section passes middle of screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const menuItems = [
    { label: 'STORY', section: 'story', page: '001' },
    { label: 'PROTOCOL', section: 'protocol', page: '002' },
    { label: 'JOURNAL', section: 'journal', page: '003' },
    { label: 'MEDIA', section: 'media', page: '004' },
    { label: 'GALLERY', section: 'gallery', page: '005' },
    { label: 'ABOUT', section: 'about', page: '006' },
  ];

  const handleLinkClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <>
      <style>{`
        /* Self-contained keyframe animations for the audio visualizer */
        @keyframes visualizer-bar-1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes visualizer-bar-2 {
          0%, 100% { height: 16px; }
          50% { height: 8px; }
        }
        @keyframes visualizer-bar-3 {
          0%, 100% { height: 8px; }
          50% { height: 20px; }
        }
        @keyframes visualizer-bar-4 {
          0%, 100% { height: 20px; }
          50% { height: 6px; }
        }
        .animate-visualizer-1 { animation: visualizer-bar-1 0.8s ease-in-out infinite; }
        .animate-visualizer-2 { animation: visualizer-bar-2 0.7s ease-in-out infinite; }
        .animate-visualizer-3 { animation: visualizer-bar-3 0.9s ease-in-out infinite; }
        .animate-visualizer-4 { animation: visualizer-bar-4 0.6s ease-in-out infinite; }

        /* Hide scrollbars for the main sidebar navigation pane */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Overlay background */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 z-[998] opacity-0 pointer-events-none transition-opacity"
        onClick={onClose}
      />

      {/* Left Sidebar Drawer */}
      <aside
        ref={sidebarRef}
        className="fixed left-0 top-0 bottom-0 w-full max-w-[500px] bg-black z-[999] text-white transform -translate-x-full hidden flex-row border-r border-[#1c1c1c]"
      >
        {/* Main Content Area (Left Pane) */}
        <div className="flex-1 flex flex-col justify-between h-full overflow-y-auto no-scrollbar">
          
          {/* DISCOVER SECTION */}
          <div className="flex border-b border-[#1c1c1c] pt-24 pb-12 px-8 flex-1 min-h-0">
            {/* Left label column */}
            <div className="w-[120px] shrink-0 font-mono text-[10px] tracking-[0.2em] text-zinc-400 flex items-start pt-[14px]">
              <span className="inline-block w-1.5 h-1.5 bg-zinc-400 mr-2 mt-[3px]"></span>
              <ScrambleText text="DISCOVER" />
            </div>
            
            {/* Right content column - Navigation menu */}
            <div className="flex-1 flex flex-col justify-center">
              <ul className="flex flex-col gap-4">
                {menuItems.map((item, idx) => {
                  const isHighlighted = hoveredIdx !== null 
                    ? hoveredIdx === idx 
                    : activeSection === item.section;

                  return (
                    <li key={idx} className="relative flex items-center h-16">
                      <div className="flex items-center gap-3">
                        <button
                          onMouseEnter={() => setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          onClick={() => handleLinkClick(item.section)}
                          className={`group relative text-left transition-all duration-200 select-none ${
                            isHighlighted 
                              ? 'bg-[#CCFF00] text-black pl-5 pr-8 py-2 font-black' 
                              : 'text-white hover:text-[#CCFF00] font-bold py-2'
                          }`}
                          style={isHighlighted ? { 
                            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
                          } : undefined}
                        >
                          <span className="text-[3.2rem] leading-[0.85] tracking-tighter uppercase font-display font-black block !bg-transparent !text-inherit">
                            <ScrambleText text={item.label} className="!bg-transparent !text-inherit" />
                          </span>
                        </button>
                        
                        {/* Stacked page indicator */}
                        {isHighlighted && (
                          <div className="flex flex-col font-mono text-[9px] leading-tight text-[#CCFF00] tracking-wider font-bold">
                            <span>PAGE</span>
                            <span>{item.page}</span>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* CONNECT SECTION */}
          <div className="flex border-b border-[#1c1c1c] py-8 px-8 shrink-0">
            {/* Left label column */}
            <div className="w-[120px] shrink-0 font-mono text-[10px] tracking-[0.2em] text-zinc-400 flex items-start pt-1">
              <span className="inline-block w-1.5 h-1.5 bg-zinc-400 mr-2 mt-[3px]"></span>
              <ScrambleText text="CONNECT" />
            </div>
            
            {/* Right content column */}
            <div className="flex-1 flex flex-col gap-2">
              <a href="#" className="font-mono text-xs font-bold tracking-widest text-zinc-300 hover:text-[#CCFF00] transition-colors w-fit">
                <ScrambleText text="TWITTER" className="!bg-transparent !text-inherit" />
              </a>
              <a href="#" className="font-mono text-xs font-bold tracking-widest text-zinc-300 hover:text-[#CCFF00] transition-colors w-fit">
                <ScrambleText text="DISCORD" className="!bg-transparent !text-inherit" />
              </a>
            </div>
          </div>

          {/* BUY ON SECTION */}
          <div className="flex border-b border-[#1c1c1c] py-8 px-8 shrink-0">
            {/* Left label column */}
            <div className="w-[120px] shrink-0 font-mono text-[10px] tracking-[0.2em] text-zinc-400 flex items-start pt-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-zinc-400 mr-2 mt-[3px]"></span>
              <ScrambleText text="BUY ON" />
            </div>
            
            {/* Right content column */}
            <div className="flex-1 flex items-center">
              <a href="#" className="font-mono text-xs font-bold tracking-widest text-zinc-300 hover:text-[#CCFF00] transition-colors flex items-center w-fit">
                {/* SVG OpenSea-like Sailboat Icon */}
                <svg className="w-5 h-5 mr-2 text-inherit inline-block align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 18C4 18 6 15 12 15C18 15 20 18 20 18" strokeLinecap="round"/>
                  <path d="M12 3V15" strokeLinecap="round"/>
                  <path d="M12 5C12 5 17 8 12 11" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <ScrambleText text="OPENSEA" className="!bg-transparent !text-inherit" />
              </a>
            </div>
          </div>

          {/* FOOTER SECTION */}
          <div className="flex py-6 px-8 shrink-0 items-center">
            {/* Left column - language */}
            <div className="w-[120px] shrink-0 font-mono text-[10px] tracking-wider text-zinc-400 hover:text-[#CCFF00] transition-colors cursor-pointer">
              <ScrambleText text="US-EN  ⌄" />
            </div>
            
            {/* Right column - copyright */}
            <div className="flex-1 font-mono text-[10px] text-zinc-600">
              <ScrambleText text="© 2022" />
            </div>
          </div>

        </div>

        {/* Thin Right Strip (Control Column) */}
        <div className="w-[60px] shrink-0 border-l border-[#1c1c1c] flex flex-col items-center justify-between h-full relative bg-black">
          
          {/* Top Close Button Box */}
          <div className="w-full h-[60px] border-b border-[#1c1c1c] flex items-center justify-center">
            <button onClick={onClose} className="text-white hover:text-[#CCFF00] transition-colors p-2 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Center Crosshair Icon (Centered absolute on the vertical border line) */}
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-white">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16H28" stroke="currentColor" strokeWidth="1" />
              <path d="M16 4V28" stroke="currentColor" strokeWidth="1" />
              <path d="M16 4L13 7H19L16 4Z" fill="currentColor" />
              <path d="M16 28L13 25H19L16 28Z" fill="currentColor" />
              <path d="M4 16L7 13V19L4 16Z" fill="currentColor" />
              <path d="M28 16L25 13V19L28 16Z" fill="currentColor" />
              <rect x="14" y="14" width="4" height="4" transform="rotate(45 16 16)" fill="currentColor" />
            </svg>
          </div>

          {/* Bottom Audio Visualizer Button Box */}
          <div className="w-full h-[60px] border-t border-[#1c1c1c] flex items-center justify-center mt-auto">
            <audio ref={audioRef} src={playlist[currentTrack]} loop />
            <button 
              onClick={togglePlay} 
              className="flex items-end gap-[3px] h-5 w-6 hover:opacity-80 transition-opacity"
              title={isPlaying ? "Pause Music" : "Play Music"}
            >
              <span className={`w-[3px] bg-white rounded-t-sm transition-all duration-300 ${isPlaying ? 'h-4 animate-visualizer-1' : 'h-1'}`} />
              <span className={`w-[3px] bg-white rounded-t-sm transition-all duration-300 ${isPlaying ? 'h-4 animate-visualizer-2' : 'h-3'}`} />
              <span className={`w-[3px] bg-white rounded-t-sm transition-all duration-300 ${isPlaying ? 'h-4 animate-visualizer-3' : 'h-2'}`} />
              <span className={`w-[3px] bg-white rounded-t-sm transition-all duration-300 ${isPlaying ? 'h-4 animate-visualizer-4' : 'h-4'}`} />
            </button>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;