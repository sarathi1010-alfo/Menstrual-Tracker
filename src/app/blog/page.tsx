import React from 'react';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Blog | LunaCycle',
  description: 'Read the latest articles on menstrual health, cycle tracking, and reproductive wellness.',
};

export default function BlogPage() {
  const articles = getAllArticles().filter(a => a.category === 'blog');

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <p className="text-lg text-muted mb-8">Explore our latest articles on menstrual health, cycle tracking, and more.</p>

      <div className="grid gap-8 mt-8">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="block">
            <div className="card p-6 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
              <p className="text-muted">{article.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      <MedicalDisclaimer />
    </div>
  );
}
