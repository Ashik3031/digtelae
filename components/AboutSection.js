'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const WebsiteMarketingComponent = () => {
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([null, null, null]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-medium text-center text-gray-900 mb-12">
          Grow your brand with Websites + Marketing.
        </h1>

        {/* ✅ Hero Video Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-16">
          {loading ? (
            <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-200 text-gray-500">
              Loading video...
            </div>
          ) : video ? (
            <video
              className="w-full h-[400px] md:h-[500px] object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={video.secureUrl || video.url || ''} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-200 text-gray-500">
              No video available
            </div>
          )}

          {/* Overlay Design */}
          <div className="absolute inset-0  bg-opacity-20">
            <div className="absolute top-4 left-4 right-4">
              {/* <div className="bg-white bg-opacity-90 rounded-lg p-4 max-w-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Website Builder</div>
              </div> */}
            </div>

            {/* <div className="absolute bottom-4 right-4">
              <div className="bg-white bg-opacity-90 rounded-lg p-4 max-w-xs">
                <div className="text-sm font-medium text-gray-800 mb-2">Color Palette</div>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  <div className="w-6 h-6 bg-gray-800 rounded"></div>
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* ✅ Features Grid with Dynamic Images */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {images.map((img, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-md">
              {img ? (
                <Image
                  src={img.secureUrl || img.url}
                  alt={`Feature ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebsiteMarketingComponent;
