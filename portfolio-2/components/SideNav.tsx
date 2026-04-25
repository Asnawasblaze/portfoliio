import React from 'react';
import { motion } from 'framer-motion';

export const SideNav: React.FC = () => {
  return (
    <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-8 mix-blend-difference text-white">
       <div className="h-24 w-[1px] bg-white/50" />
       
       <div className="flex flex-col gap-6 font-mono text-[10px] tracking-widest">
         <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
            SCROLL TO EXPLORE
         </div>
       </div>

       <motion.div 
         animate={{ y: [0, 10, 0] }}
         transition={{ repeat: Infinity, duration: 2 }}
         className="w-4 h-4 rounded-full border border-white flex items-center justify-center mt-4"
       >
          <div className="w-1 h-1 bg-white rounded-full" />
       </motion.div>
    </div>
  );
};