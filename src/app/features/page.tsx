import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Shield, Smartphone, HardDrive, Zap, Lock, EyeOff } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Period Tracking Architecture',
  description: 'Explore the features of LunaCycle. Learn about our local storage architecture, no-account policy, and privacy-first design for cycle tracking.',
  path: '/features',
});

export default function FeaturesPage() {
  const features = [
    {
      title: 'Local Storage Architecture',
      description: 'Your data never leaves your device. We use your browser\'s local storage to save your cycle history securely.',
      icon: <HardDrive size={24} className="text-[var(--primary)]" />,
    },
    {
      title: 'No Accounts Required',
      description: 'Start tracking immediately. No email, no password, no social logins, and no profiling.',
      icon: <Lock size={24} className="text-[var(--primary)]" />,
    },
    {
      title: 'Zero Cloud Sync',
      description: 'We don\'t have servers to store your health data. This eliminates the risk of data breaches or third-party access.',
      icon: <Shield size={24} className="text-[var(--primary)]" />,
    },
    {
      title: 'Visual Calendar',
      description: 'Spot patterns at a glance with a clean, color-coded calendar highlighting your period and fertile window.',
      icon: <EyeOff size={24} className="text-[var(--primary)]" />,
    },
    {
      title: 'Smart Predictions',
      description: 'Our privacy-first algorithm learns your unique cycle length to provide accurate upcoming period estimates.',
      icon: <Zap size={24} className="text-[var(--primary)]" />,
    },
    {
      title: 'Mobile Web App (PWA)',
      description: 'Install LunaCycle on your home screen for a native app experience without the app store tracking.',
      icon: <Smartphone size={24} className="text-[var(--primary)]" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-12">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="heading-1">Designed for Privacy, Built for Utility</h1>
        <p className="text-xl text-[var(--muted)]">
          LunaCycle isn&apos;t just another period tracker. It&apos;s a technical reimagining of how health data should be handled in the digital age.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="card p-8 space-y-4 border border-transparent hover:border-[var(--primary)]/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="heading-3">{feature.title}</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <section className="card p-10 bg-[var(--primary)] text-white text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to take back your data?</h2>
        <p className="text-white/80 max-w-xl mx-auto text-lg">
          Join thousands of users who track their cycles without compromising their digital sovereignty.
        </p>
        <div className="flex justify-center pt-4">
          <Link href="/tracker" className="px-8 py-4 bg-white text-[var(--primary)] font-bold rounded-2xl hover:bg-gray-50 transition-colors shadow-lg">
            Start Tracking for Free
          </Link>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="heading-2 text-center">How it works technically</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-gray dark:prose-invert">
            <h3 className="heading-3">1. Client-Side Only Processing</h3>
            <p>
              When you enter a date, our JavaScript algorithm calculates your next period and fertile window entirely within your browser&apos;s memory. No data is sent to a backend for processing.
            </p>
            <h3 className="heading-3">2. Web Storage API</h3>
            <p>
              We utilize the <code>localStorage</code> API, which is a standard feature of modern web browsers. It allows web applications to store data locally on the user&apos;s computer or mobile device.
            </p>
            <h3 className="heading-3">3. Progressive Web App (PWA)</h3>
            <p>
              LunaCycle uses a Service Worker to cache assets, allowing the app to work offline. This ensures you can access your data even without an internet connection.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 aspect-square flex items-center justify-center border border-gray-200 dark:border-gray-700">
             <div className="text-center space-y-4">
                <div className="inline-block p-4 rounded-full bg-[var(--primary)]/20 text-[var(--primary)]">
                   <Shield size={64} />
                </div>
                <p className="font-bold text-xl">Privacy by Architecture</p>
                <p className="text-[var(--muted)] text-sm">Not by promise, but by design.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
