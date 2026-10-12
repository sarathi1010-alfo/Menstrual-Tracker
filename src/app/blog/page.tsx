import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LunaCycle Blog - Menstrual Health & Cycle Tracking',
  description: 'Read the latest guides, tips, and insights on menstrual health, cycle tracking, and reproductive wellness.',
};

export default async function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">LunaCycle Blog</h1>

      <MedicalDisclaimer />

      <div className="grid gap-8 md:grid-cols-2 mt-8">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <div key={article.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={href} className="text-pink-600 hover:text-pink-800">
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags?.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={href} className="text-pink-600 font-medium hover:underline">
                Read More &rarr;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
