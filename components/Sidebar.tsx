import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrambleText from './ScrambleText';
import BatAnimation from './BatAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPlay, faPause, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder for music files - add your tracks here later
  const playlist = [
    '/music/timeless-instrumental.wav',
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(() => Math.floor(Math.random() * playlist.length));

  useEffect(() => {
    const attemptPlay = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.log("Autoplay blocked by browser policy:", e);
          setIsPlaying(false);
        }
      }
    };

    // Small timeout to ensure DOM is ready and possibly bypass some race conditions
    const timer = setTimeout(attemptPlay, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    const newTrack = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(newTrack);
    if (audioRef.current) {
      audioRef.current.src = playlist[newTrack];
      if (isPlaying) audioRef.current.play();
    }
  };

  const nextTrack = () => {
    const newTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(newTrack);
    if (audioRef.current) {
      audioRef.current.src = playlist[newTrack];
      if (isPlaying) audioRef.current.play();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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

  const menuItems = [
    { label: 'ABOUT', section: 'story', page: '001' },
    { label: 'PROJECTS', section: 'protocol', page: '002' },
    { label: 'EDUCATION', section: 'journal', page: '003' },
    { label: 'SKILLS', section: 'media', page: '004' },
    { label: 'GALLERY', section: 'gallery', page: '005' },
    { label: 'ABOUT', section: 'about', page: '006' },
    { label: 'CAREER', section: 'career', page: '007' },
    { label: 'BOARED ?', section: 'game', page: '008' },
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
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 z-[998] opacity-0 pointer-events-none transition-opacity"
        onClick={onClose}
      />
      <aside
        ref={sidebarRef}
        className="fixed left-4 top-4 bottom-4 w-[80%] max-w-[750px] bg-black z-[999] text-white transform -translate-x-[calc(100%+1rem)] hidden shadow-[0_0_40px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden"
      >
        <div className="flex h-full w-full relative">
          {/* Main content area with left labels */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* DISCOVER Section - Navigation */}
            <div className="flex flex-1 min-h-0">
              {/* DISCOVER label */}
              <div className="w-[100px] shrink-0 py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-[5px] h-[5px] bg-white"></div>
                  <ScrambleText text="DISCOVER" className="text-[10px] tracking-[0.15em] font-mono" />
                </div>
              </div>
              {/* Navigation Menu */}
              <div className="flex-1 py-4 px-6 overflow-y-auto">
                <ul className="space-y-0">
                  {menuItems.map((item, idx) => (
                    <li key={idx} className="relative group">
                      <button
                        onClick={() => handleLinkClick(item.section)}
                        className="text-[2.8rem] font-bold leading-[1.1] tracking-tight hover:opacity-100 transition-opacity flex items-baseline"
                      >
                        <ScrambleText text={item.label} />
                        <span className="text-[9px] font-mono font-normal opacity-0 group-hover:opacity-100 transition-opacity ml-3 whitespace-nowrap self-start mt-1">
                          PAGE<br />{item.page}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#333]"></div>

            {/* CONNECT Section - Social Links */}
            <div className="flex">
              {/* CONNECT label */}
              <div className="w-[100px] shrink-0 py-2 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-[5px] h-[5px] bg-white"></div>
                  <ScrambleText text="CONNECT" className="text-[10px] tracking-[0.15em] font-mono" />
                </div>
              </div>
              {/* Social Links */}
              <div className="flex-1 py-2 px-6">
                <ul className="space-y-0">
                  <li><a href="#" className="text-xs hover:opacity-70 tracking-wider"><ScrambleText text="TWITTER" /></a></li>
                  <li><a href="#" className="text-xs hover:opacity-70 tracking-wider"><ScrambleText text="DISCORD" /></a></li>
                  <li><a href="#" className="text-xs hover:opacity-70 tracking-wider"><ScrambleText text="INSTAGRAM" /></a></li>
                  <li><a href="#" className="text-xs hover:opacity-70 tracking-wider"><ScrambleText text="LINKEDIN" /></a></li>
                  <li><a href="#" className="text-xs hover:opacity-70 tracking-wider"><ScrambleText text="GITHUB" /></a></li>
                </ul>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#333]"></div>

            {/* PLAYLIST Section - Music Controls */}
            <div className="flex">
              {/* PLAYLIST label */}
              <div className="w-[100px] shrink-0 py-2 px-4">
                <div className="flex items-center gap-2">
                  <div className="w-[5px] h-[5px] bg-white"></div>
                  <ScrambleText text="PLAYLIST" className="text-[10px] tracking-[0.15em] font-mono" />
                </div>
              </div>
              {/* Music Player Controls */}
              <div className="flex-1 py-2 px-6 flex items-center gap-4">
                <audio ref={audioRef} src={playlist[currentTrack]} />
                <button
                  onClick={prevTrack}
                  className="text-white hover:text-neonGreen transition-colors"
                  title="Previous"
                >
                  <FontAwesomeIcon icon={faBackwardStep} size="sm" />
                </button>
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-neonGreen transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" />
                </button>
                <button
                  onClick={nextTrack}
                  className="text-white hover:text-neonGreen transition-colors"
                  title="Next"
                >
                  <FontAwesomeIcon icon={faForwardStep} size="sm" />
                </button>
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-neonGreen transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} size="sm" />
                </button>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#333]"></div>

            {/* Footer - US-EN and Copyright */}
            <div className="flex">
              {/* US-EN label */}
              <div className="w-[100px] shrink-0 py-3 px-4">
                <ScrambleText text="US-EN  ⌄" className="text-[10px] font-mono" />
              </div>
              {/* Copyright */}
              <div className="flex-1 py-3 px-6">
                <ScrambleText text="© 2022" className="text-[10px] font-mono opacity-60" />
              </div>
            </div>
          </div>

          {/* Right Column - Close Button & decorative */}
          <div className="w-[60px] border-l border-[#333] flex flex-col items-center py-4 shrink-0">
            <button onClick={onClose} className="text-2xl font-light hover:text-neonGreen transition-colors">
              ×
            </button>

            <div className="flex-1 flex items-center justify-center">
              <div className="text-white text-3xl font-light">✦</div>
            </div>

            <div className="scale-50 origin-center">
              <BatAnimation />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;