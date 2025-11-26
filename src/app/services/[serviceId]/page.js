// app/services/[serviceId]/page.js
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { servicesData } from '../../../../components/servicesData';
import ServiceDetailPage from '../../../../components/ServiceDetailPage';

export default function ServiceDetailRoute({ params }) {
  const { serviceId } = params;

  // Find by id so you can change object keys later if needed
  const service = Object.values(servicesData).find(
    (s) => s.id === serviceId
  );

  if (!service) {
    return notFound();
  }

  return (
    <>
      <div className="fixed left-60 top-8 z-50">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black/80 px-4 py-2 text-xs md:text-sm font-medium text-zinc-200 hover:border-emerald-400 hover:text-emerald-300 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          Back to services
        </Link>
      </div>

      <ServiceDetailPage service={service} />
    </>
  );
}
