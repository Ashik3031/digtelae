'use client';
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%", // Animation starts when heading is 80% in viewport
      },
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    ).fromTo(
      subheadingRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.5" // Overlap slightly
    );
  }, []);

  return (
    <section
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #000 0%, #111 100%),
                    radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`,
        color: "#fff",
        padding: "0 8%",
        position: "relative",
      }}
    >
      {/* Heading above center */}
      <h1
        ref={headingRef}
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 300,
          lineHeight: "1",
          position: "absolute",
          top: "30%", // ABOVE center
          left: 30,
          margin: 0,
        }}
      >
        What we do —
      </h1>

      {/* Subheading below center */}
      <p
        ref={subheadingRef}
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 300,
          color: "#ccc",
          position: "absolute",
          top: "60%", // BELOW center
          right: 50,
          maxWidth: "400px",
          textAlign: "right",
          margin: 0,
        }}
      >
        Intelligent Experiences demand market-leading capabilities.
      </p>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: "pulse 2s ease-in-out infinite",
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Particle Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
