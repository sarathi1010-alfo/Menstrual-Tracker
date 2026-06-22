import Link from 'next/link';
import { getAllGuides } from '@/lib/mdx';
import { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cycle Health Guides & Education - Period Tracking Resources',
  description: 'Free evidence-based guides to understanding your menstrual cycle, tracking methods, and reproductive health. Privacy-first educational resources from CycleHub.',
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">Cycle Education Hub</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Understand your body with our semantic library of cycle mechanics, tracking methodology, and health indicators.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block">
            <div className="card p-6 h-full border border-transparent hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
              <div className="flex gap-2 mb-3 flex-wrap">
                {guide.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-[var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">
                {guide.title}
              </h2>
              <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3">
                {guide.summary}
              </p>
              <div className="flex items-center text-sm font-medium text-[var(--primary)] mt-auto">
                Read guide <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
