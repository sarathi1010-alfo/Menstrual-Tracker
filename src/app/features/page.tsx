import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Lock, UserX, Database, Zap, Heart, Bell } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Period Tracking & Cycle AI',
  description: 'Discover the features that make LunaCycle the most private period tracker. 100% local storage, no accounts, and offline-first cycle predictions.',
  path: '/features',
});

const features = [
  {
    title: '100% Local Storage',
    description: 'Your cycle data never leaves your device. We use browser local storage to keep your health information strictly private.',
    icon: <Database size={24} className="text-purple-500" />,
  },
  {
    title: 'No Accounts Required',
    description: 'No email, no password, no social login. Start tracking instantly without giving away your identity.',
    icon: <UserX size={24} className="text-blue-500" />,
  },
  {
    title: 'Works Offline',
    description: 'Access your tracker and predictions anywhere, even without an internet connection. Perfect for privacy and reliability.',
    icon: <Zap size={24} className="text-amber-500" />,
  },
  {
    title: 'Advanced Predictions',
    description: 'Our rule-based engine calculates your fertile window and next period using your historical data patterns.',
    icon: <Heart size={24} className="text-rose-500" />,
  },
  {
    title: 'Private Notifications',
    description: 'Get discreet reminders about your upcoming cycle without exposing your data to third-party push servers.',
    icon: <Bell size={24} className="text-orange-500" />,
  },
  {
    title: 'Secure Export',
    description: 'Download your entire history as a JSON file for your own records or to share with a doctor.',
    icon: <Lock size={24} className="text-emerald-500" />,
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
          Built for Privacy, <br />
          <span className="text-[var(--primary)]">Designed for You.</span>
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle combines advanced cycle intelligence with a zero-compromise approach to your digital sovereignty.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="card p-8 flex gap-6 items-start hover:border-[var(--primary)]/30 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
              {feature.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="card p-12 bg-[var(--primary)] text-white text-center space-y-8 overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">Ready to take back your data?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Experience the peace of mind that comes with a truly private health tool. No tracking, no ads, just you and your rhythm.
          </p>
          <div className="pt-4">
            <Link href="/tracker" className="inline-block px-8 py-4 bg-white text-[var(--primary)] font-bold rounded-2xl hover:bg-gray-100 transition-colors shadow-lg text-lg">
              Open LunaCycle Tracker
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}
