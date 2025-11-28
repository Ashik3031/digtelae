'use client';

import Link from 'next/link';

import React, { useState, useEffect } from 'react';

const ArrowLeft = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="inline-block"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial values
    handleResize();
    setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const vw = viewport.width || 1280;
  const vh = viewport.height || 800;

  // Responsive breakpoints
  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1024;

  // Logo scale by device
  const logoScale = isMobile ? 0.35 : isTablet ? 0.5 : 0.6;

  // Text animations
  const heroOpacity = Math.max(1 - scrollY / (vh * 0.5), 0);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lime-950/30 to-black" />

        {/* Static Logo (no movement) */}
        <div
          className="absolute pointer-events-none z-40"
          style={{
            left: '50%',
            top: '30%',
            transform: `translate(-50%, -50%) scale(${logoScale})`,
          }}
        >
          <div
            className={`relative ${
              isMobile ? 'w-40 h-40' : isTablet ? 'w-56 h-56' : 'w-72 h-72'
            }`}
          >
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 rounded-full bg-lime-500/30 blur-3xl" />
            {/* Logo image */}
            <img
              src="https://res.cloudinary.com/dxq0nrirt/image/upload/v1764152944/Screenshot_2025-11-07_155114-removebg-preview_qnakbp.png"
              alt="Logo"
              className="relative w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 60px rgba(132, 204, 22, 0.5))',
              }}
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl sm:text-7xl md:text-9xl font-light tracking-tight text-white mb-6 px-4"
            style={{
              transform: `translateY(${-scrollY * 0.5}px)`,
              opacity: heroOpacity,
            }}
          >
            DigTel
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-lime-300 font-light tracking-wide px-4"
            style={{
              transform: `translateY(${-scrollY * 0.3}px)`,
              opacity: heroOpacity,
            }}
          >
            Nurturing Your Business In The Digital World
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ opacity: heroOpacity }}
        >
          <div className="w-6 h-10 border-2 border-lime-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-lime-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative min-h-screen py-20 sm:py-32 px-4 md:px-8 lg:px-16 bg-black">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-12 sm:mb-16 relative z-20"
            style={{
              opacity: Math.min(scrollY / (vh * 0.4), 1),
              transform: `translateY(${Math.max(50 - scrollY / 5, 0)}px)`,
            }}
          >
            About <span className="text-lime-400">Us</span>
          </h2>

          <div
            className="space-y-6 sm:space-y-8 text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-16 sm:mb-20"
            style={{
              opacity: Math.min((scrollY - vh * 0.25) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 0.25) / 5,
                0
              )}px)`,
            }}
          >
            <p>
              We are a team of passionate creators, innovators, and dreamers
              dedicated to pushing the boundaries of what's possible in the
              digital realm.
            </p>
            <p>
              Our journey began with a simple idea: to create experiences that
              not only look beautiful but feel magical. Every project we
              undertake is infused with creativity, technical excellence, and a
              commitment to excellence.
            </p>
            <p>
              With years of experience in design, development, and user
              experience, we've helped countless brands transform their digital
              presence into something extraordinary.
            </p>
          </div>

          {/* Stats Grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-32"
            style={{
              opacity: Math.min((scrollY - vh * 0.5) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 0.5) / 5,
                0
              )}px)`,
            }}
          >
            {[
              { number: '500+', label: 'Projects' },
              { number: '50+', label: 'Clients' },
              { number: '10+', label: 'Years' },
              { number: '99%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-8 bg-white/5 backdrop-blur-sm rounded-lg border border-lime-500/20 hover:bg-lime-500/10 hover:border-lime-500/40 transition-all duration-300"
              >
                <div className="text-2xl sm:text-4xl font-light text-lime-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-widest font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative min-h-screen py-20 sm:py-32 px-4 md:px-8 lg:px-16 bg-black">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-12 sm:mb-16"
            style={{
              opacity: Math.min((scrollY - vh * 1.2) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 1.2) / 5,
                0
              )}px)`,
            }}
          >
            Our <span className="text-lime-400">Services</span>
          </h2>

          <div
            className="grid md:grid-cols-2 gap-6 sm:gap-8"
            style={{
              opacity: Math.min((scrollY - vh * 1.4) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 1.4) / 5,
                0
              )}px)`,
            }}
          >
            {[
              {
                title: 'Digital Strategy',
                description:
                  'Comprehensive digital transformation roadmaps tailored to your business objectives and market landscape.',
              },
              {
                title: 'Web Development',
                description:
                  'Custom websites and web applications built with cutting-edge technologies for optimal performance.',
              },
              {
                title: 'Brand Identity',
                description:
                  'Distinctive visual identities that capture your essence and resonate with your target audience.',
              },
              {
                title: 'UI/UX Design',
                description:
                  'Intuitive interfaces and seamless user experiences that delight and convert.',
              },
              {
                title: 'Mobile Apps',
                description:
                  'Native and cross-platform mobile applications that engage users on the go.',
              },
              {
                title: 'Digital Marketing',
                description:
                  'Data-driven marketing strategies that amplify your reach and drive measurable results.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-white/5 backdrop-blur-sm rounded-lg border border-lime-500/20 hover:bg-lime-500/10 hover:border-lime-500/40 transition-all duration-300"
              >
                <h3 className="text-xl sm:text-2xl font-light text-white mb-3 sm:mb-4 group-hover:text-lime-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative min-h-screen py-20 sm:py-32 px-4 md:px-8 lg:px-16 bg-black">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-12 sm:mb-16"
            style={{
              opacity: Math.min((scrollY - vh * 2.0) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 2.0) / 5,
                0
              )}px)`,
            }}
          >
            Our <span className="text-lime-400">Philosophy</span>
          </h2>

          <div
            className="space-y-8 sm:space-y-12"
            style={{
              opacity: Math.min((scrollY - vh * 2.2) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 2.2) / 5,
                0
              )}px)`,
            }}
          >
            {[
              {
                title: 'Innovation First',
                text: 'We believe in challenging conventions and exploring new possibilities. Every project is an opportunity to push boundaries.',
              },
              {
                title: 'Human-Centered',
                text: 'Technology serves people. We design with empathy, creating solutions that truly enhance human experiences.',
              },
              {
                title: 'Quality Over Quantity',
                text: 'We take on fewer projects to ensure each one receives the attention and craftsmanship it deserves.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border-l-2 border-lime-500/30 pl-6 sm:pl-8"
              >
                <h3 className="text-xl sm:text-2xl font-light text-lime-400 mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative min-h-screen py-20 sm:py-32 px-4 md:px-8 lg:px-16 bg-black flex items-center">
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-6 sm:mb-8 text-center"
            style={{
              opacity: Math.min((scrollY - vh * 2.8) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 2.8) / 5,
                0
              )}px)`,
            }}
          >
            Lets <span className="text-lime-400">Connect</span>
          </h2>

          <p
            className="text-center text-gray-400 font-light text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto"
            style={{
              opacity: Math.min((scrollY - vh * 3.0) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 3.0) / 5,
                0
              )}px)`,
            }}
          >
            Have a project in mind? We'd love to hear about it. Let's create
            something extraordinary together.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20"
            style={{
              opacity: Math.min((scrollY - vh * 3.2) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 3.2) / 5,
                0
              )}px)`,
            }}
          >
           
           
            
         <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black/80 px-4 py-2 text-xs md:text-sm font-medium text-zinc-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors backdrop-blur-sm"
        >
         
          Get a Quote
        </Link>


            
          </div> 

          {/* Contact Info */}
          <div
            className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center"
            style={{
              opacity: Math.min((scrollY - vh * 3.4) / (vh * 0.4), 1),
              transform: `translateY(${Math.max(
                50 - (scrollY - vh * 3.4) / 5,
                0
              )}px)`,
            }}
          >
            <div className="p-4 sm:p-6">
              <div className="text-lime-400 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-widest font-light">
                Email
              </div>
              <div className="text-gray-300 font-light text-sm sm:text-base">
                info@digtel.com
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-lime-400 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-widest font-light">
                Phone
              </div>
              <div className="text-gray-300 font-light text-sm sm:text-base">
                +971 50 123 4567
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-lime-400 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-widest font-light">
                Location
              </div>
              <div className="text-gray-300 font-light text-sm sm:text-base">
                City bae Business Center, Abuhail, Dubai, UAE
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-10 bottom-20 w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
        <div className="absolute right-32 bottom-40 w-1 h-1 bg-lime-400 rounded-full animate-pulse delay-75" />
        <div className="absolute right-20 bottom-60 w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse delay-150" />
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-lime-500/20 py-8 sm:py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-500 font-light text-xs sm:text-sm">
            © 2025 DigTel. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-4 sm:mt-6">
            <a
              href="#"
              className="text-gray-500 hover:text-lime-400 transition-colors text-xs sm:text-sm font-light"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-lime-400 transition-colors text-xs sm:text-sm font-light"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-lime-400 transition-colors text-xs sm:text-sm font-light"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-lime-400 transition-colors text-xs sm:text-sm font-light"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}