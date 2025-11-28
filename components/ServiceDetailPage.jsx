// components/ServiceDetailPage.js
'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function ServiceDetailPage({ service }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-28 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Icon + ID */}
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-12 w-12 rounded-full border border-lime-400/50 flex items-center justify-center">
                {React.createElement(service.icon, {
                  size: 26,
                  className: 'text-lime-400',
                })}
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                {service.id}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-zinc-200 mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center gap-2 rounded-full bg-lime-400 text-black px-7 py-3 text-sm font-medium hover:bg-lime-300 transition-colors">
                Get Started
                <ArrowRight size={18} />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-zinc-600 px-7 py-3 text-sm font-medium text-zinc-200 hover:border-lime-400 hover:text-lime-300 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-black py-16 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Why choose our {service.title.toLowerCase()}?
            </h2>
            <p className="text-sm md:text-base text-zinc-300 mb-8 leading-relaxed">
              {service.overview}
            </p>

            <div className="space-y-3">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-lime-400/15 border border-lime-400/50">
                    <Check size={14} className="text-lime-300" />
                  </div>
                  <p className="text-sm md:text-base text-zinc-200">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70">
              <img
                src={service.overviewImage}
                alt={`${service.title} overview`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-zinc-950 py-16 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              What’s included
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl">
              A focused set of services tailored to {service.title.toLowerCase()}.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.serviceItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-black/60 p-5 hover:border-lime-400/70 transition-colors"
              >
                <h3 className="text-sm font-semibold text-zinc-100">
                  {item.name}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-black py-16 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Key capabilities
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl">
              The technical and operational features that make this solution work in
              real environments.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 hover:border-lime-400/70 transition-colors"
              >
                <div className="mb-4 h-8 w-8 rounded-full bg-lime-400/15 border border-lime-400/50" />
                <h3 className="text-sm md:text-base font-semibold mb-2 text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-zinc-950 py-16 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to explore {service.title.toLowerCase()} in detail?
          </h2>
          <p className="text-sm md:text-base text-zinc-400 mb-8">
            Share your current setup and requirements and we’ll help you decide what
            to implement first.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center justify-center rounded-full border border-lime-400/80 px-8 py-3 text-sm md:text-base font-medium text-lime-300 hover:bg-lime-400 hover:text-black transition-colors">
              Book a consultation
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
