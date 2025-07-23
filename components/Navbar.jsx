"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY < lastScrollY) {
        setShowNavbar(true); // Scrolling up
      } else {
        setShowNavbar(false); // Scrolling down
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full flex justify-center transition-all duration-300 ease-in-out z-50 ${
        showNavbar ? "fixed top-4" : "fixed -top-24"
      }`}
    >
      <div className="bg-white rounded-full shadow-lg px-8 py-3 flex items-center gap-8 text-black font-medium">
        {/* Left Items */}
        <div className="flex items-center gap-6">
          <div className="px-4 py-2 rounded-full bg-gray-200 text-sm font-semibold">HOME</div>
          <div className="hover:text-gray-500 cursor-pointer text-sm font-semibold">SERVICES</div>
        </div>

        {/* Logo */}
        <div className="font-bold text-2xl tracking-wide flex items-center gap-1">
          <span className="text-black">DO</span>
          <span className="text-gray-700 font-semibold">studio</span>
        </div>

        {/* Right Items */}
        <div className="flex items-center gap-6">
          <div className="hover:text-gray-500 cursor-pointer text-sm font-semibold">WORKS</div>
          <div className="hover:text-gray-500 cursor-pointer text-sm font-semibold">CONTACT</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;