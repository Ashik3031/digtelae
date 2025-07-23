'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

export default function OurClients() {
  const [logos, setLogos] = useState([]);
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2, triggerOnce: false });

  // ✅ Fetch logos from backend
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch('/api/media?section=ourclients&limit=10');
        const data = await res.json();
        setLogos(data); // Array of logo objects from API
      } catch (err) {
        console.error('Error fetching client logos:', err);
      }
    };
    fetchLogos();
  }, []);

  const rowVariants = (direction) => ({
    hidden: { opacity: 0, x: direction === 'left' ? -400 : 400 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: 'easeOut', staggerChildren: 0.15 },
    },
  });

  return (
    <section className="bg-black text-white w-full overflow-hidden">
      {/* Hero Text */}
      <div className="px-6 md:px-20 pt-32 pb-16 space-y-12">
        <div className="w-full flex justify-start">
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight max-w-3xl">
            And industry-leading<br />partnerships.
          </h1>
        </div>
        <div className="w-full flex justify-end">
          <p className="text-xl md:text-2xl text-white/80 max-w-xl text-right pb-40">
            With our trusted partners, we ambitiously push technology’s capabilities...
          </p>
        </div>
      </div>

      {/* ✅ Dynamic Logo Grid */}
      <div ref={ref} className="px-6 md:px-20 pt-0 pb-20 space-y-10">
        {/* Row 1 */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={rowVariants('left')}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {logos.slice(0, 5).map((logo, idx) => (
            <motion.div
              key={idx}
              className="border border-white/10 bg-black h-40 flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
            >
              {logo?.secureUrl ? (
                <img
                  src={logo.secureUrl}
                  alt={`Client Logo ${idx + 1}`}
                  className="max-h-12 object-contain grayscale invert"
                />
              ) : (
                <span className="text-gray-500 text-sm">Empty</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={rowVariants('right')}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {logos.slice(5, 10).map((logo, idx) => (
            <motion.div
              key={idx}
              className="border border-white/10 bg-black h-40 flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
            >
              {logo?.secureUrl ? (
                <img
                  src={logo.secureUrl}
                  alt={`Client Logo ${idx + 6}`}
                  className="max-h-12 object-contain grayscale invert"
                />
              ) : (
                <span className="text-gray-500 text-sm">Empty</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
