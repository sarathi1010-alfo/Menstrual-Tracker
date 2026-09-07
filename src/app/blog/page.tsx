import { absoluteUrl } from '@/lib/seo';
import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export const metadata = {
  title: 'LunaCycle Blog - Menstrual Cycle Tracking Guides & Education',
  description: 'Learn everything about your menstrual cycle, ovulation, and reproductive health with our comprehensive guides.',
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
};

export default function BlogLandingPage() {
  const articles = getAllArticles();
  // Filter for regular blog articles (or all if we want to show everything)
  // We'll show all articles for now, maybe categorize them later

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-[var(--primary)]">LunaCycle Blog & Resources</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your privacy-first source for menstrual health education. Explore our guides to better understand your body.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <Link href={article.category === 'what-is' ? `/${article.slug}` : article.category === 'use-cases' ? `/use-cases/${article.slug}` : article.category === 'conditions' ? `/conditions/${article.slug}` : `/blog/${article.slug}`} key={article.slug}>
            <div className="card p-6 h-full hover:shadow-md transition-shadow border border-gray-100">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{article.summary}</p>
              <div className="text-[var(--primary)] text-sm font-medium">Read more &rarr;</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
