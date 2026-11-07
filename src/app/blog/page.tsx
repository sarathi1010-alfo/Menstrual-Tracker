import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Read the latest guides on cycle tracking, fertility, privacy, and menstrual health. Learn how to better understand your body with LunaCycle.',
  path: '/blog',
});

export default function BlogPage() {
  const articles = getAllArticles();

  // Categorize articles
  const categories = {
    fundamentals: articles.filter(a => a.category === 'fundamentals'),
    fertility: articles.filter(a => a.category === 'fertility'),
    privacy: articles.filter(a => a.category === 'privacy'),
    conditions: articles.filter(a => a.category === 'conditions'),
    wellness: articles.filter(a => a.category === 'wellness'),
    'what-is': articles.filter(a => a.category === 'what-is'),
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="heading-1 mb-4">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-[var(--muted)] text-lg mb-4">
          Welcome to the LunaCycle blog. Here you&apos;ll find comprehensive guides, expert insights, and practical tips on everything related to menstrual health, ovulation, fertility, and keeping your cycle data completely private. Explore our articles below to take control of your reproductive health knowledge.
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-[var(--primary)] hover:underline">Home</Link>
          <Link href="/about" className="text-[var(--primary)] hover:underline">About Us</Link>
          <Link href="/faq" className="text-[var(--primary)] hover:underline">FAQ</Link>
        </div>
      </div>

      <MedicalDisclaimer />

      <div className="space-y-12">
        {/* Cycle Fundamentals */}
        {categories.fundamentals.length > 0 && (
          <section>
            <h2 className="heading-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">Cycle Fundamentals</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.fundamentals.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-all">
                  <h3 className="heading-3 mb-2">{article.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{article.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Micro Answers (What is...) */}
        {categories['what-is'].length > 0 && (
          <section>
            <h2 className="heading-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">Quick Answers</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {categories['what-is'].map(article => (
                <Link key={article.slug} href={`/${article.slug}`} className="card p-4 hover:border-[var(--primary)]/50 transition-all text-sm">
                  <h3 className="font-semibold mb-1">{article.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Fertility & Family Planning */}
        {categories.fertility.length > 0 && (
          <section>
            <h2 className="heading-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">Fertility & Family Planning</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.fertility.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-all">
                  <h3 className="heading-3 mb-2">{article.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{article.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Conditions & Health */}
        {categories.conditions.length > 0 && (
          <section>
            <h2 className="heading-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">Conditions & Health</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.conditions.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-all">
                  <h3 className="heading-3 mb-2">{article.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{article.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Privacy & Security */}
        {categories.privacy.length > 0 && (
          <section>
            <h2 className="heading-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">Privacy & Security</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.privacy.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-all">
                  <h3 className="heading-3 mb-2">{article.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{article.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Wellness & Lifestyle */}
        {categories.wellness.length > 0 && (
          <section>
            <h2 className="heading-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">Wellness & Lifestyle</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories.wellness.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-all">
                  <h3 className="heading-3 mb-2">{article.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{article.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
