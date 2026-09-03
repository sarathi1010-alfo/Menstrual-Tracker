import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'Blog & Articles | LunaCycle',
  description: 'Read the latest guides and articles on menstrual cycle tracking, ovulation, and reproductive health.',
};

export default function BlogLandingPage() {
  const articles = getAllArticles().filter(a => a.category !== 'what-is' && a.category !== 'use-cases' && a.category !== 'conditions');

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">LunaCycle Blog & Education</h1>
      <p className="text-xl text-gray-600 mb-10">
        Empower yourself with knowledge about your body, menstrual cycle phases, and reproductive health.
      </p>

      <MedicalDisclaimer />

      <div className="grid gap-8 md:grid-cols-2 mt-12">
        {articles.map((article) => (
          <div key={article.slug} className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <p className="text-sm font-medium text-primary mb-2">
                  {article.category ? article.category.toUpperCase() : 'ARTICLE'}
                </p>
                <Link href={`/blog/${article.slug}`} className="block mt-2">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-base text-gray-500 line-clamp-3">
                    {article.summary}
                  </p>
                </Link>
              </div>
              <div className="mt-6 flex items-center">
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  Read full article &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}