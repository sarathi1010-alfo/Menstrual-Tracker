import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Blog | LunaCycle',
  description: 'Read the latest articles about menstrual cycle tracking, reproductive health, and wellness.',
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
};

export default function BlogLanding() {
  const allArticles = getAllArticles();

  // Filter for regular blog posts and guides
  const blogPosts = allArticles.filter(a => a.category === 'blog' || !a.category);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="heading-1 mb-8">LunaCycle Blog</h1>
      <p className="text-lg text-muted mb-12">
        Expert insights on menstrual health, cycle tracking, and reproductive wellness.
      </p>

      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="card p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="heading-3 mb-2 text-primary hover:text-primary/80 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted mb-4">{post.summary}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span key={tag} className="text-xs bg-secondary/20 text-secondary-800 px-2 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
