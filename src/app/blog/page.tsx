import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'LunaCycle Blog - Menstrual Health & Cycle Tracking Guides',
  description: 'Educational resources, guides, and tips on menstrual cycle tracking, reproductive health, and wellness.',
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
};

export default function BlogLanding() {
  const articles = getAllArticles().filter(a => a.category === 'blog');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">LunaCycle Blog</h1>
        <p className="text-lg text-[var(--muted)]">Educational guides and resources for understanding your body.</p>
      </div>

      <MedicalDisclaimer />

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link href={`/blog/${article.slug}`} key={article.slug} className="card p-6 hover:border-[var(--primary)]/50 transition-all group">
            <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">{article.title}</h2>
            <p className="text-[var(--muted)] mb-4 line-clamp-2">{article.summary}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
