import { Metadata } from 'next';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Explore the LunaCycle blog for comprehensive guides on menstrual cycle tracking, ovulation, fertility, data privacy, and conditions like PCOS and Endometriosis.',
  path: '/blog',
});

export default function BlogLandingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-3xl">
          Welcome to the LunaCycle Blog. Our mission is to provide you with clear, medically accurate, and deeply insightful guides about menstrual health. Whether you are learning the fundamentals of your cycle phases, exploring natural family planning, or seeking to understand the importance of data privacy in health tracking, our resources are here to support your journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-6 flex flex-col h-full">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Cycle Fundamentals</h2>
          <ul className="space-y-3 flex-grow">
            <li>
              <Link href="/blog/ultimate-guide-to-menstrual-cycle-tracking" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                The Ultimate Guide to Menstrual Cycle Tracking in 2026
              </Link>
            </li>
            <li>
              <Link href="/what-is-a-menstrual-cycle" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is a Menstrual Cycle?
              </Link>
            </li>
             <li>
              <Link href="/what-is-ovulation" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is Ovulation?
              </Link>
            </li>
            <li>
              <Link href="/what-is-the-fertile-window" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is the Fertile Window?
              </Link>
            </li>
            <li>
              <Link href="/what-is-the-luteal-phase" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is the Luteal Phase?
              </Link>
            </li>
            <li>
              <Link href="/what-is-the-follicular-phase" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                What is the Follicular Phase?
              </Link>
            </li>
          </ul>
        </div>

        <div className="card p-6 flex flex-col h-full opacity-60">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Comparisons & Use Cases (Coming Soon)</h2>
          <ul className="space-y-3 flex-grow text-[var(--muted)]">
            <li>LunaCycle vs Flo: Which is Better?</li>
            <li>LunaCycle vs Clue: A Privacy Comparison</li>
            <li>Cycle Tracking for Teens</li>
            <li>Cycle Tracking for TTC</li>
          </ul>
        </div>

        <div className="card p-6 flex flex-col h-full opacity-60">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Fertility & Family Planning (Coming Soon)</h2>
          <ul className="space-y-3 flex-grow text-[var(--muted)]">
            <li>Cycle Tracking for Avoiding Pregnancy</li>
            <li>Cycle Tracking for Perimenopause</li>
            <li>PCOS Deep-Dive</li>
          </ul>
        </div>

        <div className="card p-6 flex flex-col h-full opacity-60">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Privacy & Security (Coming Soon)</h2>
          <ul className="space-y-3 flex-grow text-[var(--muted)]">
            <li>Why privacy matters in period tracking</li>
            <li>How local storage works</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Link href="/" className="text-sm font-medium hover:text-[var(--primary)] transition-colors underline underline-offset-4">LunaCycle Tool</Link>
        <Link href="/about" className="text-sm font-medium hover:text-[var(--primary)] transition-colors underline underline-offset-4">About</Link>
        <Link href="/faq" className="text-sm font-medium hover:text-[var(--primary)] transition-colors underline underline-offset-4">FAQ</Link>
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
