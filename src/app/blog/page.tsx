import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Blog',
  description: 'Articles, guides, and resources for cycle tracking.',
  path: '/blog',
});

export default function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="space-y-6">
        {articles.map((article) => {
          let path = `/blog/${article.slug}`;
          if (article.category === 'what-is') {
            path = `/${article.slug}`;
          } else if (article.category === 'use-cases') {
            path = `/use-cases/${article.slug}`;
          } else if (article.category === 'conditions') {
            path = `/conditions/${article.slug}`;
          }

          return (
            <Link key={article.slug} href={path} className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-colors">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-[var(--muted)]">{article.summary}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
