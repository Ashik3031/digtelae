'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HugeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navItems = [
    { label: 'About', id: 'about', href: '/about' },
    { label: 'Services', id: 'services', href: '/services' },
    { label: 'What we do', id: 'what we do', href: '/#whatwedo' },
    { label: 'contact', id: 'contact', href: '/contact' },
  ];

  const handleNavClick = (item) => {
    // Try to scroll to section on current page
    if (typeof document !== 'undefined' && item.id) {
      const section = document.getElementById(item.id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMenuOpen(false);
        return;
      }
    }

    // If no section found, navigate to page
    if (item.href) {
      router.push(item.href);
      setIsMenuOpen(false);
    }
  };

  const handleLetsTalk = () => {
    router.push('/contact');
  };

  const handlehome = () => {
    router.push('/');
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5 lg:px-8 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <div 
              onClick={handlehome} 
              className="flex h-12 w-16 sm:h-14 sm:w-18 md:h-16 md:w-20 items-center justify-center bg-lime-400 px-2 sm:px-3 md:px-4 py-2 font-bold text-black cursor-pointer"
            >
              <img
                src="https://res.cloudinary.com/dsfgakhl4/image/upload/v1752131913/Asset_2_300x_xrbje1.png"
                alt="Logo"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-xl sm:text-2xl">digtel</span>
            </div>

            {/* Navigation items - Desktop (visible when menu is open) */}
            {isMenuOpen && (
              <nav className="hidden md:flex h-12 md:h-14 lg:h-16 items-center gap-4 lg:gap-8 bg-gray-900 px-4 md:px-6 lg:px-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className="text-sm md:text-base lg:text-lg font-medium text-white transition-colors hover:text-lime-400"
                    onClick={() => handleNavClick(item)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Menu/Close button */}
            <button
              onClick={toggleMenu}
              className="flex h-12 sm:h-14 md:h-16 items-center justify-center bg-gray-900 px-4 sm:px-5 md:px-6 text-white transition-colors hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <span className="text-sm sm:text-base font-medium">Menu</span>
              )}
            </button>
          </div>

          {/* Let's talk button */}
          <button
            onClick={handleLetsTalk}
            className="flex h-12 sm:h-14 md:h-16 items-center gap-1.5 sm:gap-2 bg-lime-400 px-3 sm:px-4 md:px-6 text-sm sm:text-base font-medium text-black transition-colors hover:bg-gray-200"
          >
            <span className="hidden sm:inline">Let&apos;s talk</span>
            <span className="sm:hidden">Talk</span>
            <span>→</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900 md:hidden" style={{ top: '72px' }}>
          <nav className="flex flex-col items-center justify-center gap-6 py-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-xl font-medium text-white transition-colors hover:text-lime-400"
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default HugeNavbar;