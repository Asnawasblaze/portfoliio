import React from 'react';
import ScrambleText from './ScrambleText';

const cards = [
  { title: 'THE WORLD', gradient: 'from-[#667eea] to-[#764ba2]', width: 'w-[400px]', height: 'h-[500px]', top: 'top-0', left: 'left-0' },
  { title: 'THE KEEP', gradient: 'from-[#f093fb] to-[#f5576c]', width: 'w-[350px]', height: 'h-[450px]', top: 'top-[100px]', left: 'left-[350px]' },
  { title: 'FACTIONS', gradient: 'from-[#4facfe] to-[#00f2fe]', width: 'w-[380px]', height: 'h-[400px]', top: 'top-[50px]', left: 'left-[750px]' },
  { title: 'PROTOCOL', gradient: 'from-[#43e97b] to-[#38f9d7]', width: 'w-[320px]', height: 'h-[480px]', top: 'top-[500px]', left: 'left-[100px]' },
  { title: 'JOURNAL', gradient: 'from-[#fa709a] to-[#fee140]', width: 'w-[400px]', height: 'h-[420px]', top: 'top-[550px]', left: 'left-[450px]' },
  { title: 'MEDIA', gradient: 'from-[#30cfd0] to-[#330867]', width: 'w-[360px]', height: 'h-[460px]', top: 'top-[600px]', left: 'left-[900px]' },
];

const Keepers: React.FC = () => {
  return (
    <section className="bg-white text-black min-h-[1200px] w-full">
      <div className="py-24 px-16 max-w-[1400px] mx-auto relative">
        <h2 className="text-[8rem] font-black tracking-tighter mb-16 leading-[0.9]">KEEPERS</h2>

        <div className="relative min-h-[1200px] w-full hidden lg:block">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`absolute ${card.width} ${card.height} ${card.top} ${card.left} bg-white border border-gray-200 overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group`}
            >
              <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                <div className="w-2 h-2 bg-neonGreen"></div>
                <span className="text-sm font-bold tracking-wider text-black/80 group-hover:text-black">
                  <ScrambleText text={card.title} />
                </span>
              </div>
              <div className={`w-full h-full bg-gradient-to-br ${card.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>

        {/* Mobile Fallback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
          {cards.map((card, idx) => (
            <div key={idx} className="w-full aspect-[3/4] relative bg-white border border-gray-200 overflow-hidden shadow-lg">
              <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                <div className="w-2 h-2 bg-neonGreen"></div>
                <span className="text-sm font-bold tracking-wider"><ScrambleText text={card.title} /></span>
              </div>
              <div className={`w-full h-full bg-gradient-to-br ${card.gradient}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Keepers;