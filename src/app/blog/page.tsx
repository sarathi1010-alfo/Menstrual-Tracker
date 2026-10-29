import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import Link from 'next/link';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Educational resources on menstrual health, fertility, cycle tracking, and digital privacy.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-8">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto leading-relaxed">
          Welcome to the LunaCycle Blog. Discover expert insights and educational guides to help you understand your menstrual cycle, optimize your fertility tracking, and protect your digital privacy. We cover everything from cycle fundamentals and ovulation science to data sovereignty and menstrual health conditions—empowering you with the knowledge you need.
        </p>
      </section>

      {/* Week 1 Pillar */}
      <section className="bg-[var(--surface)] border border-[var(--primary)]/20 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10 space-y-4">
          <span className="text-[var(--primary)] text-sm font-bold uppercase tracking-wider">Featured Pillar</span>
          <h2 className="text-3xl font-extrabold text-[var(--foreground)]">
            <Link href="/blog/ultimate-guide-menstrual-cycle-tracking" className="hover:text-[var(--primary)] transition-colors">
              The Ultimate Guide to Menstrual Cycle Tracking in 2026
            </Link>
          </h2>
          <p className="text-[var(--muted)]">
            Everything you need to know about understanding your body&apos;s natural rhythm, leveraging local storage for privacy, and mastering cycle tracking this year.
          </p>
          <Link href="/blog/ultimate-guide-menstrual-cycle-tracking" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline">
            Read the Ultimate Guide <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="grid md:grid-cols-2 gap-8">

        {/* Cycle Fundamentals */}
        <div className="card p-6 space-y-4">
          <h3 className="heading-3 border-b border-gray-200 dark:border-gray-800 pb-2">Cycle Fundamentals</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/what-is-a-menstrual-cycle" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">
                What is a Menstrual Cycle?
              </Link>
            </li>
            <li>
              <Link href="/what-is-ovulation" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">
                What is Ovulation?
              </Link>
            </li>
            <li>
              <Link href="/what-is-the-fertile-window" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">
                What is the Fertile Window?
              </Link>
            </li>
            <li>
              <Link href="/what-is-the-luteal-phase" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">
                What is the Luteal Phase?
              </Link>
            </li>
            <li>
              <Link href="/what-is-the-follicular-phase" className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors">
                What is the Follicular Phase?
              </Link>
            </li>
          </ul>
        </div>

        {/* Fertility & Family Planning (Placeholders for Week 2+) */}
        <div className="card p-6 space-y-4 opacity-80">
          <h3 className="heading-3 border-b border-gray-200 dark:border-gray-800 pb-2">Fertility & Family Planning</h3>
          <p className="text-sm text-[var(--muted)] italic">Coming Soon...</p>
          <ul className="space-y-3 pointer-events-none">
            <li className="text-[var(--muted)]">Basal Body Temperature Tracking</li>
            <li className="text-[var(--muted)]">Understanding Cervical Mucus</li>
            <li className="text-[var(--muted)]">Ovulation Predictor Kits (OPKs)</li>
          </ul>
        </div>

        {/* Privacy & Security */}
        <div className="card p-6 space-y-4 opacity-80">
          <h3 className="heading-3 border-b border-gray-200 dark:border-gray-800 pb-2">Privacy & Security</h3>
          <p className="text-sm text-[var(--muted)] italic">Coming Soon...</p>
          <ul className="space-y-3 pointer-events-none">
            <li className="text-[var(--muted)]">Local Storage vs Cloud Apps</li>
            <li className="text-[var(--muted)]">Data Sovereignty in Health Tech</li>
          </ul>
        </div>

        {/* Conditions & Health */}
        <div className="card p-6 space-y-4 opacity-80">
          <h3 className="heading-3 border-b border-gray-200 dark:border-gray-800 pb-2">Conditions & Health</h3>
          <p className="text-sm text-[var(--muted)] italic">Coming Soon...</p>
          <ul className="space-y-3 pointer-events-none">
            <li className="text-[var(--muted)]">Tracking with PCOS</li>
            <li className="text-[var(--muted)]">Understanding Endometriosis</li>
          </ul>
        </div>
      </section>

      {/* Internal Navigation & Disclaimer */}
      <section className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">LunaCycle Home</Link>
          <Link href="/about" className="hover:text-[var(--primary)] transition-colors">About Us</Link>
          <Link href="/faq" className="hover:text-[var(--primary)] transition-colors">FAQ</Link>
        </div>

        <MedicalDisclaimer />
      </section>
    </div>
  );
}
