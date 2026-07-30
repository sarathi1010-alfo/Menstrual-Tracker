import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Blog & Resources - CycleHub',
  description: 'Educational resources, guides, and articles about menstrual health, tracking, and the female cycle.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] flex items-center justify-center gap-3">
          <BookOpen className="text-[var(--primary)]" size={40} />
          Blog & Resources
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Explore educational resources and guides on menstrual health, cycle tracking, and understanding your body.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group card p-6 hover:border-[var(--primary)]/50 transition-all flex flex-col h-full"
          >
            <div className="flex gap-2 mb-3 flex-wrap">
              {article.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
              {article.title}
            </h2>
            <p className="text-[var(--muted)] flex-grow">
              {article.summary}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center text-sm text-[var(--primary)] font-medium">
              Read article <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
        {articles.length === 0 && (
          <div className="col-span-2 text-center py-12 text-[var(--muted)]">
            No articles found. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}
