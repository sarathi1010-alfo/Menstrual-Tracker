import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Shield, Activity, CalendarDays, Lock, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Cycle Tracking',
  description: 'Explore LunaCycle features: visual calendar, smart period predictions, and 100% local storage. Track your cycle securely without accounts or cloud databases.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-8">
      {/* Hero */}
      <section className="text-center space-y-6 pt-8">
        <h1 className="heading-1">LunaCycle Features – Privacy-First Cycle Tracking</h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto leading-relaxed">
          Discover a powerful suite of menstrual tracking tools designed completely around your privacy. No sign-ups, no data harvesting, just clear insights.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="space-y-12">
        {/* Visual Calendar */}
        <div className="flex flex-col md:flex-row items-center gap-8 card p-8">
          <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0">
            <CalendarDays size={32} />
          </div>
          <div>
            <h2 className="heading-2 mb-3">Intuitive Visual Calendar</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Log your period start and end dates with a single tap. The color-coded interface instantly highlights your estimated fertile window, upcoming periods, and cycle phases, allowing you to spot patterns at a glance.
            </p>
          </div>
        </div>

        {/* Smart Predictions */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 card p-8 border-[var(--primary)]/20">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center flex-shrink-0">
            <Activity size={32} />
          </div>
          <div>
            <h2 className="heading-2 mb-3">Smart Algorithmic Predictions</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              LunaCycle calculates your unique cycle averages dynamically. As you log more months, the algorithm refines its predictions for your next period and ovulation date, adapting to your specific biological rhythm.
            </p>
          </div>
        </div>

        {/* Privacy First */}
        <div className="flex flex-col md:flex-row items-center gap-8 card p-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Shield size={32} />
          </div>
          <div>
            <h2 className="heading-2 mb-3">Privacy First By Design</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Your health data is highly sensitive. That is why LunaCycle is built completely client-side. We do not use third-party analytics trackers, advertising SDKs, or external databases to monitor your usage.
            </p>
          </div>
        </div>

        {/* Local Storage Only */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 card p-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <Database size={32} />
          </div>
          <div>
            <h2 className="heading-2 mb-3">100% Local Storage Only</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Every date you log is saved directly to your device&apos;s browser memory. You have the power to export your data to a secure JSON file at any time, or permanently delete it by clearing your browser cache.
            </p>
          </div>
        </div>

        {/* No Accounts */}
        <div className="flex flex-col md:flex-row items-center gap-8 card p-8">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <Lock size={32} />
          </div>
          <div>
            <h2 className="heading-2 mb-3">No Accounts Required</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              Skip the onboarding friction and password management. LunaCycle works immediately upon opening the app. There are no paywalls, no login screens, and zero barriers to understanding your cycle.
            </p>
          </div>
        </div>
      </section>

      {/* CTA & Disclaimer */}
      <section className="text-center pt-8 border-t border-gray-200 dark:border-gray-800 space-y-8">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/tracker" className="button-primary flex items-center gap-2 justify-center">
            Try the Tracker <ArrowRight size={18} />
          </Link>
          <Link href="/" className="px-6 py-3 rounded-2xl font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Return Home
          </Link>
          <Link href="/faq" className="px-6 py-3 rounded-2xl font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Read the FAQ
          </Link>
        </div>
        <div className="text-left">
          <MedicalDisclaimer />
        </div>
      </section>
    </div>
  );
}
