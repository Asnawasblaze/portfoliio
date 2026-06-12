import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhoIsHe: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>('.who-block');

      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          {
            x: 110,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 86%',
              end: 'top 62%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();

        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="who-is-he"
      ref={sectionRef}
      className="relative min-h-[220vh] bg-[#ecebe7] text-black overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] [background-size:3px_3px] pointer-events-none" />

      <svg
        className="absolute top-0 left-[45%] h-full w-[55%] -translate-x-1/2 pointer-events-none z-10"
        viewBox="0 0 760 2200"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0 120 C430 360 430 1840 0 2080"
          fill="none"
          stroke="rgba(0,0,0,0.85)"
          strokeWidth="3"
        />
      </svg>

      <div className="relative z-20 flex min-h-[220vh]">
        <div className="w-[45%] border-r border-black/15">
          <div className="sticky top-0 h-screen flex items-end justify-center px-10 pb-0">
            <img
              src="/avatar_1.png"
              alt="Who is he portrait"
              className="h-[92vh] w-auto object-contain object-bottom drop-shadow-[0_30px_45px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>

        <div className="w-[55%] pl-24 pr-12 py-24 flex flex-col gap-24">
          <article className="who-block ml-8 max-w-[420px]">
            <p className="caption opacity-70">01. who is he</p>
            <h3 className="mt-4 h3">A. A curious builder</h3>
            <p className="mt-5 body-text opacity-80">
              A creative developer who blends visual storytelling with interactive web systems.
            </p>
          </article>

          <article className="who-block ml-24 max-w-[520px] rounded-[36px] border-2 border-black px-8 py-6 bg-white/70 backdrop-blur-sm">
            <p className="caption opacity-70">02. i like</p>
            <h3 className="mt-3 h3">B. Sound, rhythm, details</h3>
            <p className="mt-4 body-text opacity-80">
              Crafting interfaces that feel alive, with motion that supports narrative and purpose.
            </p>
            <div className="mt-6 h-[260px] rounded-[24px] border border-black/20 bg-[#d7d5cf] flex items-center justify-center">
              <span className="label text-2xl tracking-wide">HEADPHONES</span>
            </div>
          </article>

          <article className="who-block ml-10 max-w-[460px]">
            <p className="caption opacity-70">03. i do</p>
            <h3 className="mt-3 h3">C. Design + code</h3>
            <p className="mt-4 body-text opacity-80">
              Building performant, expressive digital products from concept to deployment.
            </p>
            <div className="mt-8 h-[260px] rounded-[28px] border border-black/25 bg-[#d2cfc9] flex items-center justify-center">
              <span className="label text-2xl tracking-wide">SKULL</span>
            </div>
          </article>

          <article className="who-block ml-28 max-w-[500px] pb-24">
            <p className="caption opacity-70">04. topics</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="px-4 py-2 border border-black rounded-full label">webgl</span>
              <span className="px-4 py-2 border border-black rounded-full label">motion</span>
              <span className="px-4 py-2 border border-black rounded-full label">branding</span>
              <span className="px-4 py-2 border border-black rounded-full label">ui systems</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WhoIsHe;