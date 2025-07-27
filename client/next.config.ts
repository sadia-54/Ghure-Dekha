import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'example.com', 'firebasestorage.googleapis.com', 'upload.wikimedia.org',
    'images.unsplash.com'],
  },
};

export default nextConfig;
