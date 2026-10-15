import { Metadata } from 'next';
import { Shield, Smartphone, Zap } from 'lucide-react';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Features - LunaCycle Period Tracker',
  description: 'Explore the privacy-first features of LunaCycle. No accounts, offline tracking, and 100% local storage.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-12">
      <header className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
          Your Data, <span className="text-[var(--primary)]">Your Device</span>.
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          LunaCycle is built from the ground up for absolute privacy. We believe your health data belongs to you, which is why everything happens directly on your device.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="card p-8 text-center space-y-4 border border-transparent hover:border-[var(--primary)]/30 transition-all">
          <div className="mx-auto w-16 h-16 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-4">
            <Shield size={32} />
          </div>
          <h3 className="text-xl font-bold">100% Private</h3>
          <p className="text-[var(--muted)]">
            No accounts required. No cloud sync. Your data is stored securely in your browser&apos;s local storage and never touches a server.
          </p>
        </div>

        <div className="card p-8 text-center space-y-4 border border-transparent hover:border-[var(--primary)]/30 transition-all">
          <div className="mx-auto w-16 h-16 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-4">
            <Smartphone size={32} />
          </div>
          <h3 className="text-xl font-bold">Works Offline</h3>
          <p className="text-[var(--muted)]">
            LunaCycle is an installable Progressive Web App (PWA) that works perfectly without an internet connection.
          </p>
        </div>

        <div className="card p-8 text-center space-y-4 border border-transparent hover:border-[var(--primary)]/30 transition-all">
          <div className="mx-auto w-16 h-16 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-4">
            <Zap size={32} />
          </div>
          <h3 className="text-xl font-bold">Instant Predictions</h3>
          <p className="text-[var(--muted)]">
            Local algorithms analyze your logged data to instantly predict your next period and fertile window with zero latency.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/tracker" className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-bold rounded-xl hover:bg-[var(--primary)]/90 transition-colors shadow-lg hover:shadow-xl">
          Start Tracking Now
        </Link>
      </div>
    </div>
  );
}
