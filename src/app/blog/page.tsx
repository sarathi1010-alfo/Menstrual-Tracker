import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Evidence-based guides on menstrual health, cycle tracking, and privacy tips. Learn how to track your cycle naturally with LunaCycle.',
};

export default function BlogIndexPage() {
  const allArticles = getAllArticles();

  // Filter out 'what-is' micro-answers from the main index for clarity, if needed, or group them.
  const guides = allArticles.filter(a => a.category !== 'what-is');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Welcome to the LunaCycle Blog. Discover comprehensive, privacy-first educational resources for understanding your body, optimizing your health, and mastering menstrual cycle tracking.
        </p>
        <div className="flex gap-4 justify-center text-sm font-medium">
           <Link href="/" className="text-[var(--primary)] hover:underline">Home</Link>
           <Link href="/about" className="text-[var(--primary)] hover:underline">About</Link>
           <Link href="/faq" className="text-[var(--primary)] hover:underline">FAQ</Link>
        </div>
      </header>

      <MedicalDisclaimer />

      <div className="grid md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/blog/${guide.slug}`} className="group block">
            <div className="card p-6 h-full border border-transparent hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
              <div className="flex gap-2 mb-3 flex-wrap">
                {guide.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-[var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">
                {guide.title}
              </h2>
              <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3">
                {guide.summary}
              </p>
              <div className="flex items-center text-sm font-medium text-[var(--primary)] mt-auto">
                Read guide <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="heading-3 mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
           <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-[var(--muted)]">Cycle Fundamentals</span>
           <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-[var(--muted)]">Fertility & Family Planning</span>
           <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-[var(--muted)]">Privacy & Security</span>
           <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-[var(--muted)]">Conditions & Health</span>
           <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-[var(--muted)]">Wellness & Lifestyle</span>
        </div>
      </section>

    </div>
  );
}
