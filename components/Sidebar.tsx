import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrambleText from './ScrambleText';
import BatAnimation from './BatAnimation';

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

  const prevTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) audioRef.current.play();
    }
  };

  const nextTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) audioRef.current.play();
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
        className="fixed left-0 top-0 bottom-0 w-full max-w-[700px] bg-black z-[999] text-white transform -translate-x-full hidden flex-row border-r border-[#1c1c1c]"
      >
        {/* Main Content Area (Left Pane) */}
        <div className="flex-1 flex flex-col justify-between h-full overflow-y-auto no-scrollbar">
          
          {/* DISCOVER SECTION */}
          <div className="flex border-b border-[#1c1c1c] pt-20 pb-8 px-8 flex-1 min-h-0">
            {/* Left label column */}
            <div className="w-[100px] md:w-[120px] shrink-0 font-mono text-[10px] tracking-[0.2em] text-zinc-400 flex items-start pt-[14px]">
              <span className="inline-block w-1.5 h-1.5 bg-zinc-400 mr-2 mt-[3px]"></span>
              <ScrambleText text="DISCOVER" />
            </div>
            
            {/* Right content column - Navigation menu starting from top */}
            <div className="flex-1 flex flex-col justify-start pt-1">
              <ul className="flex flex-col gap-1.5">
                {menuItems.map((item, idx) => {
                  const isHighlighted = hoveredIdx !== null 
                    ? hoveredIdx === idx 
                    : activeSection === item.section;

                  return (
                    <li key={idx} className="relative flex items-center">
                      <div className="flex items-start gap-4">
                        <button
                          onMouseEnter={() => setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          onClick={() => handleLinkClick(item.section)}
                          className={`group relative text-left transition-all duration-150 select-none ${
                            isHighlighted 
                              ? 'bg-[#CCFF00] text-black pl-4 pr-6 py-1 font-black' 
                              : 'text-white hover:text-[#CCFF00] font-bold py-1'
                          }`}
                          style={isHighlighted ? { 
                            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
                          } : undefined}
                        >
                          <span className="text-[3.6rem] md:text-[4.2rem] leading-[0.85] tracking-tighter uppercase font-display font-black block !bg-transparent !text-inherit">
                            <ScrambleText text={item.label} className="!bg-transparent !text-inherit" />
                          </span>
                        </button>
                        
                        {/* Stacked page indicator aligned to top-right of the block */}
                        {isHighlighted && (
                          <div className="flex flex-col font-mono text-[9px] leading-tight text-[#CCFF00] tracking-wider font-bold mt-1.5">
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
          <div className="flex border-b border-[#1c1c1c] py-6 px-8 shrink-0">
            {/* Left label column */}
            <div className="w-[100px] md:w-[120px] shrink-0 font-mono text-[10px] tracking-[0.2em] text-zinc-400 flex items-start pt-1">
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
              <a href="#" className="font-mono text-xs font-bold tracking-widest text-zinc-300 hover:text-[#CCFF00] transition-colors w-fit">
                <ScrambleText text="INSTAGRAM" className="!bg-transparent !text-inherit" />
              </a>
              <a href="#" className="font-mono text-xs font-bold tracking-widest text-zinc-300 hover:text-[#CCFF00] transition-colors w-fit">
                <ScrambleText text="LINKEDIN" className="!bg-transparent !text-inherit" />
              </a>
              <a href="#" className="font-mono text-xs font-bold tracking-widest text-zinc-300 hover:text-[#CCFF00] transition-colors w-fit">
                <ScrambleText text="GITHUB" className="!bg-transparent !text-inherit" />
              </a>
            </div>
          </div>

          {/* PLAYLIST SECTION */}
          <div className="flex border-b border-[#1c1c1c] py-6 px-8 shrink-0">
            {/* Left label column */}
            <div className="w-[100px] md:w-[120px] shrink-0 font-mono text-[10px] tracking-[0.2em] text-zinc-400 flex items-start pt-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-zinc-400 mr-2 mt-[3px]"></span>
              <ScrambleText text="PLAYLIST" />
            </div>
            
            {/* Right content column - Controls */}
            <div className="flex-1 flex items-center gap-4">
              {/* Prev Button */}
              <button 
                onClick={prevTrack} 
                className="text-zinc-300 hover:text-[#CCFF00] transition-colors p-1"
                title="Previous Track"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>
              
              {/* Play/Pause Button */}
              <button 
                onClick={togglePlay} 
                className="text-zinc-300 hover:text-[#CCFF00] transition-colors p-1"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              {/* Next Button */}
              <button 
                onClick={nextTrack} 
                className="text-zinc-300 hover:text-[#CCFF00] transition-colors p-1"
                title="Next Track"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* FOOTER SECTION */}
          <div className="flex py-5 px-8 shrink-0 items-center">
            {/* Left column - language */}
            <div className="w-[100px] md:w-[120px] shrink-0 font-mono text-[10px] tracking-wider text-zinc-400 hover:text-[#CCFF00] transition-colors cursor-pointer">
              <ScrambleText text="IN-EN  ⌄" />
            </div>
            
            {/* Right column - copyright */}
            <div className="flex-1 font-mono text-[10px] text-zinc-600">
              <ScrambleText text="© 2025" />
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

          {/* Center - Bat Logo (replaces the crosshair icon, scaled to fit the 60px strip width) */}
          <div className="flex-1 flex items-center justify-center scale-[0.8] origin-center text-white">
            <BatAnimation />
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