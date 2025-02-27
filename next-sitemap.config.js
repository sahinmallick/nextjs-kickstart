module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: Infinity,
  priority: 0.7,
  additionalPaths: async () => [
    {
      loc: "/",
      priority: 1.0,
    },
  ],
};
