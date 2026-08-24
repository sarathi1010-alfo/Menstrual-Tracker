import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Blog | LunaCycle',
  description: 'Learn about the menstrual cycle, health tracking, and reproductive wellness.',
};

export default function BlogLanding() {
  const allArticles = getAllArticles();

  // Only display standard blog posts on the main blog feed
  const blogPosts = allArticles.filter(a => a.category === 'blog' || !a.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Menstrual Health Blog</h1>
      <p className="text-lg text-gray-700 mb-12">
        Explore our educational guides to understand your body better.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {post.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
