'use client';
import dynamic from 'next/dynamic';

const WhatWeDoSection = dynamic(() => import('./WhatWeDoSection'), { ssr: false });

export default function ClientWrapper() {
  return <WhatWeDoSection />;
}
