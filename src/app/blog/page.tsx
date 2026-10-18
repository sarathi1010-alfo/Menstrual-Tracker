import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export default async function BlogLanding() {
  const articles = await getAllArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Educational Blog</h1>
      <MedicalDisclaimer />

      <div className="grid gap-6 mt-8">
        {articles.map((article) => {
          let href = `/blog/${article.slug}`;
          if (article.category === 'what-is') href = `/${article.slug}`;
          if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
          if (article.category === 'conditions') href = `/conditions/${article.slug}`;

          return (
            <div key={article.slug} className="p-6 border rounded-lg hover:shadow-md transition">
              <Link href={href} className="block">
                <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600">{article.summary}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <span className="capitalize">{article.category}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
