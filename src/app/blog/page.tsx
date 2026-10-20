import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Blog - LunaCycle',
  description: 'Educational articles on menstrual health, cycle tracking, and reproductive wellness.',
  openGraph: {
    title: 'Blog - LunaCycle',
    description: 'Educational articles on menstrual health, cycle tracking, and reproductive wellness.',
    url: absoluteUrl('/blog'),
  },
};

export default function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-[var(--foreground)]">LunaCycle Blog</h1>

      <MedicalDisclaimer />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          else if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          else if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <Link key={article.slug} href={href} className="block group">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full hover:border-[var(--primary)] transition-colors">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--primary)]">
                  {article.title}
                </h2>
                <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-[var(--foreground)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
