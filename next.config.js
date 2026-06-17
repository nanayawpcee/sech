/** @type {import('next').NextConfig} */
const nextConfig = {
  
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev','192.168.2.82',],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

};

module.exports = nextConfig;
