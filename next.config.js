/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

const withImages = require('next-images');
module.exports = withImages();

module.exports = nextConfig;
