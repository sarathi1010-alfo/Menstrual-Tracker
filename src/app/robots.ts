import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'AhrefsBot', 'AhrefsSiteAudit'],
        allow: '/',
      }
    ],
    sitemap: 'https://lunacycle.alfo.online/sitemap.xml',
  };
}
