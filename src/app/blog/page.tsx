import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';

export const metadata: Metadata = constructMetadata({
  title: 'Blog - CycleHub',
  description: 'Read the latest guides and articles on menstrual health, cycle tracking, and more.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <header className="text-center space-y-4">
        <h1 className="heading-1">CycleHub Blog</h1>
        <p className="text-lg text-[var(--muted)]">Educational guides on menstrual health and cycle tracking.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => {
          let path = `/blog/${article.slug}`;
          if (article.slug.startsWith('what-is-')) {
            path = `/${article.slug}`;
          } else if (article.slug.startsWith('cycle-tracking-teens')) {
            path = `/use-cases/${article.slug}`;
          } else if (article.slug.startsWith('pcos-and-cycle')) {
            path = `/conditions/${article.slug}`;
          }
          return (
            <Link key={article.slug} href={path} className="card p-6 hover:border-[var(--primary)]/50 transition-all">
              <h2 className="heading-3 mb-2">{article.title}</h2>
              <p className="text-[var(--muted)]">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
