'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ModernHorizontalSlider() {
  const router = useRouter();
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Static slides data
    const staticSlides = [
      {
        id: 'home',
        heading: 'Home automation and Security',
        copy: 'Upgrade your living space with smart security, automation, and entertainment systems.',
        bgImage:
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop',
        accentColor: '#FACC15', // bright yellow
      },
      {
        id: 'office',
        heading: 'Office secure Solutions',
        copy: 'Build a secure, connected, and efficient workplace with smart office and IT infrastructure.',
        bgImage:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop',
        accentColor: '#22C55E', // neon lime/green
      },
      {
        id: 'retail',
        heading: 'Retail Solutions',
        copy: 'Transform your stores with integrated security, networking, and smart analytics for a modern retail experience.',
        bgImage:
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80&auto=format&fit=crop',
        accentColor: '#6366F1', // neon-ish indigo
      },
      {
        id: 'it',
        heading: 'IT Solutions',
        copy: 'Modernize your infrastructure with networking, cloud, and managed IT services.',
        bgImage:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop',
        accentColor: '#EC4899', // neon pink
      },
    ];

    setSlides(staticSlides);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || slides.length === 0) return;

    let ctx;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const wrapper = wrapperRef.current;
        const panels = gsap.utils.toArray('.panel');

        // Horizontal scroll without snap
        const horizontalScroll = gsap.to(wrapper, {
          x: () => -(wrapper.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            id: 'horizontal',
            onUpdate: (self) => {
              // Calculate active slide based on scroll position
              const slideWidth = window.innerWidth / 2; // Each slide is 50% width
              const scrolled = Math.abs(gsap.getProperty(wrapper, 'x'));
              const index = Math.max(0, Math.min(
                Math.floor((scrolled + slideWidth / 2) / slideWidth),
                slides.length - 1
              ));
              setActiveSlide(index);
            },
          },
        });

        // Staggered animations for each panel
        panels.forEach((panel) => {
          const heading = panel.querySelector('.slide-heading');
          const copy = panel.querySelector('.slide-copy');
          const number = panel.querySelector('.slide-number');
          const button = panel.querySelector('.slide-button');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalScroll,
              start: 'left 80%',
              end: 'center center',
              toggleActions: 'play none none reverse',
            },
          });

          // Heading animation
          tl.fromTo(
            heading,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          )
            .fromTo(
              number,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
              },
              '-=0.8'
            )
            .fromTo(
              copy,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
              '-=0.6'
            )
            .fromTo(
              button,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
              '-=0.4'
            );

          // Parallax background effect - reduced movement to keep image in view
          gsap.to(panel.querySelector('.bg-image'), {
            x: 50,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalScroll,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          });
        });
      }, containerRef);
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <section ref={containerRef} className="relative overflow-hidden bg-black">
        {/* Progress indicator */}
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-0.5 w-8 sm:h-1 sm:w-10 md:w-12 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === activeSlide ? '#ffffff' : '#333333',
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 md:bottom-8 z-50 text-white/60 text-[10px] sm:text-xs font-light tracking-widest flex items-center gap-1.5 sm:gap-2">
          <span>SCROLL</span>
          <svg width="16" height="10" viewBox="0 0 20 12" fill="none" className="sm:w-5 sm:h-3">
            <path
              d="M1 6H19M19 6L14 1M19 6L14 11"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Horizontal wrapper */}
        <div ref={wrapperRef} className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="panel min-h-screen w-1/2 flex-shrink-0 relative flex items-center justify-center overflow-hidden"
            >
              {/* Background image with overlay */}
              <div
                className="bg-image absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '110%',
                  left: '-5%',
                }}
              />
              <div className="absolute inset-0 bg-black/70 z-0" />

              {/* Content */}
              <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-24 max-w-4xl">
                {/* Number indicator */}
                <div
                  className="slide-number inline-block mb-4 sm:mb-5 md:mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold opacity-20"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: slide.accentColor,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Heading */}
                <h2
                  className="slide-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {slide.heading}
                </h2>

                {/* Copy */}
                <p
                  className="slide-copy text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 max-w-2xl font-light leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {slide.copy}
                </p>

                {/* Button */}
                <button
                  className="slide-button group relative px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 text-xs sm:text-sm font-medium text-white overflow-hidden rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  onClick={() => router.push(`/services/${slide.id}`)}
                >
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    View Details
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M1 8H15M15 8L8 1M15 8L8 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  <div
                    className="absolute inset-0 -z-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ backgroundColor: slide.accentColor }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}