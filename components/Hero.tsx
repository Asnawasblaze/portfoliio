import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftLinksRef = useRef<HTMLDivElement>(null);
  const rightInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Entrance Animations
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 80, scale: 0.95 },
      { duration: 1.4, opacity: 1, y: 0, scale: 1, ease: 'power4.out' }
    );

    tl.fromTo(imageRef.current,
      { opacity: 0, y: 100, scale: 1.05 },
      { duration: 1.6, opacity: 1, y: 0, scale: 1, ease: 'power3.out' },
      '-=1.0'
    );

    tl.fromTo([leftLinksRef.current, rightInfoRef.current],
      { opacity: 0, y: 20 },
      { duration: 1.0, opacity: 1, y: 0, ease: 'power2.out', stagger: 0.15 },
      '-=0.8'
    );

    // 2. Mouse Move Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - width / 2) / (width / 2); // -1 to 1
      const mouseY = (e.clientY - height / 2) / (height / 2); // -1 to 1

      // Move title slightly opposite to mouse
      gsap.to(titleRef.current, {
        x: mouseX * -20,
        y: mouseY * -20,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Move portrait slightly with mouse
      gsap.to(imageRef.current, {
        x: mouseX * 15,
        y: mouseY * 15,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="w-full h-screen relative flex items-center justify-center overflow-hidden bg-[#ecebe7] text-black select-none"
    >
      {/* Background Avatar (Transparent PNG) */}
      <div className="absolute inset-0 z-10 flex justify-center items-end pointer-events-none">
        <img
          ref={imageRef}
          src="/avatar.png"
          alt="Avatar"
          className="h-[80vh] sm:h-[85vh] md:h-[90vh] lg:h-[95vh] xl:h-[100vh] w-auto object-contain object-bottom pointer-events-none"
        />
      </div>

      {/* Big Bold Headline Behind Subject */}
      <div
        ref={titleRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-4"
      >
        <h1 className="hero-title text-center whitespace-nowrap text-black uppercase">
          Portfolio
        </h1>
      </div>

      {/* Left Links - Socials */}
      <div
        ref={leftLinksRef}
        className="absolute bottom-8 left-6 md:bottom-16 md:left-12 z-20 flex flex-col gap-2.5 label text-black"
      >
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-50 transition-opacity duration-300"
        >
          <i className="fa-brands fa-linkedin text-sm"></i> Linkedin
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-50 transition-opacity duration-300"
        >
          <i className="fa-brands fa-twitter text-sm"></i> Twitter
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-50 transition-opacity duration-300"
        >
          <i className="fa-brands fa-instagram text-sm"></i> Instagram
        </a>
      </div>

      {/* Right Info - Role */}
      <div
        ref={rightInfoRef}
        className="absolute bottom-8 right-6 md:bottom-16 md:right-12 z-20 text-right text-black"
      >
        <p className="hero-title text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem]">
          // Web Designer
        </p>
        <p className="hero-title text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem]">
          Art Director
        </p>
      </div>
    </section>
  );
};

export default Hero;