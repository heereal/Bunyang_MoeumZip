/** @type {import('next').NextConfig} */
const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;
const MAP_KEY = process.env.NEXT_PUBLIC_NCP_CLIENT_ID;

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
  async rewrites() {
    return [
      {
        source: '/api/APTRealPrice/:id/:contractMonth',
        destination: `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?numOfRows=1000&LAWD_CD=:id&DEAL_YMD=:contractMonth&serviceKey=${SERVICE_KEY}`,
      },
    ];
  },
};
