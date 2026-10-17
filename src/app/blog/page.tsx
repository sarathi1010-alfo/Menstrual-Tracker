import Link from 'next/link';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { getAllArticles } from '@/lib/mdx';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Explore comprehensive guides, micro-answers, and deep dives on cycle tracking, fertility, health conditions, and digital privacy.',
  path: '/blog',
});

export default function BlogPage() {
  const allArticles = getAllArticles();

  const fundamentals = allArticles.filter(a => a.category === 'fundamentals');
  const micro = allArticles.filter(a => a.category === 'what-is');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="heading-1 mb-4">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-[var(--muted)] text-lg">
          Welcome to the LunaCycle Blog. Our goal is to provide accurate, privacy-focused information to help you understand your menstrual cycle, make informed decisions about your health, and protect your digital privacy. Explore our guides on cycle fundamentals, fertility planning, health conditions, and wellness.
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <Link href="/" className="text-[var(--primary)] hover:underline">Home</Link>
          <Link href="/about" className="text-[var(--primary)] hover:underline">About</Link>
          <Link href="/faq" className="text-[var(--primary)] hover:underline">FAQ</Link>
        </div>
      </div>

      <section>
        <h2 className="heading-2 mb-6">Cycle Fundamentals</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <Link href="/blog/ultimate-guide-menstrual-cycle-tracking" className="card p-6 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-semibold text-lg mb-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">The Ultimate Guide to Menstrual Cycle Tracking in 2026</h3>
            <p className="text-sm text-[var(--muted)]">A complete hub for understanding cycle tracking, phases, and health insights.</p>
          </Link>
          {fundamentals.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 hover:border-[var(--primary)]/50 transition-all">
              <h3 className="font-semibold text-lg mb-2 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">{article.title}</h3>
              <p className="text-sm text-[var(--muted)]">{article.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="heading-2 mb-6">Quick Answers (What is...)</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/what-is-menstrual-cycle" className="card p-4 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-medium hover:text-[var(--primary)] transition-colors">What is a Menstrual Cycle?</h3>
          </Link>
          <Link href="/what-is-ovulation" className="card p-4 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-medium hover:text-[var(--primary)] transition-colors">What is Ovulation?</h3>
          </Link>
          <Link href="/what-is-fertile-window" className="card p-4 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-medium hover:text-[var(--primary)] transition-colors">What is the Fertile Window?</h3>
          </Link>
          <Link href="/what-is-luteal-phase" className="card p-4 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-medium hover:text-[var(--primary)] transition-colors">What is the Luteal Phase?</h3>
          </Link>
          <Link href="/what-is-follicular-phase" className="card p-4 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-medium hover:text-[var(--primary)] transition-colors">What is the Follicular Phase?</h3>
          </Link>
          {micro.map(article => (
            <Link key={article.slug} href={`/${article.slug}`} className="card p-4 hover:border-[var(--primary)]/50 transition-all">
              <h3 className="font-medium hover:text-[var(--primary)] transition-colors">{article.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
         <h2 className="heading-2 mb-6">Other Categories</h2>
         <p className="text-[var(--muted)]">More articles coming soon for Fertility & Family Planning, Privacy & Security, Conditions & Health, and Wellness & Lifestyle.</p>
      </section>

      <MedicalDisclaimer />
    </div>
  );
}
