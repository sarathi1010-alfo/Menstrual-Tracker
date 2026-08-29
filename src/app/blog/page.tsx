import { Metadata } from 'next';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides & Menstrual Health',
  description: 'Explore LunaCycle\'s blog for comprehensive guides on menstrual cycle tracking, fertility, privacy tips, and women\'s health education.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <MedicalDisclaimer />

      <section className="text-center space-y-6 pt-4">
        <h1 className="heading-1">LunaCycle Blog &ndash; Cycle Tracking Guides, Menstrual Health &amp; Privacy Tips</h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Welcome to the LunaCycle educational hub. Whether you are trying to understand the basics of your menstrual cycle, looking for advanced tracking techniques, or seeking to protect your digital health privacy, we have you covered. Explore our comprehensive guides, created to empower you with knowledge.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h2 className="heading-3 mb-4">Cycle Fundamentals</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/blog/ultimate-guide-menstrual-cycle-tracking" className="text-[var(--primary)] hover:underline font-medium">
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
        </div>

        <div className="card p-6">
          <h2 className="heading-3 mb-4">Fertility &amp; Family Planning</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Guides on natural family planning and fertility tracking coming soon.</p>
        </div>

        <div className="card p-6">
          <h2 className="heading-3 mb-4">Privacy &amp; Security</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Learn why local storage and privacy matter for your health data.</p>
        </div>

        <div className="card p-6">
          <h2 className="heading-3 mb-4">Conditions &amp; Health</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Deep dives into conditions like PCOS and Endometriosis.</p>
        </div>

        <div className="card p-6 md:col-span-2">
          <h2 className="heading-3 mb-4">Wellness &amp; Lifestyle</h2>
          <p className="text-sm text-[var(--muted)] mb-4">How cycle tracking fits into your daily routine and wellness goals.</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link href="/" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Tracker</Link>
        <Link href="/about" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">About</Link>
        <Link href="/faq" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">FAQ</Link>
      </div>
    </div>
  );
}
