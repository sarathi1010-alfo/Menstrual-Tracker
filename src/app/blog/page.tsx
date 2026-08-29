import { Metadata } from 'next';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides & Menstrual Health',
  description: 'Explore privacy-first guides on menstrual health, cycle tracking, and digital privacy from LunaCycle.',
  path: '/blog',
});

export default function BlogLandingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <section className="space-y-4">
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-lg text-[var(--muted)] max-w-3xl">
          Welcome to the LunaCycle Blog. Our mission is to empower you with accurate, privacy-first information about your menstrual health. Whether you are learning the fundamentals of your cycle, exploring natural family planning, or taking control of your digital privacy, our guides are designed to help you navigate your journey with confidence. No tracking pixels, no data selling—just pure, educational content.
        </p>
        <div className="flex gap-4 pt-2">
          <Link href="/" className="text-[var(--primary)] hover:underline text-sm font-medium">Home</Link>
          <Link href="/about" className="text-[var(--primary)] hover:underline text-sm font-medium">About</Link>
          <Link href="/faq" className="text-[var(--primary)] hover:underline text-sm font-medium">FAQ</Link>
        </div>
      </section>

      <MedicalDisclaimer />

      <section className="space-y-6">
        <h2 className="heading-2">Cycle Fundamentals</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/blog/the-ultimate-guide-to-menstrual-cycle-tracking-in-2026" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
            <h3 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">The Ultimate Guide to Menstrual Cycle Tracking in 2026</h3>
            <p className="text-sm text-[var(--muted)]">Everything you need to know to start tracking your cycle today.</p>
          </Link>
          <Link href="/what-is-a-menstrual-cycle" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
            <h3 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">What is a Menstrual Cycle?</h3>
            <p className="text-sm text-[var(--muted)]">A quick, jargon-free explanation of the menstrual cycle.</p>
          </Link>
          <Link href="/what-is-ovulation" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
            <h3 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">What is Ovulation?</h3>
            <p className="text-sm text-[var(--muted)]">Understand the key event of your cycle.</p>
          </Link>
          <Link href="/what-is-the-fertile-window" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
            <h3 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">What is the Fertile Window?</h3>
            <p className="text-sm text-[var(--muted)]">Learn how to identify your most fertile days.</p>
          </Link>
          <Link href="/what-is-the-luteal-phase" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
            <h3 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">What is the Luteal Phase?</h3>
            <p className="text-sm text-[var(--muted)]">Discover what happens in your body after ovulation.</p>
          </Link>
          <Link href="/what-is-the-follicular-phase" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
            <h3 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">What is the Follicular Phase?</h3>
            <p className="text-sm text-[var(--muted)]">Learn about the first half of your cycle leading up to ovulation.</p>
          </Link>
        </div>
      </section>

      <section className="space-y-6">
         <h2 className="heading-2">Coming Soon</h2>
         <div className="flex gap-2 flex-wrap">
           <span className="px-3 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-full text-sm font-medium">Fertility & Family Planning</span>
           <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm font-medium">Privacy & Security</span>
           <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium">Conditions & Health</span>
           <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">Wellness & Lifestyle</span>
         </div>
         <p className="text-[var(--muted)] text-sm">We are rapidly expanding our library. Check back often for deep-dives on Endometriosis, PCOS, Privacy best practices, and App comparisons.</p>
      </section>
    </div>
  );
}
