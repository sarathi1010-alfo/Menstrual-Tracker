import Link from 'next/link';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Explore our guides on menstrual health, cycle tracking, and digital privacy.',
  path: '/blog',
});

export default function BlogLandingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center space-y-4 pt-8">
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Welcome to the LunaCycle educational hub. Whether you are new to cycle tracking, trying to understand your fertility, or looking for ways to protect your digital privacy, we have resources designed for you. Discover expert insights to better understand your body&apos;s natural rhythms.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="heading-2 border-b border-gray-200 dark:border-gray-800 pb-2">Categories</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="heading-3 mb-2 text-[var(--primary)]">Cycle Fundamentals</h3>
            <ul className="space-y-2 text-[var(--muted)]">
              <li><Link href="/blog/the-ultimate-guide-to-menstrual-cycle-tracking-in-2026" className="hover:text-[var(--primary)] transition-colors">The Ultimate Guide to Menstrual Cycle Tracking in 2026</Link></li>
              <li><Link href="/blog/what-is-a-menstrual-cycle" className="hover:text-[var(--primary)] transition-colors">What is a Menstrual Cycle?</Link></li>
              <li><Link href="/blog/what-is-ovulation" className="hover:text-[var(--primary)] transition-colors">What is Ovulation?</Link></li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="heading-3 mb-2 text-[var(--primary)]">Fertility & Family Planning</h3>
            <ul className="space-y-2 text-[var(--muted)]">
              <li><Link href="/blog/what-is-the-fertile-window" className="hover:text-[var(--primary)] transition-colors">What is the Fertile Window?</Link></li>
              <li><Link href="/blog/what-is-the-luteal-phase" className="hover:text-[var(--primary)] transition-colors">What is the Luteal Phase?</Link></li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="heading-3 mb-2 text-[var(--primary)]">Privacy & Security</h3>
            <ul className="space-y-2 text-[var(--muted)]">
              <li><Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="heading-3 mb-2 text-[var(--primary)]">Help & Support</h3>
            <ul className="space-y-2 text-[var(--muted)]">
               <li><Link href="/faq" className="hover:text-[var(--primary)] transition-colors">FAQ</Link></li>
               <li><Link href="/about" className="hover:text-[var(--primary)] transition-colors">About LunaCycle</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <MedicalDisclaimer />
    </div>
  );
}
