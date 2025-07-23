'use client';
import React, { useState, useEffect, useRef } from 'react';

async function fetchMedia(section, limit = 1) {
  const res = await fetch(`/api/media?section=${section}&limit=${limit}`, { cache: 'no-store' });
  return await res.json();
}

const HeroSection = ({ withOffset = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [heroMedia, setHeroMedia] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchMedia('hero', 1).then(res => setHeroMedia(res[0]));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y > 100 && y < window.innerHeight * 0.7 && !isExpanded) {
        setIsExpanded(true);
        setTimeout(() => setShowSecondText(true), 400);
      } else if (y <= 100 && isExpanded) {
        setIsExpanded(false);
        setShowSecondText(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isExpanded]);

  const offsetClass = !isExpanded && withOffset ? 'translate-y-4' : '';
  const videoClasses = `
    relative overflow-hidden transition-all duration-700 ease-out
    ${isExpanded ? 'w-full h-full rounded-none'
                 : 'w-[95%] h-[78vh] rounded-3xl shadow-2xl'}
  `;

  const isVideo = heroMedia?.resourceType === 'video';
  const isImage = heroMedia?.resourceType === 'image';
  const mediaUrl = heroMedia?.secureUrl;

  return (
    <section className="relative bg-white isolate min-h-[180vh]">
      <div className={`sticky top-0 h-screen flex items-center justify-center ${offsetClass}`}>
        <div className={videoClasses}>
          {/* Dynamic media: video or image */}
          {isVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay muted loop playsInline
            >
              <source src={mediaUrl} type="video/mp4" />
            </video>
          )}
          {isImage && (
            <img
              src={mediaUrl}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/40" />

          {/* Content layer */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-white">
            {/* Initial state text */}
            <div className={`
              text-center transition-all duration-500
              ${showSecondText ? 'opacity-0 -translate-y-20' : 'opacity-100 translate-y-0'}
            `}>
              {/* <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-wider">
                <span className="text-lime-400">VIDEO</span>
                <span className="text-white"> PRODUCTION</span>
              </h1> */}
              {/* <button
                type="button"
                className="bg-lime-400 text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-colors shadow-lg"
              >
                Enquire Now
              </button> */}
            </div>

            {/* Expanded state text */}
            <div className={`
              absolute inset-0 flex items-center justify-center
              transition-all duration-700
              ${showSecondText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
            `}>
              <div className="text-center w-full max-w-6xl">
                {/* <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  <span className="text-lime-400">PROFESSIONAL</span>
                  <span className="text-white"> VIDEO PRODUCTION</span>
                </h2> */}
                {/* <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto">
                  From concept to completion, we create stunning visual stories that captivate your audience and elevate your brand.
                </p> */}
                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    className="bg-lime-400 text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-colors shadow-lg"
                  >
                    Start Your Project
                  </button>
                  <button
                    type="button"
                    className="border-2 border-lime-400 text-lime-400 px-12 py-4 rounded-full font-bold text-lg hover:bg-lime-400 hover:text-black transition-colors"
                  >
                    View Our Work
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
