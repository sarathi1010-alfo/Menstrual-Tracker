import { getArticleSlugs, getArticleBySlug } from '@/lib/mdx';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Blog',
  description: 'Read our latest articles on menstrual health, cycle tracking, and more.',
  path: '/blog',
});

export default function BlogLanding() {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article) => article !== null);

  const blogArticles = articles.filter(a => !a?.meta.category || a.meta.category === 'blog');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Blog</h1>
      <div className="grid gap-8">
        {blogArticles.map((article) => (
          <Link href={`/blog/${article!.meta.slug}`} key={article!.meta.slug} className="block group">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-pink-600 transition-colors mb-3">
                {article!.meta.title}
              </h2>
              <p className="text-gray-600 line-clamp-2">
                {article!.meta.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
