/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/my',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

const withImages = require('next-images');
module.exports = withImages();

module.exports = nextConfig;
