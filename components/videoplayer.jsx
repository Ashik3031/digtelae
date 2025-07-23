// ✅ Fixed videoplayer.jsx with proper src prop
'use client';
import { useEffect, useState } from 'react';
import { CldVideoPlayer } from 'next-cloudinary';

export default function VideoPlayer({ publicId, ...props }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isValidPublicId =
    typeof publicId === 'string' &&
    publicId.trim().length > 0 &&
    !publicId.includes('undefined') &&
    !publicId.includes('null');

      console.log('🧪 VideoPlayer props:', { publicId, isValidPublicId });

  if (!isClient || !isValidPublicId) {
    return (
      <div className="bg-gray-100 text-red-500 text-sm px-4 py-2 rounded">
        ⚠️ No valid video loaded. Skipping player render.
      </div>
    );
  }

  return (
    <div className="aspect-video w-full max-w-4xl">
      <CldVideoPlayer
        src={publicId}  // ✅ Changed from publicId to src
        width="100%"
        height="100%"
        autoPlay
        muted
        loop
        controls
        {...props}
      />
    </div>
  );
}