import Link from 'next/link';
import { getAllArticles, ArticleMeta } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Blog - LunaCycle',
  description: 'Learn about your menstrual cycle, tracking, health, and more.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const articles = getAllArticles();

  const getArticlePath = (article: ArticleMeta) => {
    switch (article.category) {
      case 'what-is':
        return `/${article.slug}`;
      case 'use-cases':
        return `/use-cases/${article.slug}`;
      case 'conditions':
        return `/conditions/${article.slug}`;
      case 'cluster':
      default:
        return `/blog/${article.slug}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="heading-1">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={getArticlePath(article)} className="card p-6 hover:border-[var(--primary)] transition-colors">
            <h2 className="heading-3 mb-2">{article.title}</h2>
            <p className="text-[var(--muted)] line-clamp-3">{article.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
