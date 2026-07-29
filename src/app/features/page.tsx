import { Metadata } from 'next';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Shield, CalendarDays, Activity, Database } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Cycle Tracking',
  description: 'Explore the features of LunaCycle: visual calendar, smart predictions, privacy-first architecture, no accounts, and 100% local storage.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-6">
        <h1 className="heading-1">LunaCycle Features – Privacy-First Cycle Tracking</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Built for privacy. Designed for clarity. Discover how LunaCycle helps you understand your body without compromising your data.
        </p>
      </header>

      <MedicalDisclaimer />

      <div className="grid md:grid-cols-2 gap-8 pt-8">
        <div className="card p-6 flex flex-col items-start gap-4 hover:border-[var(--primary)]/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
            <CalendarDays size={24} />
          </div>
          <div>
             <h2 className="heading-3 mb-2">Visual Calendar</h2>
             <p className="text-[var(--muted)]">Our intuitive interface allows you to view your cycle history clearly. Spot patterns and plan ahead with our color-coded monthly overview.</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col items-start gap-4 hover:border-[var(--primary)]/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)] flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
             <h2 className="heading-3 mb-2">Smart Predictions</h2>
             <p className="text-[var(--muted)]">Log your dates and let our local algorithms calculate your next period and estimated fertile window based on your personal averages.</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col items-start gap-4 hover:border-[var(--primary)]/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-gray-200 dark:bg-gray-700 text-[var(--foreground)] flex items-center justify-center">
            <Shield size={24} />
          </div>
          <div>
             <h2 className="heading-3 mb-2">Privacy First (No Accounts)</h2>
             <p className="text-[var(--muted)]">We believe your health data is yours alone. There are no logins, no passwords, and absolutely no external cloud synchronization.</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col items-start gap-4 hover:border-[var(--primary)]/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <Database size={24} />
          </div>
          <div>
             <h2 className="heading-3 mb-2">Local Storage Only</h2>
             <p className="text-[var(--muted)]">All data is stored directly in your browser&apos;s local storage. This client-side architecture guarantees your information never leaves your device.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center pt-8 border-t border-gray-200 dark:border-gray-800">
         <Link href="/" className="text-sm font-medium text-[var(--primary)] hover:underline">Tracker Tool</Link>
         <Link href="/about" className="text-sm font-medium text-[var(--primary)] hover:underline">About LunaCycle</Link>
         <Link href="/faq" className="text-sm font-medium text-[var(--primary)] hover:underline">FAQ</Link>
      </div>
    </div>
  );
}
