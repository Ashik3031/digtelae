'use client';
import React, { useRef, useLayoutEffect, useState } from 'react';
import { slides } from './sliderData';

export default function PremiumCreativeSlider() {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  panelsRef.current = [];
  const [activeSlide, setActiveSlide] = useState(0);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      let SplitText;
      try {
        SplitText = (await import('gsap/SplitText')).SplitText;
        gsap.registerPlugin(SplitText);
      } catch (e) {
        console.warn('SplitText plugin not found, using fallback.');
      }

      const ctx = gsap.context(() => {
        const panels = panelsRef.current;

        const splitHeadings = panels.map(panel => {
          const headingEl = panel.querySelector('.slide-heading');
          if (SplitText) {
            return new SplitText(headingEl, { type: 'chars' });
          } else {
            const chars = headingEl.textContent.split('');
            headingEl.innerHTML = chars.map(c => `<span>${c}</span>`).join('');
            return { chars: headingEl.querySelectorAll('span') };
          }
        });

        // Scroll progress indicator
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `bottom bottom`,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (slides.length - 1));
            setActiveSlide(index);
          }
        });

        // Pinning panels
        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: true,
            onEnter: () => setActiveSlide(i),
            onEnterBack: () => setActiveSlide(i),
          });
        });

        // Animations
        panels.forEach((panel, i) => {
          const headingChars = splitHeadings[i].chars;
          const copyEl = panel.querySelector('.slide-copy');
          const btnEl = panel.querySelector('.view-details-btn');
          const bgEl = panel.querySelector('.bg-image');

          gsap.fromTo(
            headingChars,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.04,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top center',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            copyEl,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top center',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            btnEl,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top center',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            bgEl,
            { scale: 1.1 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    })();
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&family=Playfair+Display:wght@400;600&family=Montserrat:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <section ref={containerRef} className="w-full overflow-hidden relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 z-50">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => (panelsRef.current[index] = el)}
            className="panel min-h-screen flex flex-col sm:flex-row items-center sm:items-start justify-between px-[8%] relative"
          >
            {/* Background */}
            <div
              className="bg-image absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/10 to-transparent z-0"></div>

            {/* Heading on Left */}
            <div
              className="relative z-10 w-full sm:w-2/3 md:w-3/4 text-left"
              style={{ marginTop: '20vh' }} // Below middle
            >
              <p className="text-xs sm:text-sm font-light mb-3">W — {String(index + 1).padStart(3, '0')}</p>
              <h2
                className="slide-heading tracking-tight"
                style={{
                  fontSize: '4vw', // Premium size
                  color: slide.headingColor,
                  fontFamily: slide.headingFont,
                  fontWeight: 400
                }}
              >
                {slide.heading}
              </h2>
            </div>

            {/* Subheading + Button on Right */}
            <div
              className="relative z-10 w-full sm:w-1/3 text-right"
              style={{ marginTop: '50vh' }} // Below heading
            >
              <p
                className="slide-copy text-lg sm:text-xl mb-6"
                style={{
                  color: slide.subheadingColor,
                  fontFamily: slide.subheadingFont
                }}
              >
                {slide.copy}
              </p>
              <a
                href={slide.link}
                className="view-details-btn inline-block border border-black px-5 py-2 text-sm font-medium rounded hover:bg-black hover:text-white transition"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
