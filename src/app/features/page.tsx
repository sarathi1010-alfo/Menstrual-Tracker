import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Shield, Zap, Lock, Database, HardDrive, Smartphone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Menstrual Tracking',
  description: 'Explore the features of LunaCycle, the privacy-first menstrual tracker. Local storage, smart predictions, and zero data collection.',
  path: '/features',
});

const features = [
  {
    title: 'Local-Only Storage',
    description: 'Your cycle data never leaves your device. We use the browser\'s localStorage API to keep your information strictly private.',
    icon: HardDrive,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  },
  {
    title: 'Zero Accounts Required',
    description: 'Start tracking immediately. No email, no password, and no account setup needed to manage your health data.',
    icon: Lock,
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  },
  {
    title: 'Smart Cycle Predictions',
    description: 'Our rule-based algorithm analyzes your unique history to predict future periods and your fertile window with high accuracy.',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  },
  {
    title: 'Privacy-First Architecture',
    description: 'Built with a "privacy by design" philosophy. No servers, no databases, and no hidden tracking pixels.',
    icon: Shield,
    color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  },
  {
    title: 'Offline-Ready PWA',
    description: 'LunaCycle works completely offline. Track your cycle anywhere, even without an internet connection.',
    icon: Smartphone,
    color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
  },
  {
    title: 'Data Portability',
    description: 'You own your data. Export your cycle history to JSON or clear it all with a single click in your settings.',
    icon: Database,
    color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="heading-1">Designed for Privacy, Built for You</h1>
        <p className="text-xl text-[var(--muted)]">
          LunaCycle combines beautiful design with a robust, local-first architecture to give you the best tracking experience without compromising your data.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="card p-8 flex flex-col items-start gap-4 hover:border-[var(--primary)]/30 transition-all shadow-sm">
            <div className={`p-3 rounded-2xl ${feature.color}`}>
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-[var(--muted)] leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <section className="bg-[var(--primary)] text-white rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to start tracking?</h2>
          <p className="text-white/80 text-lg mb-8">
            Experience the peace of mind that comes with knowing your health data is stored safely and exclusively on your own device.
          </p>
          <Link href="/tracker" className="inline-block py-4 px-8 bg-white text-[var(--primary)] font-bold rounded-2xl hover:bg-gray-50 transition-colors shadow-lg">
            Open LunaCycle Tracker
          </Link>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10 hidden lg:block">
           <Shield size={400} />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="heading-2 text-center">Technical Specifications</h2>
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 font-bold">Specification</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-800 font-bold">Implementation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-[var(--muted)]">
              <tr>
                <td className="p-4 font-medium text-[var(--foreground)]">Data Storage</td>
                <td className="p-4">Browser LocalStorage (Encrypted in transit by TLS)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--foreground)]">Processing</td>
                <td className="p-4">100% Client-Side (React/Next.js)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--foreground)]">Analytics</td>
                <td className="p-4">Privacy-respecting Google Analytics (Anonymous)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--foreground)]">Synchronization</td>
                <td className="p-4">None (Strict Local-Only Policy)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--foreground)]">Architecture</td>
                <td className="p-4">Static Site Generation (SSG) for speed & security</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
