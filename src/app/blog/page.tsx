import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Blog & Education',
  description: 'Learn about menstrual cycles, hormones, tracking tips, and women\'s health on the LunaCycle blog.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const articles = getAllArticles().filter(a => a.category === 'cluster' || !a.category);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="heading-1 mb-4">Cycle Tracking & Health Hub</h1>
        <p className="text-xl text-[var(--muted)]">
          Everything you need to know about your cycle, hormones, and fertility.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-colors group">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full uppercase tracking-wider">
                {article.tags[0] || 'Article'}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2 text-[var(--foreground)]">
              {article.title}
            </h2>
            <p className="text-[var(--muted)] mb-6 line-clamp-3">
              {article.summary}
            </p>
            <div className="flex items-center text-sm font-medium text-[var(--primary)]">
              Read article <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>
        ))}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
