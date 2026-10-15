
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'CycleHub Blog - Menstrual Health & Tracking Guides',
  description: 'Read the latest articles on menstrual health, cycle tracking, and reproductive wellness.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  // Filter for regular blog articles
  const blogArticles = allArticles.filter(article => !article.category || article.category === 'blog');

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-bold mb-8 text-[var(--foreground)]">CycleHub Blog</h1>
      <p className="text-xl text-[var(--muted)] mb-12">
        Guides and insights to help you understand your menstrual cycle.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {blogArticles.map((article) => {
          return (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
              <div className="card p-6 h-full transition-shadow hover:shadow-md border border-[var(--border)] bg-[var(--card)] rounded-xl">
                <h2 className="text-2xl font-semibold mb-3 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {article.title}
                </h2>
                <p className="text-[var(--muted)] mb-4">{article.summary}</p>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
