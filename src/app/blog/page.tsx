import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, Shield, HeartPulse, Sparkles, Activity } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Evidence-based guides on menstrual cycle tracking, reproductive health, cycle syncing, and digital privacy. Learn how to take control of your cycle naturally.',
  path: '/blog',
});

export default function BlogIndexPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Explore our comprehensive library on cycle mechanics, health indicators, fertility tracking, and how to protect your digital health privacy. Whether you're a beginner learning the basics of menstrual tracking, someone managing a condition like PCOS or endometriosis, or a user deeply concerned about data sovereignty and digital health privacy, our expert-curated content provides the clarity you need. We believe that understanding your body should not require compromising your personal information. Dive into our daily educational guides, read side-by-side comparisons of popular period trackers, and discover actionable tips for cycle syncing and wellness—all backed by our commitment to 100% local storage. Your body, your data, your rules.
        </p>
      </header>

      {/* Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6 h-full hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
          <div className="flex gap-3 items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <h2 className="heading-3 m-0">Cycle Fundamentals</h2>
          </div>
          <p className="text-[var(--muted)] text-sm mb-4">
            Learn the basics of menstrual tracking, understanding the four cycle phases, and interpreting your body's signals.
          </p>
          <ul className="space-y-2 mb-4">
            <li>
              <Link href="/blog/ultimate-guide-menstrual-cycle-tracking-2026" className="text-sm font-medium hover:text-[var(--primary)] transition-colors line-clamp-1">
                The Ultimate Guide to Menstrual Cycle Tracking in 2026
              </Link>
            </li>
            <li>
              <Link href="/what-is-menstrual-cycle" className="text-sm font-medium hover:text-[var(--primary)] transition-colors line-clamp-1">
                What is a Menstrual Cycle?
              </Link>
            </li>
            <li>
              <Link href="/what-is-ovulation" className="text-sm font-medium hover:text-[var(--primary)] transition-colors line-clamp-1">
                What is Ovulation?
              </Link>
            </li>
            <li>
              <Link href="/what-is-fertile-window" className="text-sm font-medium hover:text-[var(--primary)] transition-colors line-clamp-1">
                What is the Fertile Window?
              </Link>
            </li>
            <li>
              <Link href="/what-is-luteal-phase" className="text-sm font-medium hover:text-[var(--primary)] transition-colors line-clamp-1">
                What is the Luteal Phase?
              </Link>
            </li>
             <li>
              <Link href="/what-is-follicular-phase" className="text-sm font-medium hover:text-[var(--primary)] transition-colors line-clamp-1">
                What is the Follicular Phase?
              </Link>
            </li>
          </ul>
        </div>

        <div className="card p-6 h-full hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
          <div className="flex gap-3 items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 flex items-center justify-center">
              <HeartPulse size={20} />
            </div>
            <h2 className="heading-3 m-0">Conditions & Health</h2>
          </div>
          <p className="text-[var(--muted)] text-sm mb-4">
            Deep-dives into specific health conditions that affect the menstrual cycle like PCOS, endometriosis, and more.
          </p>
          <p className="text-sm text-[var(--muted)] italic">More guides coming soon.</p>
        </div>

        <div className="card p-6 h-full hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
           <div className="flex gap-3 items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <h2 className="heading-3 m-0">Fertility & Family Planning</h2>
          </div>
          <p className="text-[var(--muted)] text-sm mb-4">
            Evidence-based approaches for trying to conceive (TTC) or managing perimenopause safely.
          </p>
          <p className="text-sm text-[var(--muted)] italic">More guides coming soon.</p>
        </div>

        <div className="card p-6 h-full hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
           <div className="flex gap-3 items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h2 className="heading-3 m-0">Privacy & Security</h2>
          </div>
          <p className="text-[var(--muted)] text-sm mb-4">
            Why digital health privacy matters, how local storage works, and how your data is protected.
          </p>
          <p className="text-sm text-[var(--muted)] italic">More guides coming soon.</p>
        </div>
      </div>

      <MedicalDisclaimer />

      {/* Quick Links */}
      <section className="pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-center gap-6 text-sm font-medium">
         <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home Tracker</Link>
         <Link href="/about" className="hover:text-[var(--primary)] transition-colors">About LunaCycle</Link>
         <Link href="/faq" className="hover:text-[var(--primary)] transition-colors">FAQ</Link>
         <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link>
      </section>
    </div>
  );
}
