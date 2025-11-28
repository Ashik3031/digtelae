'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black px-6 md:px-20 py-14 border-t border-gray-200">
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 place-items-center text-center">
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            DigTel
          </Link>
          <p className="text-sm text-gray-600 mt-3">
            Building digital products that scale.
          </p>
          <div className="flex gap-4 mt-4">
            <FaFacebookF className="hover:text-green-600 transition" />
            <FaTwitter className="hover:text-green-600 transition" />
            <FaLinkedinIn className="hover:text-green-600 transition" />
            <FaInstagram className="hover:text-green-600 transition" />
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-gray-800 uppercase">
            Services
          </h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link href="#">Product Design</Link>
            </li>
            <li>
              <Link href="#">Web Development</Link>
            </li>
            <li>
              <Link href="#">Mobile Apps</Link>
            </li>
            <li>
              <Link href="#">AI Solutions</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4 text-gray-800 uppercase">
            Industries
          </h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link href="#">Fintech</Link>
            </li>
            <li>
              <Link href="#">Healthcare</Link>
            </li>
            <li>
              <Link href="#">E-commerce</Link>
            </li>
            <li>
              <Link href="#">Education</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4 text-gray-800 uppercase">
            Company
          </h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Blog</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="max-w-screen-xl mx-auto mt-12 border-t border-gray-200 pt-6 flex flex-col items-center gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} DigTel. All rights reserved.</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="#" className="hover:text-green-600 transition">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-green-600 transition">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-green-600 transition">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
