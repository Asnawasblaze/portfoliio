import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import WhoIsHe from './components/WhoIsHe';
import Protocol from './components/Protocol';
import Journal from './components/Journal';
import Keepers from './components/Keepers';
import Footer from './components/Footer';
import ScrambleText from './components/ScrambleText';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-sans antialiased relative">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main>
        <Hero />
        <WhoIsHe />

        <section id="story" className="bg-white text-black py-32 px-16 min-h-screen">
          <h2 className="page-title mb-8"><ScrambleText text="STORY" /></h2>
          <p className="body-text max-w-3xl opacity-80">
            I am a creative developer and designer focused on building immersive web experiences.
            Transitioning from traditional design to interactive code, I explore the boundaries
            between static visuals and dynamic user interfaces.
          </p>
        </section>

        <Protocol />
        <Journal />

        <section id="media" className="bg-black text-white py-32 px-16 min-h-screen">
          <h2 className="page-title mb-8"><ScrambleText text="MEDIA" /></h2>
          <p className="body-text opacity-60">Media content loading...</p>
        </section>

        <section id="gallery" className="bg-white text-black py-32 px-16 min-h-screen">
          <h2 className="page-title mb-8"><ScrambleText text="GALLERY" /></h2>
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            <div className="bg-gray-200 w-full h-full"></div>
            <div className="bg-gray-300 w-full h-full"></div>
          </div>
        </section>

        <section id="about" className="bg-black text-white py-32 px-16 min-h-screen">
          <h2 className="page-title mb-8"><ScrambleText text="ABOUT" /></h2>
          <p className="body-text opacity-60">More detailed about section content goes here.</p>
        </section>

        <section id="career" className="bg-white text-black py-32 px-16 min-h-screen">
          <h2 className="page-title mb-8"><ScrambleText text="CAREER" /></h2>
          <div className="grid grid-cols-2 gap-4 h-[600px]">
            <div className="bg-gray-100 w-full h-full p-8 flex flex-col justify-between hover:bg-gray-200 transition-all duration-300 group">
              <div className="label opacity-50">2023 — PRESENT</div>
              <div>
                <h3 className="mb-2 group-hover:translate-x-2 transition-transform">Senior Developer</h3>
                <p className="body-text opacity-60">Tech Giants Inc.</p>
              </div>
            </div>
            <div className="bg-gray-100 w-full h-full p-8 flex flex-col justify-between hover:bg-gray-200 transition-all duration-300 group">
              <div className="label opacity-50">2021 — 2023</div>
              <div>
                <h3 className="mb-2 group-hover:translate-x-2 transition-transform">Frontend Engineer</h3>
                <p className="body-text opacity-60">Creative Solutions</p>
              </div>
            </div>
          </div>
        </section>

        <Keepers />
      </main>

      <Footer />
    </div>
  );
};

export default App;