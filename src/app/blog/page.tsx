import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Blog - LunaCycle',
  description: 'Cycle Education Hub. Understand your body with our semantic library of cycle mechanics, tracking methodology, and health indicators.',
};

export default function BlogIndexPage() {
  const articles = getAllArticles().filter(a => !a.category || a.category === 'blog');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">Blog</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Articles on menstrual health, cycle tracking, and reproductive wellness.
        </p>
      </header>

      <MedicalDisclaimer />

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
            <div className="card p-6 h-full border border-transparent hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
              <h2 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">
                {article.title}
              </h2>
              <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3">
                {article.summary}
              </p>
              <div className="flex items-center text-sm font-medium text-[var(--primary)] mt-auto">
                Read article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
