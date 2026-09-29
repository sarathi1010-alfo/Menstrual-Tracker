import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Shield, CalendarDays, Activity, ServerOff, Database } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Cycle Tracking',
  description: 'Explore the features of LunaCycle. A completely private, no-account period tracker that saves all your data locally.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <header className="text-center space-y-4">
        <h1 className="heading-1 mb-4">LunaCycle Features – Privacy-First Cycle Tracking</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Powerful cycle tracking tools built with a strict privacy-first architecture. No accounts, no clouds, no tracking.
        </p>
      </header>

      <MedicalDisclaimer />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <CalendarDays size={24} />
          </div>
          <h2 className="heading-3">Visual Calendar</h2>
          <p className="text-[var(--muted)]">
            Easily spot patterns with an intuitive color-coded calendar. Instantly see your logged periods, predicted fertile window, and expected next period.
          </p>
        </div>

        <div className="card p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
            <Activity size={24} />
          </div>
          <h2 className="heading-3">Smart Predictions</h2>
          <p className="text-[var(--muted)]">
            Our on-device algorithm learns your unique rhythm. The more you track, the more accurate your next-period and fertile window estimates become.
          </p>
        </div>

        <div className="card p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] flex items-center justify-center">
            <Shield size={24} />
          </div>
          <h2 className="heading-3">Privacy First</h2>
          <p className="text-[var(--muted)]">
            We built LunaCycle specifically to protect your sensitive health data. There are no tracking pixels or third-party analytics scripts reading your cycle dates.
          </p>
        </div>

        <div className="card p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center">
            <ServerOff size={24} />
          </div>
          <h2 className="heading-3">No Accounts</h2>
          <p className="text-[var(--muted)]">
            Start tracking immediately. There is no signup form, no email verification, and no password to remember. The tool works instantly in your browser.
          </p>
        </div>

        <div className="card p-6 space-y-4 md:col-span-2">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <Database size={24} />
          </div>
          <h2 className="heading-3">Local Storage Only</h2>
          <p className="text-[var(--muted)]">
            Your data is stored exclusively in your device&apos;s browser using LocalStorage. It is never sent to our servers, meaning it cannot be hacked, leaked, or sold to third parties.
          </p>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gray-200 dark:border-gray-800">
        <Link href="/tracker" className="button-primary">
          Start Tracking Now
        </Link>
        <Link href="/faq" className="px-6 py-3 rounded-2xl font-medium text-[var(--foreground)] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          Read the FAQ
        </Link>
        <Link href="/about" className="px-6 py-3 rounded-2xl font-medium text-[var(--foreground)] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          About LunaCycle
        </Link>
      </div>
    </div>
  );
}
