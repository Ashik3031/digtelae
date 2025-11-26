'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const SurveillanceSolutions = () => {
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchOurWorks = async () => {
      try {
        const res = await fetch('/api/media?section=ourworks&limit=4');
        const data = await res.json();

        const videoFile = data.find((item) => item.resourceType === 'video') || null;
        const imageFiles = data.filter((item) => item.resourceType === 'image');

        setVideo(videoFile);
        setImages([
          imageFiles[0] || null,
          imageFiles[1] || null,
          imageFiles[2] || null,
        ]);
      } catch (err) {
        console.error('Error fetching Our Works section:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOurWorks();

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const services = [
    { title: 'Home Surveillance', desc: 'Protect your home with the latest Home Surveillance System including Smart Security Systems and Door and Window Alarms.', color: '#8B5CF6' },
    { title: 'Smart Cameras', desc: 'Smart Security cameras are a big part of home security and a natural choice for a smart apartment.', color: '#3B82F6' },
    { title: 'Wireless Systems', desc: 'Wireless security cameras that let you avoid the hassle of messy wires and fit for your Home or Office interior.', color: '#10B981' },
    { title: 'Office Solutions', desc: 'We design, supply, install, customize, and support surveillance camera system for an Office, Retail Store, and commercial buildings.', color: '#F59E0B' },
    { title: 'Commercial Systems', desc: 'We are experts at integrating scalable commercial CCTV camera surveillance systems that meet your design and budget.', color: '#EC4899' },
    { title: 'Vehicle CCTV', desc: 'Vehicle CCTV Cameras provide video surveillance footage from in and outside your vehicle.', color: '#6366F1' },
    { title: 'CCTV Consulting', desc: 'Specialists in CCTV Since 2010. Experienced Consultant in IP Analytic Camera and Surveillance Systems.', color: '#F97316' },
    { title: 'Maintenance Contract', desc: 'Annual Maintenance Contract (AMC) for CCTV Surveillance System.', color: '#06B6D4' },
    { title: 'CCTV Servicing', desc: 'Al Yamin provide Domestic and Commercial CCTV Camera Installation, Servicing, and Maintenance throughout UAE.', color: '#84CC16' },
    { title: 'Thermal Imaging', desc: 'Al Yamin is a pioneer in the Distribution & Integration of Thermal Imaging Camera System in Dubai.', color: '#EF4444' }
  ];

return (
    <div className="relative bg-white text-gray-900" ref={containerRef}>
      
      {/* Services - Clean Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Professional security solutions for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mt-1"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <svg className="w-5 h-5" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      {/* Clients - Auto Scrolling */}
      <section className="bg-gray-50 border-y border-gray-200 overflow-hidden">
        <div className="py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Products We dealing with</h2>
            <p className="text-gray-600">Trusted by leading brands worldwide</p>
          </div>
          
          <style jsx>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 30s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="relative">
            <div className="flex animate-scroll">
              {/* First set of logos */}
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-12 px-6">
                  {/* Dell */}
                  <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <svg viewBox="0 0 100 100" className="w-16 h-16">
                      <circle cx="50" cy="50" r="40" fill="#007DB8" />
                      <text x="50" y="60" fontSize="28" fill="white" textAnchor="middle" fontWeight="bold" fontFamily="Arial">DELL</text>
                    </svg>
                  </div>
                  
                  {/* 3M */}
                  <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <svg viewBox="0 0 100 50" className="w-20 h-10">
                      <text x="50" y="35" fontSize="32" fill="#FF0000" textAnchor="middle" fontWeight="bold" fontFamily="Arial">3M</text>
                    </svg>
                  </div>
                  
                  {/* Belden */}
                  <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <svg viewBox="0 0 120 50" className="w-24 h-10">
                      <text x="60" y="32" fontSize="24" fill="#003087" textAnchor="middle" fontWeight="bold" fontFamily="Arial">BELDEN</text>
                    </svg>
                  </div>
                  
                  {/* D-Link */}
                  <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <svg viewBox="0 0 120 50" className="w-24 h-10">
                      <text x="60" y="32" fontSize="22" fill="#000000" textAnchor="middle" fontWeight="bold" fontFamily="Arial">D-Link</text>
                    </svg>
                  </div>
                  
                  {/* Schneider Electric */}
                  <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <svg viewBox="0 0 140 50" className="w-28 h-10">
                      <text x="70" y="25" fontSize="18" fill="#3DCD58" textAnchor="middle" fontWeight="bold" fontFamily="Arial">Schneider</text>
                      <text x="70" y="40" fontSize="14" fill="#3DCD58" textAnchor="middle" fontWeight="bold" fontFamily="Arial">Electric</text>
                    </svg>
                  </div>
                  
                  {/* Hikvision */}
                  <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <svg viewBox="0 0 120 50" className="w-24 h-10">
                      <text x="60" y="32" fontSize="20" fill="#E60012" textAnchor="middle" fontWeight="bold" fontFamily="Arial">Hikvision</text>
                    </svg>
                  </div>
                  
                  {/* Dahua */}
                  <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <svg viewBox="0 0 100 50" className="w-20 h-10">
                      <text x="50" y="32" fontSize="22" fill="#0066CC" textAnchor="middle" fontWeight="bold" fontFamily="Arial">Dahua</text>
                    </svg>
                  </div>
                  
                  {/* Cisco */}
                  <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <svg viewBox="0 0 100 50" className="w-20 h-10">
                      <rect x="15" y="15" width="4" height="20" fill="#049FD9" />
                      <rect x="25" y="10" width="4" height="30" fill="#049FD9" />
                      <rect x="35" y="12" width="4" height="26" fill="#049FD9" />
                      <rect x="45" y="8" width="4" height="34" fill="#049FD9" />
                      <rect x="55" y="12" width="4" height="26" fill="#049FD9" />
                      <rect x="65" y="10" width="4" height="30" fill="#049FD9" />
                      <rect x="75" y="15" width="4" height="20" fill="#049FD9" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

};

export default SurveillanceSolutions;