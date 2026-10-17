import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Blog',
  description: 'Educational articles on menstrual cycle tracking, hormones, phases, and health.',
  path: '/blog',
});

export default function BlogPage() {
  const allArticles = getAllArticles();
  const blogArticles = allArticles.filter((article) => article.category === 'blog');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="heading-1 mb-8">LunaCycle Blog</h1>
      <p className="text-lg text-muted mb-12">
        Learn everything about your menstrual cycle, from fundamentals to in-depth health guides.
      </p>

      <div className="grid gap-8">
        {blogArticles.map((article) => (
          <article key={article.slug} className="card p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <Link href={`/blog/${article.slug}`} className="block">
              <h2 className="heading-2 text-primary hover:underline mb-2">{article.title}</h2>
            </Link>
            <p className="text-muted mb-4">{article.summary}</p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-secondary/20 text-secondary-800 px-2 py-1 rounded-md text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
