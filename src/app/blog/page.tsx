import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export default async function BlogLandingPage() {
  const articles = await getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>
      <p className="text-lg text-gray-700 mb-12">
        Educational guides on menstrual health, cycle tracking, and reproductive wellness.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          else if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          else if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <Link key={article.slug} href={href} className="block group">
              <div className="border border-gray-200 rounded-lg p-6 h-full transition-shadow hover:shadow-md">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600">{article.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags?.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
