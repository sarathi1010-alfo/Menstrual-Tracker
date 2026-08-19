import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = constructMetadata({
  title: 'Blog & Articles - LunaCycle',
  description: 'Read the latest articles about menstrual health, cycle tracking, and reproductive wellness.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const allArticles = getAllArticles().filter(a => a.category === 'blog' || !a.category);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="heading-1 mb-4">Blog & Articles</h1>
      <p className="text-[var(--muted)] text-lg mb-8">
        Learn more about your menstrual cycle, reproductive health, and how to track effectively.
      </p>
      <MedicalDisclaimer />
      <div className="grid gap-6 md:grid-cols-2">
        {allArticles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 block hover:border-[var(--primary)]/50 transition-all">
            <h2 className="heading-3 mb-2">{article.title}</h2>
            <p className="text-[var(--muted)] text-sm mb-4">{article.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
