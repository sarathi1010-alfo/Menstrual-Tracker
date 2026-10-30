import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'Blog - LunaCycle',
  description: 'Learn about menstrual cycles, tracking, and more.',
};

export default async function BlogLandingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>

      <div className="space-y-8">
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
            <article key={article.slug} className="card p-6">
              <h2 className="text-2xl font-bold mb-2">
                <Link href={href} className="hover:text-[var(--primary)] transition-colors">
                  {article.title}
                </Link>
              </h2>
              <p className="text-[var(--muted)] mb-4">{article.summary}</p>
              <Link href={href} className="text-[var(--primary)] hover:underline font-medium">
                Read more &rarr;
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-12">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
