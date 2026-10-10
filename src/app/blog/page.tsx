import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, ArticleMeta } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Free evidence-based guides to understanding your menstrual cycle, tracking methods, and reproductive health. Privacy-first educational resources from LunaCycle.',
  path: '/blog',
});

export default async function BlogIndex() {
  const allArticles = getAllArticles();

  // Categorize articles based on the prompt's instructions
  const categories = {
    fundamentals: allArticles.filter(a => a.category === 'fundamentals'),
    fertility: allArticles.filter(a => a.category === 'fertility'),
    privacy: allArticles.filter(a => a.category === 'privacy'),
    conditions: allArticles.filter(a => a.category === 'conditions'),
    wellness: allArticles.filter(a => a.category === 'wellness'),
    micro: allArticles.filter(a => a.category === 'what-is'),
    useCases: allArticles.filter(a => a.category === 'use-cases'),
  };

  const getHref = (article: ArticleMeta) => {
    if (article.category === 'what-is') {
      return `/${article.slug}`;
    }
    if (article.category === 'use-cases') {
      return `/use-cases/${article.slug}`;
    }
    if (article.category === 'conditions') {
      return `/conditions/${article.slug}`;
    }
    return `/blog/${article.slug}`;
  };

  const renderArticleList = (articles: ArticleMeta[], title: string) => {
    if (articles.length === 0) return null;
    return (
      <div className="mb-12">
        <h2 className="heading-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={getHref(article)}
              className="card p-6 flex flex-col h-full hover:border-[var(--primary)]/50 transition-all group"
            >
              <h3 className="heading-3 mb-3 group-hover:text-[var(--primary)] transition-colors">
                {article.title}
              </h3>
              <p className="text-[var(--muted)] text-sm mb-4 flex-grow">
                {article.summary}
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--primary)]">Read Guide</span>
                <span className="text-xs text-[var(--muted)]">{article.tags?.[0] || 'Education'}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-6 py-8">
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          Welcome to the LunaCycle Blog. Our mission is to provide you with the most accurate, medically-reviewed, and easy-to-understand information about menstrual health. We believe in digital privacy, which is why all our tools run securely on your device. Explore our guides on cycle fundamentals, fertility, privacy, conditions, and overall wellness.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm font-medium pt-4 border-t border-gray-200 dark:border-gray-800 mt-6">
            <Link href="/" className="text-[var(--primary)] hover:underline">Tracker Tool</Link>
            <span className="text-[var(--muted)]">•</span>
            <Link href="/about" className="text-[var(--primary)] hover:underline">About</Link>
            <span className="text-[var(--muted)]">•</span>
            <Link href="/faq" className="text-[var(--primary)] hover:underline">FAQ</Link>
        </div>
      </div>

      <MedicalDisclaimer />

      {renderArticleList(categories.fundamentals, 'Cycle Fundamentals')}
      {renderArticleList(categories.fertility, 'Fertility & Family Planning')}
      {renderArticleList(categories.privacy, 'Privacy & Security')}
      {renderArticleList(categories.conditions, 'Conditions & Health')}
      {renderArticleList(categories.wellness, 'Wellness & Lifestyle')}
      {renderArticleList(categories.useCases, 'Use Cases')}
      {renderArticleList(categories.micro, 'Micro-Answers (What Is...)')}
    </div>
  );
}
