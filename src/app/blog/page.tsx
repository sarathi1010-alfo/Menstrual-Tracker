import { getAllArticles, ArticleMeta } from '@/lib/mdx';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'LunaCycle Blog - Menstrual Health & Cycle Tracking Guides',
  description: 'Read the latest guides and educational content on menstrual health, cycle tracking, and reproductive wellness.',
};

export default async function BlogLandingPage() {
  const articles = getAllArticles();

  // Exclude 'what-is', 'use-cases', 'conditions' from the main blog list if needed,
  // or show everything. Let's show everything but route them correctly.

  const getHref = (article: ArticleMeta) => {
    if (article.category === 'what-is') return `/${article.slug}`;
    if (article.category === 'use-cases') return `/use-cases/${article.slug}`;
    if (article.category === 'conditions') return `/conditions/${article.slug}`;
    return `/blog/${article.slug}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Blog</h1>
      <p className="text-xl mb-8">Educational resources for menstrual health and cycle tracking.</p>

      <MedicalDisclaimer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {articles.map((article) => (
          <Link key={article.slug} href={getHref(article)} className="block border p-6 rounded-xl hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.summary}</p>
            {article.tags && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
