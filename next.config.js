/** @type {import('next').NextConfig} */

module.exports = {
  // <Image> 사용 시 어떤 출처의 외부 이미지든 사용 가능함
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        port: '',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: false,
  // swcMinify: true, // 코드 압축하여 성능 개선
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/',
        permanent: false,
      },
    ];
  },
};
