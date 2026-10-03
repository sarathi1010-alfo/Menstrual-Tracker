import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Read our expert guides on cycle tracking, fertility, menstrual health conditions, and digital privacy.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="heading-1 mb-4">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
          Welcome to the LunaCycle Blog. Discover evidence-based guides to understanding your menstrual cycle, optimizing your fertility, managing health conditions, and protecting your digital privacy. Our educational resources are designed to empower you with knowledge while ensuring your data remains entirely in your control.
        </p>
      </div>

      <MedicalDisclaimer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="card p-6 border-[var(--border)]">
          <h2 className="heading-3 mb-4 text-[var(--foreground)] border-b pb-2">Cycle Fundamentals</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/blog/ultimate-guide-menstrual-cycle-tracking-2026" className="text-[var(--primary)] hover:underline font-medium">
                The Ultimate Guide to Menstrual Cycle Tracking in 2026
              </Link>
            </li>
            <li>
              <Link href="/what-is-menstrual-cycle" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is a Menstrual Cycle?
              </Link>
            </li>
             <li>
              <Link href="/what-is-ovulation" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is Ovulation?
              </Link>
            </li>
             <li>
              <Link href="/what-is-fertile-window" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is the Fertile Window?
              </Link>
            </li>
             <li>
              <Link href="/what-is-luteal-phase" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is the Luteal Phase?
              </Link>
            </li>
             <li>
              <Link href="/what-is-follicular-phase" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is the Follicular Phase?
              </Link>
            </li>
          </ul>
        </section>

        <section className="card p-6 border-[var(--border)]">
          <h2 className="heading-3 mb-4 text-[var(--foreground)] border-b pb-2">Fertility & Family Planning</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/use-cases/cycle-tracking-for-ttc" className="text-[var(--primary)] hover:underline font-medium">
                Cycle Tracking for TTC (Trying to Conceive)
              </Link>
            </li>
             <li>
              <Link href="/use-cases/cycle-tracking-avoiding-pregnancy" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                 Cycle Tracking for Avoiding Pregnancy
              </Link>
            </li>
            <li>
              <Link href="/use-cases/cycle-tracking-perimenopause" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                Cycle Tracking for Perimenopause
              </Link>
            </li>
          </ul>
        </section>

        <section className="card p-6 border-[var(--border)]">
          <h2 className="heading-3 mb-4 text-[var(--foreground)] border-b pb-2">Conditions & Health</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/conditions/pcos-deep-dive" className="text-[var(--primary)] hover:underline font-medium">
                The Complete Guide to PCOS and Cycle Tracking
              </Link>
            </li>
            <li>
              <Link href="/conditions/endometriosis-deep-dive" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                The Complete Guide to Endometriosis and Cycle Tracking
              </Link>
            </li>
            <li>
              <Link href="/conditions/irregular-cycles-deep-dive" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                 The Complete Guide to Irregular Cycles and Cycle Tracking
              </Link>
            </li>
            <li>
              <Link href="/conditions/pms-pmdd-deep-dive" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                 The Complete Guide to PMS/PMDD and Cycle Tracking
              </Link>
            </li>
          </ul>
        </section>

        <section className="card p-6 border-[var(--border)]">
          <h2 className="heading-3 mb-4 text-[var(--foreground)] border-b pb-2">Privacy & Security</h2>
          <ul className="space-y-3">
             <li>
              <Link href="/blog/why-privacy-matters-period-tracking" className="text-[var(--primary)] hover:underline font-medium">
                Why Privacy Matters in Period Tracking
              </Link>
            </li>
             <li>
              <Link href="/blog/how-local-storage-works" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                How Local Storage Works for Your Data
              </Link>
            </li>
          </ul>
        </section>

        <section className="card p-6 border-[var(--border)]">
          <h2 className="heading-3 mb-4 text-[var(--foreground)] border-b pb-2">Comparisons</h2>
          <ul className="space-y-3">
             <li>
              <Link href="/blog/lunacycle-vs-flo" className="text-[var(--primary)] hover:underline font-medium">
                LunaCycle vs Flo: Which is Better?
              </Link>
            </li>
             <li>
              <Link href="/blog/lunacycle-vs-clue" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                LunaCycle vs Clue: Which is Better?
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-8 text-center text-[var(--muted)]">
        <p>Explore more sections: <Link href="/" className="hover:text-[var(--primary)]">Home</Link> | <Link href="/about" className="hover:text-[var(--primary)]">About</Link> | <Link href="/faq" className="hover:text-[var(--primary)]">FAQ</Link></p>
      </div>
    </div>
  );
}
