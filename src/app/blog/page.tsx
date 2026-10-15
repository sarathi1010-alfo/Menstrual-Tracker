import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'LunaCycle Blog - Menstrual Health & Cycle Tracking Guides',
  description: 'Explore our library of privacy-first guides, micro-answers, use cases, and condition deep-dives for menstrual cycle tracking.',
};

export default function BlogLandingPage() {
  const allArticles = getAllArticles();

  const clusterArticles = allArticles.filter(a => !a.category || a.category === 'blog');
  const microAnswers = allArticles.filter(a => a.category === 'what-is');
  const useCases = allArticles.filter(a => a.category === 'use-cases');
  const conditions = allArticles.filter(a => a.category === 'conditions');

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">LunaCycle Educational Hub</h1>
      <MedicalDisclaimer />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Cluster Articles</h2>
        <ul className="space-y-4">
          {clusterArticles.map(article => (
            <li key={article.slug}>
              <Link href={`/blog/${article.slug}`} className="block hover:bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-bold text-lg text-[var(--primary)]">{article.title}</h3>
                <p className="text-gray-600 mt-1">{article.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Micro-Answers (What is...?)</h2>
        <ul className="space-y-4">
          {microAnswers.map(article => (
            <li key={article.slug}>
              <Link href={`/${article.slug}`} className="block hover:bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-bold text-lg text-[var(--primary)]">{article.title}</h3>
                <p className="text-gray-600 mt-1">{article.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Use Case Guides</h2>
        <ul className="space-y-4">
          {useCases.map(article => (
            <li key={article.slug}>
              <Link href={`/use-cases/${article.slug}`} className="block hover:bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-bold text-lg text-[var(--primary)]">{article.title}</h3>
                <p className="text-gray-600 mt-1">{article.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Condition Deep-Dives</h2>
        <ul className="space-y-4">
          {conditions.map(article => (
            <li key={article.slug}>
              <Link href={`/conditions/${article.slug}`} className="block hover:bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-bold text-lg text-[var(--primary)]">{article.title}</h3>
                <p className="text-gray-600 mt-1">{article.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
