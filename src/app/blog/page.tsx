import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Explore the LunaCycle blog for educational guides on cycle tracking, menstrual health, privacy-first technology, and wellness.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
          Welcome to the LunaCycle blog. Here, we believe in empowering you with medically accurate, easy-to-understand information about your menstrual cycle. Whether you are a beginner looking to understand cycle phases, trying to conceive, tracking for athletic performance, or simply wanting to learn more about your body while protecting your digital privacy, our comprehensive guides have you covered.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="grid gap-8">
        <section className="space-y-4">
          <h2 className="heading-2">Cycle Fundamentals</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/ultimate-guide-to-menstrual-cycle-tracking-in-2026" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
              <h3 className="heading-3 mb-2">The Ultimate Guide to Menstrual Cycle Tracking in 2026</h3>
              <p className="text-[var(--muted)] text-sm">Everything you need to know to start tracking your cycle.</p>
            </Link>
            <Link href="/what-is-a-menstrual-cycle" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
              <h3 className="heading-3 mb-2">What is a Menstrual Cycle?</h3>
              <p className="text-[var(--muted)] text-sm">A quick overview of the menstrual cycle.</p>
            </Link>
            <Link href="/what-is-ovulation" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
              <h3 className="heading-3 mb-2">What is Ovulation?</h3>
              <p className="text-[var(--muted)] text-sm">Understand when and how ovulation happens.</p>
            </Link>
            <Link href="/what-is-the-fertile-window" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
              <h3 className="heading-3 mb-2">What is the Fertile Window?</h3>
              <p className="text-[var(--muted)] text-sm">Learn how to identify your most fertile days.</p>
            </Link>
            <Link href="/what-is-the-luteal-phase" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
              <h3 className="heading-3 mb-2">What is the Luteal Phase?</h3>
              <p className="text-[var(--muted)] text-sm">Discover what happens after ovulation.</p>
            </Link>
            <Link href="/what-is-the-follicular-phase" className="card p-6 hover:border-[var(--primary)]/50 transition-colors">
              <h3 className="heading-3 mb-2">What is the Follicular Phase?</h3>
              <p className="text-[var(--muted)] text-sm">Explore the first half of your menstrual cycle.</p>
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="heading-2">Fertility & Family Planning</h2>
          <p className="text-[var(--muted)]">Guides on trying to conceive, avoiding pregnancy naturally, and understanding fertility.</p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-2">Conditions & Health</h2>
          <p className="text-[var(--muted)]">Deep dives into PCOS, endometriosis, irregular cycles, and more.</p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-2">Wellness & Lifestyle</h2>
          <p className="text-[var(--muted)]">Cycle syncing, nutrition, and mental health.</p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-2">Privacy & Security</h2>
          <p className="text-[var(--muted)]">Why local storage matters and how to protect your health data.</p>
        </section>
      </div>

      <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 justify-center">
        <Link href="/" className="text-[var(--primary)] hover:underline font-medium">LunaCycle Tracker</Link>
        <span className="text-[var(--muted)]">•</span>
        <Link href="/about" className="text-[var(--primary)] hover:underline font-medium">About</Link>
        <span className="text-[var(--muted)]">•</span>
        <Link href="/faq" className="text-[var(--primary)] hover:underline font-medium">FAQ</Link>
      </div>
    </div>
  );
}
