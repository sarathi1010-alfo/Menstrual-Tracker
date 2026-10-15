import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'LunaCycle Blog - Menstrual Cycle Tracking & Health',
  description: 'Evidence-based articles on menstrual cycles, period tracking, and reproductive health from LunaCycle.',
};

export default function BlogIndexPage() {
  const allArticles = getAllArticles();
  const articles = allArticles.filter(article => article.category === 'blog' || article.category === 'cluster' || !article.category); // Fallback

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">LunaCycle Blog</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Insights on your cycle, health conditions, and how to track accurately.
        </p>
      </header>

      <MedicalDisclaimer />

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
            <div className="card p-6 h-full border border-transparent hover:border-[var(--primary)]/30 transition-all hover:shadow-md flex flex-col">
              <div className="flex gap-2 mb-3 flex-wrap">
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-[var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
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
