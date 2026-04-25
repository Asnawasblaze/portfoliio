import React from 'react';
import ScrambleText from './ScrambleText';
import BatAnimation from './BatAnimation';

const Footer: React.FC = () => {
  return (
    <>
    <section className="mt-[150px] w-full bg-black text-white py-32 px-16 min-h-[60vh] flex flex-col justify-between">
        <div><BatAnimation className='scale-[2.5] origin-top-left' /></div>
        <div className="text-[10vw] font-black tracking-tighter leading-[0.9] font-sans">
            <p>ASNAWAS <span className="text-[5vw]">©</span> 2025</p>
        </div>
    </section>

    <footer className="w-full bg-black text-white border-t border-[#333]">
      <div className="grid grid-cols-1 md:grid-cols-4 border-t border-[#333]">
        {/* Console Column */}
        <div className="p-8 border-r border-[#333] font-mono text-sm text-white/70 leading-loose">
            <div>// INITIALIZING</div>
            <div>NEW FILES IN DATABASE</div>
            <div className="my-4"></div>
            <div>KAI_53815.JPG</div>
            <div>AUDIO_LOG_2018116.WAV</div>
            <div className="my-4"></div>
            <div className="animate-pulse">ACTIVATE CONSOLE FOR ACCESS...</div>
        </div>

        {/* Discover More */}
        <div className="p-8 border-r border-[#333] font-mono">
            <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-white"></div>
                <span className="text-xs tracking-[0.2em]">DISCOVER MORE</span>
            </div>
            <ul className="space-y-2 font-bold text-lg">
                {['STORY', 'JOURNAL', 'MEDIA', 'GALLERY', 'ABOUT', 'CAREERS'].map(item => (
                    <li key={item}><ScrambleText text={item} /></li>
                ))}
            </ul>
        </div>

        {/* Join Conversation */}
        <div className="p-8 border-r border-[#333] font-mono">
            <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-white"></div>
                <span className="text-xs tracking-[0.2em]">JOIN THE CONVERSATION</span>
            </div>
             <ul className="space-y-3 text-sm text-white/80">
                {['TWITTER', 'DISCORD', 'INSTAGRAM', 'WHATSAPP'].map(item => (
                    <li key={item} className="hover:text-white transition-colors"><ScrambleText text={item} /></li>
                ))}
            </ul>
        </div>

        {/* Details */}
        <div className="p-8 font-mono">
            <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-white"></div>
                <span className="text-xs tracking-[0.2em]">MORE DETAILS</span>
            </div>
            <div className="text-sm text-white/80 mb-4">CONTACT</div>
            <div className="text-sm mb-8 hover:text-neonGreen cursor-pointer transition-colors">asnawasasnawas@gmail.com</div>
            <button className="border border-white bg-transparent text-white px-6 py-4 text-sm hover:bg-white hover:text-black transition-all w-full flex items-center justify-center gap-2">
                <span>↓</span>
                <span>DOWNLOAD CV</span>
            </button>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;