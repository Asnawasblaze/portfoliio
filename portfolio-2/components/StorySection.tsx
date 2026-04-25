import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TabFolder } from './ui/TabFolder';

const features = [
  {
    title: "A FAMILIAR WORLD",
    subtitle: "SET ON A DIFFERENT PATH",
    desc: "Isolated within the New Eden safe zone, humanity struggles to avoid discouragement while the Keepers maintain order.",
    image: "https://picsum.photos/seed/cyber/800/600",
    color: "bg-blue-100",
    header: "bg-blue-200"
  },
  {
    title: "YOU ARE A KEEPER",
    subtitle: "AGENT OF CHANGE",
    desc: "Every Keeper is born endowed with attributes from a collection of over 400 meticulously hand-painted assets.",
    image: "https://picsum.photos/seed/punk/800/600",
    color: "bg-orange-100",
    header: "bg-orange-200"
  },
  {
    title: "CHOOSE YOUR SIDE",
    subtitle: "PROTECT OR DESTROY",
    desc: "What path will you forge as you become the Keeper of your destiny? Join a faction and compete for territory.",
    image: "https://picsum.photos/seed/city/800/600",
    color: "bg-emerald-100",
    header: "bg-emerald-200"
  }
];

export const StorySection: React.FC = () => {
  return (
    <section className="bg-white relative py-20">
      <div className="container mx-auto px-4 md:px-8">
        {features.map((feature, index) => (
          <FeatureRow key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};

interface FeatureRowProps {
  feature: typeof features[0];
  index: number;
}

const FeatureRow: React.FC<FeatureRowProps> = ({ feature, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="min-h-[80vh] flex items-center justify-center py-20">
      <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center w-full ${isEven ? '' : 'md:flex-row-reverse'}`}>
        
        {/* Text Content */}
        <motion.div 
          style={{ opacity }}
          className="flex-1 space-y-6"
        >
          <div className="flex items-center gap-4">
             <span className="font-mono text-sm font-bold bg-black text-white px-2 py-1 rounded">0{index + 1}</span>
             <span className="h-[1px] w-20 bg-black/20" />
          </div>
          <h2 className="font-sans font-black text-5xl md:text-7xl leading-none uppercase">
            {feature.title} <br/>
            <span className="text-gray-400">{feature.subtitle}</span>
          </h2>
          <p className="font-mono text-gray-600 max-w-md leading-relaxed">
            {feature.desc}
          </p>
        </motion.div>

        {/* Image Content */}
        <motion.div 
          style={{ y }}
          className="flex-1 w-full"
        >
          <TabFolder 
            label="ARCHIVE_DATA" 
            headerColor={feature.header} 
            bodyColor={feature.color}
            className="w-full transform transition-transform hover:scale-[1.02] duration-500"
          >
             <div className="aspect-[4/3] overflow-hidden rounded-lg relative group">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* Tech Overlays */}
                <div className="absolute top-4 left-4 border border-black/20 px-2 py-1 bg-white/50 backdrop-blur font-mono text-[10px]">
                   IMG_SEQ_{index}42
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border border-black rounded-full flex items-center justify-center animate-spin-slow">
                   <span className="block w-2 h-2 bg-black rounded-full" />
                </div>
             </div>
          </TabFolder>
        </motion.div>

      </div>
    </div>
  );
};