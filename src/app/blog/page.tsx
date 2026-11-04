import Link from 'next/link';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'Blog - LunaCycle',
  description: 'Learn about the menstrual cycle, ovulation, fertility, and more.',
  path: '/blog',
});

export default async function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>

      <MedicalDisclaimer />

      <div className="grid gap-8 mt-12">
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
            <div key={article.slug} className="border p-6 rounded-lg shadow-sm">
              <Link href={href} className="text-2xl font-semibold text-blue-600 hover:underline">
                {article.title}
              </Link>
              <p className="mt-2 text-gray-600">{article.summary}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
