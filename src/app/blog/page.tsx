import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'LunaCycle Blog - Menstrual Cycle Tracking Guides',
  description: 'Learn about your menstrual cycle, ovulation, fertility window, and reproductive health with LunaCycle.',
  openGraph: {
    title: 'LunaCycle Blog - Menstrual Cycle Tracking Guides',
    description: 'Learn about your menstrual cycle, ovulation, fertility window, and reproductive health with LunaCycle.',
    url: absoluteUrl('/blog'),
  },
};

export default function BlogLanding() {
  const articles = getAllArticles();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">LunaCycle Blog</h1>
      <p className="text-lg text-gray-600 mb-10">
        Educational resources to help you understand your body and menstrual cycle.
      </p>

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
            <Link
              key={article.slug}
              href={href}
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
              <p className="text-gray-600">{article.summary}</p>
            </Link>
          );
        })}
      </div>
      <MedicalDisclaimer />
    </div>
  );
}
