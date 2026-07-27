import Link from 'next/link';
import { Metadata } from 'next';
import { PredictionCard } from '@/components/PredictionCard';
import { CycleCalendar } from '@/components/CycleCalendar';
import { ArrowRight, Shield, Activity, CalendarDays } from 'lucide-react';
import { RelatedToolsWidget } from '@/components/RelatedToolsWidget';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  path: '/',
});

export default function Home() {
  return (
    <div className="space-y-16 pb-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 md:py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--secondary)]/20 text-[var(--secondary)] text-sm font-medium mb-4">
          <Shield size={14} />
          <span>100% Private & Local</span>
        </div>
        <h1 className="heading-1 max-w-2xl mx-auto">
          Track your cycle visually, predict key dates instantly.
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          No accounts. No cloud storage. A beautifully simple utility designed to give you clarity over your cycle, stored securely on your own device.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tracker" className="button-primary flex items-center gap-2 w-full sm:w-auto justify-center">
            Start Tracking <ArrowRight size={18} />
          </Link>
          <Link href="/about" className="px-6 py-3 rounded-2xl font-medium text-[var(--foreground)] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto text-center">
            Learn More
          </Link>
        </div>
      </section>

      {/* Quick Dashboard Preview */}
      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <PredictionCard />
          <div className="card p-6">
             <h3 className="heading-3 mb-2 flex items-center gap-2">
               <Activity className="text-[var(--primary)]" size={20} />
               Instant Insights
             </h3>
             <p className="text-[var(--muted)] text-sm">
               Log your dates and immediately see your estimated fertile window, next period prediction, and average cycle length. Everything calculates entirely in your browser.
             </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="transform scale-90 md:scale-100 origin-top w-full">
            <CycleCalendar />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid sm:grid-cols-3 gap-6 pt-12 border-t border-gray-200 dark:border-gray-800">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <Shield size={20} />
          </div>
          <h4 className="font-semibold text-lg">Privacy First</h4>
          <p className="text-sm text-[var(--muted)]">Your data never leaves your device. We use local storage so your health information remains yours alone.</p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
            <CalendarDays size={20} />
          </div>
          <h4 className="font-semibold text-lg">Visual Calendar</h4>
          <p className="text-sm text-[var(--muted)]">Spot patterns easily with an intuitive color-coded calendar that highlights your period and fertile window.</p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] flex items-center justify-center">
            <Activity size={20} />
          </div>
          <h4 className="font-semibold text-lg">Smart Predictions</h4>
          <p className="text-sm text-[var(--muted)]">Our algorithm learns your unique rhythm over time to give you more accurate next-period estimates.</p>
        </div>
      </section>

      {/* Quick Access to Cycle Tools */}
      <section className="pt-12 border-t border-gray-200 dark:border-gray-800">
        <h2 className="heading-3 mb-6 text-center">Free Cycle Tracking Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/tools/next-period-predictor" className="card p-6 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Next Period Predictor</h3>
            <p className="text-sm text-[var(--muted)]">Predict exactly when your next period will arrive based on your cycle history.</p>
          </Link>
          <Link href="/tools/safe-days-calculator" className="card p-6 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Safe Days Calculator</h3>
            <p className="text-sm text-[var(--muted)]">Calculate your safe days and fertile window with privacy-first tracking.</p>
          </Link>
          <Link href="/tools/ovulation-calculator" className="card p-6 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Ovulation Calculator</h3>
            <p className="text-sm text-[var(--muted)]">Find your most fertile days instantly with our free ovulation calculator.</p>
          </Link>
        </div>
      </section>

      <section className="pt-8">
        <MedicalDisclaimer />
      </section>

      {/* Internal Traffic Engine - Related Tools Widget */}
      <RelatedToolsWidget />
    </div>
  );
}
