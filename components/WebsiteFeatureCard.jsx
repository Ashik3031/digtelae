'use client';
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IphoneFeatureCards = () => {
  const scrollRef = useRef();
  const [features, setFeatures] = useState([]);

  // ✅ Fetch CTA links dynamically from backend
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch('/api/media?section=cta&limit=10');
        const data = await res.json();
        setFeatures(data); // data is an array of links with meta info
      } catch (error) {
        console.error('Error fetching CTA links:', error);
      }
    };
    fetchLinks();
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 420; // Each card width + gap
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleVisitSite = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full py-12 bg-white relative">
      <h2 className="text-4xl font-bold text-black px-6 md:px-12 mb-15">
        See Our Websites
      </h2>

      <div className="relative">
        {/* Scrollable Cards Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden px-12"
        >
          {features.length > 0 ? (
            features.map((feature, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[390px] h-[780px] rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-300 bg-white relative group"
              >
                {/* ✅ Use feature.publicId as iframe source */}
                <iframe
                  src={feature.publicId}
                  className="w-full h-full border-0"
                  title={`iframe-${idx}`}
                  scrolling="no"
                  style={{
                    overflow: 'hidden',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                />

                {/* Visit Site Button */}
                <div className="absolute bottom-6 left-5/6 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button
                    onClick={() => handleVisitSite(feature.publicId)}
                    className="relative w-14 h-14 bg-gradient-to-br from-white to-gray-100 backdrop-blur-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110 border border-white/50 group/btn"
                  >
                    {/* Button Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                    {/* Plus Icon */}
                    <svg className="w-7 h-7 text-gray-700 relative z-10 transition-transform duration-300 group-hover/btn:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                  </button>

                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 whitespace-nowrap">
                    Visit Site
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading websites...</p>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-end gap-4 mt-4 mr-12">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IphoneFeatureCards;
