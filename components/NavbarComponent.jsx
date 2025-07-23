'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

const HugeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false); // Close menu after click
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-between items-center px-8 py-4  ">
        <div className="flex items-center">
          {/* Logo */}
          <div className="bg-black text-white px-4 py-2 font-bold rounded-l flex items-center justify-center h-12 w-24">
            <img
              src="https://res.cloudinary.com/dsfgakhl4/image/upload/v1752131913/Asset_2_300x_xrbje1.png"
              alt="Logo"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden">LOGO</span>
          </div>
          <button
            onClick={toggleMenu}
            className="bg-lime-400 text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors rounded-r h-12"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <button className="bg-black text-white px-6 py-3 font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors rounded">
          Let's talk <span className="text-s text-lime-400">→</span>
        </button>
      </header>

      {/* Full Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black text-white z-40 flex">
          {/* Close button */}
          <button
            onClick={toggleMenu}
            className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Menu Content */}
          <div className="flex w-full">
            {/* Left side */}
            <div className="w-1/2 p-16 flex flex-col justify-center pt-24">
              <nav className="space-y-6">
                {[
                  { label: 'What we do', id: 'whatwedo', desc: 'Intelligent Experiences' },
                  { label: 'Work', id: 'work', desc: 'Ambitious work for ambitious brands' },
                  { label: 'About', id: 'about', desc: 'Trends and perspectives' },
                  { label: 'Our Team', id: 'team', desc: 'Who we are' },
                  { label: 'Careers', id: 'careers', desc: 'Join our team' },
                ].map((item) => (
                  <div key={item.id} className="group cursor-pointer" onClick={() => handleScroll(item.id)}>
                    <span className="text-4xl font-bold leading-tight block hover:text-lime-600 transition-colors">
                      {item.label}
                    </span>
                    <p className="text-gray-400 mt-2 text-base">{item.desc}</p>
                  </div>
                ))}
              </nav>
            </div>

            {/* Right side */}
            <div className="w-1/2 p-16 bg-gray-900 flex flex-col justify-center pt-24">
              <h3 className="text-2xl font-bold mb-8 text-lime-600">Featured Work</h3>
              <div className="space-y-6">
                {[
                  { title: 'Google', desc: 'Defining the future of Google' },
                  { title: 'NBCU', desc: '2024 Paris Olympics Experience' },
                  { title: "McDonald's", desc: 'Digital transformation' },
                  { title: 'Android', desc: 'Reintroducing Android' },
                  { title: 'Planet Fitness', desc: 'Accessible fitness experience' },
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <h4 className="text-xl font-semibold group-hover:text-lime-600 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-700">
                <h4 className="text-sm text-gray-400 mb-4">LOCATION</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>UAE</div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HugeNavbar;
