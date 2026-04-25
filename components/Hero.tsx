import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LiquidEther from './LiquidEther';

const Hero: React.FC = () => {

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Animate 3D image entrance
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 100,
        },
        {
          duration: 1.5,
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power3.out',
          delay: 0.4
        }
      );
    }

  }, []);

  return (
    <section id="hero" className="w-full h-screen relative flex justify-center items-end overflow-hidden text-white bg-black">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Static Portfolio Text */}
      <div className="absolute top-[180px] left-16 z-[40] font-black leading-[0.9] select-none font-gridbox hidden lg:block">
        <span className="block text-[5.5rem] tracking-[0.08em]">ASNAWAS'S</span>
        <span className="block text-[7.6rem] tracking-[0.1em]">PORTFOLIO</span>
      </div>



      {/* 3D Avatar */}
      <img
        ref={imageRef}
        src="/avatar.png"
        alt="3D Avatar"
        className="absolute bottom-0 right-0 z-[30] max-w-[800px] w-auto h-[85vh] object-contain object-bottom pointer-events-none"
      />
    </section>
  );
};

export default Hero;