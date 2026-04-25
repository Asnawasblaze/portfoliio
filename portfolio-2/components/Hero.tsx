import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TabFolder } from './ui/TabFolder';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 overflow-hidden bg-kpr-light">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-purple-100 to-transparent opacity-50" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Title */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
                  Welcome to the Keep
                </span>
             </div>
             
             <h1 className="font-sans font-extrabold text-6xl md:text-8xl leading-[0.9] tracking-tighter text-black mb-8">
               RECLAIM <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-kpr-purple to-blue-500">
                 YOUR WORLD
               </span>
             </h1>

             <p className="font-mono text-sm md:text-base text-gray-600 max-w-md leading-relaxed mb-10">
               A collective of 10,000 unique identities building a new society on the edge of civilization. Join the factions. Protect the Keep.
             </p>

             <button className="w-fit group relative px-8 py-4 bg-transparent border-2 border-black rounded-lg overflow-hidden">
               <span className="relative z-10 font-bold font-mono group-hover:text-white transition-colors duration-300">EXPLORE MAP_01</span>
               <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
             </button>
          </motion.div>
        </div>

        {/* Right Column: Visuals */}
        <div className="lg:col-span-7 relative h-[600px] md:h-[800px]">
          {/* Back Card */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-10 right-0 w-3/4 md:w-2/3 z-10"
          >
             <TabFolder 
              label="FACTION: RED" 
              headerColor="bg-rose-200" 
              bodyColor="bg-rose-100"
              className="shadow-2xl"
            >
               <img 
                 src="https://picsum.photos/seed/kpr1/600/800" 
                 alt="Character" 
                 className="w-full h-[300px] md:h-[500px] object-cover rounded-xl filter contrast-125 mix-blend-multiply"
               />
               <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                 <h3 className="font-sans font-bold text-4xl text-rose-900">CRIMSON</h3>
                 <p className="font-mono text-xs text-rose-800 mt-2">/// SECTOR 04</p>
               </div>
             </TabFolder>
          </motion.div>

          {/* Front Card */}
          <motion.div 
             style={{ y: y2 }}
             className="absolute bottom-20 left-0 w-3/4 md:w-2/3 z-20"
          >
            <TabFolder 
              label="KEEPER 0X12" 
              headerColor="bg-kpr-purple" 
              bodyColor="bg-[#bda0ea]"
              darkText={false}
              className="shadow-2xl"
            >
               <img 
                 src="https://picsum.photos/seed/kpr2/600/800" 
                 alt="Character" 
                 className="w-full h-[300px] md:h-[500px] object-cover rounded-xl mix-blend-overlay opacity-80"
               />
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="font-bold text-white">01</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                 <h3 className="font-sans font-bold text-4xl">NEO-TOKYO</h3>
                 <p className="font-mono text-xs opacity-80 mt-2">/// STATUS: ONLINE</p>
               </div>
            </TabFolder>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Grid */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-10 pointer-events-none">
        <div className="w-full h-full grid grid-cols-6 grid-rows-6">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-black" />
          ))}
        </div>
      </div>
    </section>
  );
};