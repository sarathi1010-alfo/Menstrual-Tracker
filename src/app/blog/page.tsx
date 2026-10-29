import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'Blog - Cycle Health Guides & Education',
  description: 'Free evidence-based guides to understanding your menstrual cycle, tracking methods, and reproductive health.',
  path: '/blog',
});

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">Cycle Education Blog</h1>
      </header>

      <MedicalDisclaimer />

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          else if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          else if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
          <Link key={article.slug} href={href} className="group block">
            <div className="card p-6 h-full border border-transparent hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
              <h2 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">
                {article.title}
              </h2>
              <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3">
                {article.summary}
              </p>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
