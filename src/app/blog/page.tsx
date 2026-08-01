import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Explore our complete guides on menstrual cycle tracking, ovulation, fertility, and data privacy.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-8">
      <section className="text-center space-y-6">
        <h1 className="heading-1">LunaCycle Blog &ndash; Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Welcome to the LunaCycle Blog. Here you will find in-depth, medically accurate information on menstrual health, fertility, cycle tracking, and digital privacy. Empower yourself with knowledge to better understand your body&apos;s natural rhythms.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="heading-2">Cycle Fundamentals</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/blog/the-ultimate-2026-guide-to-menstrual-cycle-tracking" className="card p-6 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-semibold text-lg mb-2">The Ultimate 2026 Guide to Menstrual Cycle Tracking</h3>
            <p className="text-sm text-[var(--muted)]">Master your menstrual cycle with our comprehensive pillar guide.</p>
          </Link>
          <Link href="/blog/what-is-a-menstrual-cycle" className="card p-6 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-semibold text-lg mb-2">What is a Menstrual Cycle?</h3>
            <p className="text-sm text-[var(--muted)]">Understand the basics of your monthly cycle.</p>
          </Link>
          <Link href="/blog/what-is-ovulation" className="card p-6 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-semibold text-lg mb-2">What is Ovulation?</h3>
            <p className="text-sm text-[var(--muted)]">Learn about ovulation and its role in your cycle.</p>
          </Link>
          <Link href="/blog/what-is-the-fertile-window" className="card p-6 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-semibold text-lg mb-2">What is the Fertile Window?</h3>
            <p className="text-sm text-[var(--muted)]">Discover when you are most fertile.</p>
          </Link>
          <Link href="/blog/what-is-the-luteal-phase" className="card p-6 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-semibold text-lg mb-2">What is the Luteal Phase?</h3>
            <p className="text-sm text-[var(--muted)]">Explore the second half of your cycle.</p>
          </Link>
          <Link href="/blog/what-is-the-follicular-phase" className="card p-6 hover:border-[var(--primary)]/50 transition-all">
            <h3 className="font-semibold text-lg mb-2">What is the Follicular Phase?</h3>
            <p className="text-sm text-[var(--muted)]">Learn about the first half of your cycle.</p>
          </Link>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row gap-4 justify-center items-center py-8">
        <Link href="/" className="button-primary">Back to Tracker</Link>
        <Link href="/about" className="px-6 py-3 rounded-2xl font-medium text-[var(--foreground)] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">About LunaCycle</Link>
        <Link href="/faq" className="px-6 py-3 rounded-2xl font-medium text-[var(--foreground)] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">FAQ</Link>
      </section>

      <MedicalDisclaimer />
    </div>
  );
}
