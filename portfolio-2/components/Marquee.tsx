import React from 'react';
import { motion } from 'framer-motion';

export const Marquee: React.FC = () => {
  return (
    <div className="bg-kpr-dark py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
      
      {/* Top Border Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-kpr-purple via-white to-kpr-purple" />

      <div className="relative z-10">
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...Array(4)].map((_, i) => (
               <React.Fragment key={i}>
                <span className="text-8xl md:text-[10rem] font-sans font-black text-white leading-none">
                  KEEPERS
                </span>
                <span className="text-8xl md:text-[10rem] font-sans font-black text-transparent stroke-text leading-none" style={{ WebkitTextStroke: "2px #a855f7" }}>
                  PROTOCOL
                </span>
                <span className="text-8xl md:text-[10rem] font-sans font-black text-white leading-none">
                  10K
                </span>
               </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-20">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map((n) => (
               <div key={n} className="aspect-square bg-gray-800 rounded-2xl overflow-hidden relative group">
                  <img 
                    src={`https://picsum.photos/seed/avatar${n}/400/400`} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    alt="Avatar"
                  />
                  <div className="absolute inset-0 border-2 border-white/10 group-hover:border-kpr-purple transition-colors duration-300 rounded-2xl" />
                  <div className="absolute bottom-4 left-4 font-mono text-xs text-white bg-black px-2 py-1">
                     KPR #{2000 + n}
                  </div>
               </div>
            ))}
         </div>
         
         <div className="mt-12 text-center">
            <p className="font-mono text-gray-400 text-sm mb-6">JOIN THE COLLECTIVE TODAY</p>
            <button className="bg-white text-black font-bold font-sans px-10 py-4 text-xl rounded-full hover:bg-kpr-purple hover:text-white transition-colors">
               MINT ACCESS PASS
            </button>
         </div>
      </div>
    </div>
  );
};