import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, BookOpen, HeartPulse, Sparkles } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'LunaCycle Blog | Privacy-First Menstrual Health Education',
  description: 'Explore medically neutral, privacy-first guides on menstrual cycle tracking, hormones, and reproductive health.',
};

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  const clusters = allArticles.filter(a => a.category === 'cluster');
  const whatIs = allArticles.filter(a => a.category === 'what-is');
  const useCases = allArticles.filter(a => a.category === 'use-cases');
  const conditions = allArticles.filter(a => a.category === 'conditions');

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
          Menstrual Health <span className="text-[var(--primary)]">Education</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Medically neutral, privacy-first guides to help you understand your body, track your cycle, and take control of your reproductive health.
        </p>
      </div>

      <MedicalDisclaimer />

      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-[var(--primary)]" />
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Deep Dive Guides</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-colors group flex flex-col h-full">
              <div className="flex gap-2 mb-3 flex-wrap">
                {article.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                {article.title}
              </h3>
              <p className="text-[var(--muted)] text-sm mb-4 flex-grow line-clamp-3">
                {article.summary}
              </p>
              <span className="text-[var(--primary)] text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                Read Guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16 bg-[var(--secondary)]/5 rounded-2xl p-8 border border-[var(--secondary)]/20">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-[var(--secondary)]" />
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Quick Answers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {whatIs.map((article) => (
            <Link key={article.slug} href={`/${article.slug}`} className="bg-[var(--surface)] p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--secondary)] transition-colors group">
              <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors text-sm mb-1">
                {article.title}
              </h3>
              <p className="text-xs text-[var(--muted)] line-clamp-2">
                {article.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <HeartPulse className="text-orange-500" />
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Conditions & Health</h2>
          </div>
          <div className="space-y-4">
            {conditions.map((article) => (
              <Link key={article.slug} href={`/conditions/${article.slug}`} className="block card p-5 hover:border-orange-500/50 transition-colors group">
                <h3 className="text-lg font-bold mb-1 text-[var(--foreground)] group-hover:text-orange-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-[var(--muted)] text-sm line-clamp-2">
                  {article.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-green-500" />
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Who is it for?</h2>
          </div>
          <div className="space-y-4">
            {useCases.map((article) => (
              <Link key={article.slug} href={`/use-cases/${article.slug}`} className="block card p-5 hover:border-green-500/50 transition-colors group">
                <h3 className="text-lg font-bold mb-1 text-[var(--foreground)] group-hover:text-green-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-[var(--muted)] text-sm line-clamp-2">
                  {article.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
