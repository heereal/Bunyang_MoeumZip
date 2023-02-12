const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
const METHOD_APT_ALL = 'getAPTLttotPblancDetail';
const METHOD_APT_DETAIL = 'getAPTLttotPblancMdl';
const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: '/api/default',
        destination: `${BASE_URL}/${METHOD_APT_ALL}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
      },
      {
        source: '/api/detail',
        destination: `${BASE_URL}/${METHOD_APT_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
      },
    ];
  },
};
