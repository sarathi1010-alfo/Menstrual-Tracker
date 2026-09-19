import Link from 'next/link';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Explore comprehensive guides on menstrual cycle tracking, ovulation, fertility, health conditions, and digital privacy with LunaCycle.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="heading-1 mb-6">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-3xl">
          Welcome to the LunaCycle Blog. Our mission is to provide you with medically accurate, easy-to-understand information about your menstrual health, fertility, and cycle tracking. We believe that understanding your body should not come at the cost of your digital privacy. Explore our guides on everything from cycle fundamentals and specific health conditions to detailed comparisons and deep dives into local-storage security. Your body. Your data. Your choice.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/" className="text-[var(--primary)] font-medium hover:underline">Home</Link>
          <Link href="/about" className="text-[var(--primary)] font-medium hover:underline">About</Link>
          <Link href="/faq" className="text-[var(--primary)] font-medium hover:underline">FAQ</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="card p-6 space-y-4">
          <h2 className="heading-3 border-b border-gray-200 dark:border-gray-800 pb-2">Cycle Fundamentals</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/blog/the-ultimate-guide-to-menstrual-cycle-tracking-in-2026" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors group">
                <span className="block font-medium group-hover:underline">The Ultimate Guide to Menstrual Cycle Tracking in 2026</span>
                <span className="text-sm text-[var(--muted)] line-clamp-2">Everything you need to know to start tracking your cycle effectively and securely today.</span>
              </Link>
            </li>
            <li>
              <Link href="/what-is-a-menstrual-cycle" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors group">
                <span className="block font-medium group-hover:underline">What is a Menstrual Cycle?</span>
              </Link>
            </li>
             <li>
              <Link href="/what-is-the-follicular-phase" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors group">
                <span className="block font-medium group-hover:underline">What is the Follicular Phase?</span>
              </Link>
            </li>
            <li>
              <Link href="/what-is-the-luteal-phase" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors group">
                <span className="block font-medium group-hover:underline">What is the Luteal Phase?</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="heading-3 border-b border-gray-200 dark:border-gray-800 pb-2">Fertility & Family Planning</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/what-is-ovulation" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors group">
                <span className="block font-medium group-hover:underline">What is Ovulation?</span>
              </Link>
            </li>
            <li>
              <Link href="/what-is-the-fertile-window" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors group">
                <span className="block font-medium group-hover:underline">What is the Fertile Window?</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="heading-3 border-b border-gray-200 dark:border-gray-800 pb-2">Conditions & Health</h2>
          <p className="text-sm text-[var(--muted)] italic">Detailed condition deep-dives coming this week.</p>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="heading-3 border-b border-gray-200 dark:border-gray-800 pb-2">Privacy & Security</h2>
          <p className="text-sm text-[var(--muted)] italic">Digital privacy and local storage guides coming this week.</p>
        </section>
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
