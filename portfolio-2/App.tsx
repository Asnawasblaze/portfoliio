import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { motion } from 'framer-motion';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true); // Default to open on desktop
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-kpr-light text-kpr-dark min-h-screen selection:bg-kpr-purple selection:text-white overflow-x-hidden">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        isMobile={isMobile}
      />

      {/* Top Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Main Content Area */}
      {/* Shifts content based on sidebar width on desktop */}
      <motion.main
        initial={false}
        animate={{ 
          marginLeft: isMobile ? 0 : (sidebarOpen ? 260 : 80) 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
        className="relative"
      >
        <Hero />
        
        {/* Transition Divider */}
        <div className="bg-kpr-light h-20 w-full relative z-20">
           <div className="absolute inset-x-0 bottom-0 h-16 bg-white rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]" />
        </div>

        <StorySection />
        <Marquee />
        
        {/* Call to Action Section */}
        <section className="bg-kpr-dark py-40 px-6 relative overflow-hidden">
           <div className="container mx-auto text-center relative z-10">
              <h2 className="font-sans font-black text-6xl md:text-9xl text-white mb-8 tracking-tighter">
                BEGIN YOUR<br/>JOURNEY
              </h2>
              <p className="font-mono text-gray-400 mb-12">Identify yourself. Choose your faction. Defend the Keep.</p>
              
              <div className="flex flex-col md:flex-row justify-center gap-6">
                 <button className="px-12 py-4 bg-white text-black font-sans font-black text-xl hover:scale-105 transition-transform rounded-sm">
                    ENTER APP
                 </button>
                 <button className="px-12 py-4 border border-white text-white font-sans font-black text-xl hover:bg-white hover:text-black transition-colors rounded-sm">
                    READ LORE
                 </button>
              </div>
           </div>
           
           {/* Background Image Blend */}
           <div className="absolute inset-0 z-0 opacity-20">
              <img src="https://picsum.photos/seed/space/1920/1080" className="w-full h-full object-cover grayscale" alt="Space Background" />
           </div>
        </section>
        
        <Footer />
      </motion.main>
    </div>
  );
}

export default App;