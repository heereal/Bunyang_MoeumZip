// eslint-disable-next-line
export default {
  titleTemplate: '%s  분양모음집',
  openGraph: {
    type: 'website',
    site_name: '분양모음집',
    images: [
      {
        //TODO: 배포하면 주소 바꿔야함
        url: 'https://by-dev.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffavicon.e7de0244.ico&w=48&q=75',
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: 'ogImage',
      href: 'https://firebasestorage.googleapis.com/v0/b/bunyang-moa.appspot.com/o/profileImages%2F89a682e9-1a82-4bd3-987c-6b5723ad88b7?alt=media&token=dc719e12-6df1-472a-978a-19368a90f977',
    },
  ],
};
