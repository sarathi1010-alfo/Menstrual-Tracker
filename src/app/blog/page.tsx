import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = constructMetadata({
  title: 'Blog - LunaCycle',
  description: 'Learn about the menstrual cycle, health tracking, and more.',
  path: '/blog',
});

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <h1 className="heading-1 mb-4">LunaCycle Blog</h1>
      <p className="text-[var(--muted)] text-lg mb-8">
        Educational resources on cycle tracking, reproductive health, and more.
      </p>

      <div className="grid gap-6">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') {
            href = `/${article.slug}`;
          } else if (article.category === 'use-cases') {
            href = `/use-cases/${article.slug}`;
          } else if (article.category === 'conditions') {
            href = `/conditions/${article.slug}`;
          }

          return (
            <div key={article.slug} className="card p-6">
              <Link href={href}>
                <h2 className="heading-3 hover:text-[var(--primary)] transition-colors">
                  {article.title}
                </h2>
              </Link>
              <p className="text-[var(--muted)] mt-2">{article.summary}</p>
            </div>
          );
        })}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
