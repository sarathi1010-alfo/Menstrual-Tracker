import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { getAllArticles } from '@/lib/mdx';

export const metadata: Metadata = constructMetadata({
  title: 'Blog',
  description: 'Educational articles, guides, and resources for menstrual health and cycle tracking.',
  path: '/blog',
});

export default async function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">LunaCycle Blog</h1>
        <p className="text-lg text-[var(--muted)]">Educational guides, resources, and deep-dives on menstrual health.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
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
            <Link key={article.slug} href={href} className="group block h-full">
              <article className="h-full bg-[var(--surface)] p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--primary)] transition-colors flex flex-col">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-[var(--muted)] line-clamp-3 text-sm flex-grow">
                  {article.summary}
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
