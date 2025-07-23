'use client'
import React from 'react';

const TemplateMarquee = () => {
  // Sample template data
  const templates = [
    {
      id: 1,
      title: "Travel Stories",
      category: "Blog",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      color: "from-orange-400 to-red-500"
    },
    {
      id: 2,
      title: "Furniture Store",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      color: "from-amber-400 to-orange-500"
    },
    {
      id: 3,
      title: "Jewelry Boutique",
      category: "Luxury",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      color: "from-slate-400 to-slate-600"
    },
    {
      id: 4,
      title: "Photography",
      category: "Portfolio",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 5,
      title: "Restaurant",
      category: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      color: "from-green-400 to-green-600"
    },
    {
      id: 6,
      title: "Tech Startup",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 7,
      title: "Fashion Brand",
      category: "Retail",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      color: "from-pink-400 to-pink-600"
    },
    {
      id: 8,
      title: "Health & Wellness",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      color: "from-teal-400 to-teal-600"
    }
  ];

  // Duplicate templates for seamless loop
  const duplicatedTemplates = [...templates, ...templates];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">
            Templates designed to sell.
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Choose from 100s of designs for every idea and industry.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          {/* <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div> */}
          
          {/* Scrolling Container */}
          <div className="flex animate-marquee hover:animate-marquee-pause">
            {duplicatedTemplates.map((template, index) => (
              <div
                key={`${template.id}-${index}`}
                className="flex-shrink-0 mx-4 group cursor-pointer"
              >
                <div className="w-80 h-96 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  {/* Template Preview */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`}></div>
                    <img 
                      src={template.image} 
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center text-white">
                        <div className="w-12 h-12 mx-auto mb-2 border-2 border-white rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium">Preview</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-medium text-gray-900">{template.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Professional design crafted for modern businesses
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 text-lg">
            Browse All Templates
          </button>
        </div>
      </div>

      {/* Custom CSS for Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee-pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TemplateMarquee;