import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'LunaCycle Blog | Cycle Tracking & Menstrual Health',
  description: 'Learn about cycle tracking, menstrual health, and more with LunaCycle.',
};

export default function BlogIndex() {
  const articles = getAllArticles();

  // Filter out what-is, use-cases, conditions for the main blog list if desired,
  // or keep them all. The prompt implies consolidating educational content under /blog
  // but explicitly routing them differently. We'll show all here but with correct links.

  const getArticleLink = (article: import('@/lib/mdx').ArticleMeta) => {
    if (article.category === 'what-is') return `/${article.slug}`;
    if (article.category === 'use-cases') return `/use-cases/${article.slug}`;
    if (article.category === 'conditions') return `/conditions/${article.slug}`;
    return `/blog/${article.slug}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="heading-1 mb-6 text-center text-primary">LunaCycle Education Hub</h1>
      <p className="text-lg text-muted text-center mb-12">
        Empower yourself with knowledge about your cycle, fertility, and overall health.
      </p>

      <MedicalDisclaimer />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link href={getArticleLink(article)} key={article.slug} className="card p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-primary">{article.title}</h2>
            <p className="text-muted text-sm line-clamp-3">{article.summary}</p>
            {article.category && (
              <span className="inline-block mt-4 text-xs font-medium bg-secondary/20 text-secondary-dark px-2 py-1 rounded">
                {article.category.replace('-', ' ')}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
