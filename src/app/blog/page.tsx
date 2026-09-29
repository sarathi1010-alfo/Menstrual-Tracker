import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { BookOpen, ArrowRight, Book, Calendar, Shield, Activity, Heart } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Read the latest guides on menstrual cycle tracking, ovulation, fertility, and digital privacy. Learn how to track your cycle safely and effectively.',
  path: '/blog',
});

export default function BlogIndexPage() {
  const allArticles = getAllArticles();

  // Categorize articles based on the Week 1 structure and general categories
  const categories = [
    { id: 'fundamentals', title: 'Cycle Fundamentals', icon: <Book size={20} />, articles: allArticles.filter(a => ['what-is', 'fundamentals', 'pillar'].includes(a.category || '')) },
    { id: 'fertility', title: 'Fertility & Family Planning', icon: <Calendar size={20} />, articles: allArticles.filter(a => a.category === 'fertility') },
    { id: 'conditions', title: 'Conditions & Health', icon: <Activity size={20} />, articles: allArticles.filter(a => a.category === 'conditions') },
    { id: 'privacy', title: 'Privacy & Security', icon: <Shield size={20} />, articles: allArticles.filter(a => a.category === 'privacy') },
    { id: 'use-cases', title: 'Wellness & Lifestyle', icon: <Heart size={20} />, articles: allArticles.filter(a => a.category === 'use-cases') },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
          Welcome to the LunaCycle educational hub. Here you&apos;ll find comprehensive, evidence-based resources to help you understand your menstrual cycle, make informed decisions about your health, and protect your digital privacy while tracking.
        </p>
      </header>

      <MedicalDisclaimer />

      {categories.map((category) => {
        if (category.articles.length === 0) return null;

        return (
          <section key={category.id} className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                {category.icon}
              </div>
              <h2 className="heading-2 m-0">{category.title}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.articles.map((article) => {
                // Determine link based on category
                let href = `/blog/${article.slug}`;
                if (article.category === 'what-is') href = `/${article.slug}`;
                else if (article.category === 'use-cases') href = `/use-cases/${article.slug}`;
                else if (article.category === 'conditions') href = `/conditions/${article.slug}`;

                return (
                  <Link key={article.slug} href={href} className="group block">
                    <div className="card p-6 h-full flex flex-col border border-transparent hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {article.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-[var(--muted)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3 flex-grow">
                        {article.summary}
                      </p>
                      <div className="flex items-center text-sm font-medium text-[var(--primary)] mt-auto">
                        Read more <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Internal Links Block */}
      <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-gray-200 dark:border-gray-800">
        <Link href="/" className="text-[var(--muted)] hover:text-[var(--primary)] font-medium">
          Home
        </Link>
        <Link href="/about" className="text-[var(--muted)] hover:text-[var(--primary)] font-medium">
          About LunaCycle
        </Link>
        <Link href="/faq" className="text-[var(--muted)] hover:text-[var(--primary)] font-medium">
          Frequently Asked Questions
        </Link>
      </div>
    </div>
  );
}
