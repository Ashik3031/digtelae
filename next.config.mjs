/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', // ✅ Keep remotePatterns if needed
      },
    ],
    domains: [
      'img1.wsimg.com',         // ✅ Existing
      'via.placeholder.com',    // ✅ Existing
      'res.cloudinary.com'      // ✅ Added Cloudinary
    ],
  },
};

export default nextConfig;
