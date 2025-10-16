import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.icbmlaw.ca';

  // Define all your routes
  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/summer-camp',
    '/privacy',
    '/terms',
  ];

  // Generate sitemap entries for both English and Vietnamese
  const sitemap: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1 : 0.8,
    });
  });

  return sitemap;
}
