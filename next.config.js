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
    ],
},
  reactStrictMode: false,
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
