'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

async function fetchMedia(section, limit = 1) {
  const res = await fetch(`/api/media?section=${section}&limit=${limit}`, { cache: 'no-store' });
  return await res.json();
}

const MediaPreview = ({ media }) => {
  if (!media?.secureUrl || !media?.resourceType) return null;

  const isVideo = media.resourceType === 'video';
  const isImage = media.resourceType === 'image';

  return (
    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md bg-black group">
      {isVideo ? (
        <video
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={media.secureUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : isImage ? (
        <img
          src={media.secureUrl}
          alt={media.alt || 'media'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <p className="text-white text-sm p-4">Unsupported media</p>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
};

export default function HeroSection() {
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [services, setServices] = useState([]);
  const [ctaLinks, setCtaLinks] = useState([]);
  const [isVideoLoaded, setLoaded] = useState(false);
  const [shouldShowVideo, setShow] = useState(false);
  const videoRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    fetchMedia('hero', 1).then(res => setHero(res[0]));
    fetchMedia('about', 1).then(res => setAbout(res[0]));
    fetchMedia('service', 4).then(setServices);
    fetchMedia('cta', 10).then(setCtaLinks);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const el = document.querySelector('.hero-container');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToNext = () => {
    document.querySelector('.next-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const videoUrl = hero?.resourceType === 'video' ? hero.secureUrl : null;
  const imgUrl = hero?.resourceType === 'image' ? hero.secureUrl : null;

  return (
    <>
      {/* HERO SECTION */}
      {/* <section className="hero-container relative w-full overflow-hidden bg-white rounded-b-[60px] md:rounded-b-[100px] shadow-md">
        <div className="relative h-screen w-full overflow-hidden">
          {videoUrl && shouldShowVideo && !prefersReducedMotion && (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setLoaded(true)}
              onError={() => setLoaded(false)}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}

          {(!videoUrl || prefersReducedMotion) && imgUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          )}

          <div className="absolute inset-0 bg-black/70 z-0" />

          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center z-10 max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white">
              We build <span className="text-[#00ff94]">startups</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium">
              From idea to MVP — world-class software, design, and AI teams. No cost until launch.
            </p>
          </div>

          <button
            onClick={scrollToNext}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white z-20 transition"
            aria-label="Scroll down"
          >
            <ChevronDown size={28} className="animate-bounce" />
          </button>

          {videoUrl && shouldShowVideo && !isVideoLoaded && !prefersReducedMotion && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>
      </section> */}

      {/* ABOUT SECTION */}
      <section className="next-section bg-white py-16 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Us</h2>
        {about && <MediaPreview media={about} />}
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-gray-50 py-16 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((media, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
              <MediaPreview media={media} />
              <h3 className="text-lg font-semibold mt-2 text-gray-800">
                {media.alt || 'Service Title'}
              </h3>
              <a
                href={`/services/${(media.alt || 'service').toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-[#00ff94] hover:underline"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA LINKS SLIDER */}
      {ctaLinks.length > 0 && (
        <section className="bg-white py-16 px-4 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Explore More</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {ctaLinks.map((link, index) => (
              <div
                key={index}
                className="min-w-[375px] md:min-w-[480px] lg:min-w-[550px] flex-shrink-0 rounded-xl overflow-hidden border shadow-md bg-white"
              >
                <iframe
                  src={link.publicId}
                  title={`Link ${index}`}
                  className="w-full h-[600px] border-0"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
