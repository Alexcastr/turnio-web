import type { MetadataRoute } from 'next';

const BASE_URL = 'https://turnio.site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/it-admin/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
