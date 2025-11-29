// app/services/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { servicesData } from '../../../components/servicesData';
import Image from 'next/image';


export default function ServicesPage() {
  const services = Object.values(servicesData);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Minimal Hero */}
      <section className="relative bg-black min-h-[55vh] text-white overflow-hidden flex items-center py-24 px-6">
  <div className="absolute inset-0">
    <Image
  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  alt="Technology"
  fill
  className="object-cover opacity-20"
  priority
/>

    <div className="absolute inset-0 bg-black/80" />
  </div>

  {/* Outer wrapper with LEFT PADDING */}
  <div className="relative w-full pl-6 md:pl-20 lg:pl-28">
    <div className="max-w-3xl bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 md:mt-6">
      <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-4">
        Services
      </p>

      <h1 className="text-4xl md:text-6xl font-semibold mb-4">
        Secure. Smart. Connected.
      </h1>

      <p className="text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed">
        Retail, offices, homes, and IT infrastructure — a focused suite of
        solutions designed to keep your environments safe, efficient, and always on.
      </p>
    </div>
  </div>
</section>


      {/* Services Sections */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isDark = index % 2 === 0; // alternate subtle blacks

        return (
          <section
            key={service.id}
            className={`py-16 px-6 ${isDark ? 'bg-black' : 'bg-zinc-950'}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Content */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="mb-6 inline-flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full border border-emerald-400/40 flex items-center justify-center">
                      <Icon size={22} className="text-emerald-400" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                      {service.id}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                    {service.title}
                  </h2>

                  <p
                    className={`text-base md:text-lg mb-8 leading-relaxed ${
                      isDark ? 'text-zinc-300' : 'text-zinc-300'
                    }`}
                  >
                    {service.description}
                  </p>

                  <Link
                    href={`/services/${service.id}`}
                    className="group inline-flex items-center gap-2 text-sm md:text-base font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    View {service.title}
                    <ArrowRight
                      size={18}
                      className="transform group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                {/* Service Items */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 md:p-7">
                    <h3 className="text-sm font-medium text-zinc-300 mb-4 flex items-center gap-2">
                      <span className="inline-block h-1 w-6 rounded-full bg-emerald-400" />
                      What we offer
                    </h3>

                    <div className="grid gap-2.5">
                      {service.serviceItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="group flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-zinc-900 cursor-pointer"
                        >
                          <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span className="flex-grow text-sm text-zinc-200">
                            {item.name}
                          </span>
                          <ChevronRight
                            size={16}
                            className="flex-shrink-0 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Minimal CTA */}
      <section className="border-t border-zinc-800 bg-black py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to design your next environment?
          </h2>
          <p className="text-sm md:text-base text-zinc-400 mb-8">
            Share your requirements and we will help you shape a secure, intelligent
            space that fits your operations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-emerald-400/70 px-8 py-3 text-sm md:text-base font-medium text-emerald-300 hover:bg-emerald-400 hover:text-black transition-colors"
          >
            Get started
          </Link>
        </div>
      </section>
    </div>
  );
}
