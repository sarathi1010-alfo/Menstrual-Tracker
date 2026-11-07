import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'Blog & Articles - LunaCycle',
  description: 'Read the latest articles on cycle tracking, menstrual health, and reproductive wellness.',
  path: '/blog',
});

export default async function BlogLandingPage() {
  const articles = getAllArticles();

  // Only show generic blog category items here on the main list
  const blogArticles = articles.filter(a => a.category === 'blog' || !a.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight sm:text-5xl mb-8">
        LunaCycle Blog
      </h1>
      <p className="text-xl text-[var(--muted)] mb-12">
        Educational resources, guides, and insights to help you understand your menstrual cycle and take control of your reproductive health.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {blogArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block group"
          >
            <div className="card p-6 h-full border border-gray-100 transition-all hover:border-[var(--primary)] hover:shadow-md">
              <h2 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] mb-3">
                {article.title}
              </h2>
              <p className="text-[var(--muted)]">
                {article.summary}
              </p>
              {article.tags && article.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
