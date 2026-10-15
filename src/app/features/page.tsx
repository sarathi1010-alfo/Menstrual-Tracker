import { Metadata } from 'next';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { constructMetadata } from '@/lib/seo';
import { Shield, Activity, CalendarDays, Database, UserX } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Cycle Tracking',
  description: 'Discover LunaCycle\'s features including visual calendar, smart predictions, local storage only, and no account requirements.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <MedicalDisclaimer />

      <section className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
          <Shield size={14} />
          <span>Core Capabilities</span>
        </div>
        <h1 className="heading-1">LunaCycle Features &ndash; Privacy-First Cycle Tracking</h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle is built differently. We believe your health data belongs to you, not on a server. Explore the core features that make our tracker simple, powerful, and completely private.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 pt-8">
        <div className="card p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-2">
            <CalendarDays size={32} />
          </div>
          <h2 className="heading-3">Visual Calendar</h2>
          <p className="text-[var(--muted)]">
            Spot patterns easily with an intuitive color-coded calendar that highlights your period, fertile window, and upcoming cycle events at a single glance.
          </p>
        </div>

        <div className="card p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)] flex items-center justify-center mb-2">
            <Activity size={32} />
          </div>
          <h2 className="heading-3">Smart Predictions</h2>
          <p className="text-[var(--muted)]">
            Our algorithm learns your unique rhythm over time. By analyzing your past logged periods, it provides increasingly accurate next-period estimates.
          </p>
        </div>

        <div className="card p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-2">
            <Shield size={32} />
          </div>
          <h2 className="heading-3">Privacy First</h2>
          <p className="text-[var(--muted)]">
            Your data never leaves your device. We use a strict client-side only architecture to ensure your personal health information remains yours alone.
          </p>
        </div>

        <div className="card p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-2">
            <UserX size={32} />
          </div>
          <h2 className="heading-3">No Accounts</h2>
          <p className="text-[var(--muted)]">
            Skip the sign-up form. There are no accounts to create, no passwords to remember, and no email lists to join. Just start tracking immediately.
          </p>
        </div>

        <div className="card p-8 flex flex-col items-center text-center space-y-4 md:col-span-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
            <Database size={32} />
          </div>
          <h2 className="heading-3">Local Storage Only</h2>
          <p className="text-[var(--muted)] max-w-2xl">
            All data you input is saved directly to your web browser&apos;s standard <code>localStorage</code> API. We do not operate a backend database for user data, meaning we physically cannot access, share, or sell your health information.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link href="/" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Start Tracking</Link>
        <Link href="/about" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">About Us</Link>
        <Link href="/faq" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">FAQ</Link>
      </div>
    </div>
  );
}
