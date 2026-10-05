import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Menstrual Health & Cycle Tracking Guides',
  description: 'Explore comprehensive guides, articles, and resources on menstrual cycle tracking, hormones, fertility, and reproductive health.',
});

export default async function BlogPage() {
  const allArticles = await getAllArticles();

  // Sort by some criteria if needed, for now just show all
  const articles = allArticles.filter(a => a.category !== 'what-is' && a.category !== 'use-cases' && a.category !== 'conditions');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="heading-1 mb-6">LunaCycle Blog</h1>
      <p className="text-lg text-muted mb-12">
        Learn about your body, cycle phases, hormones, and how to track your cycle for better health and well-being.
      </p>

      <div className="grid gap-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block p-6 card hover:shadow-md transition-shadow"
          >
            <h2 className="heading-3 mb-2">{article.title}</h2>
            <p className="text-muted">{article.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
