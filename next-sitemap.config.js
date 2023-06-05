/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.by-zip.com',
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: { // robot.txt 옵션 (필요시 작성)
      policies: [
        { userAgent: '*', allow: '/' }, // 접근 허용
        {
          userAgent: '*',
          disallow: ['/404', '/my', '/admin', '/signup', '/loading'],  // 접근 비허용
        },
      ],
    },
}
