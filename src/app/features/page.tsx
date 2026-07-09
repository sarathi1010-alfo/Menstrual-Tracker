import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Shield, Smartphone, Zap, EyeOff, Database, CloudOff, Lock, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First & Local-Only Period Tracking',
  description: 'Explore the features of LunaCycle. Learn how our privacy-first, local-storage architecture keeps your health data secure and under your control.',
  path: '/features',
});

export default function FeaturesPage() {
  const features = [
    {
      title: '100% Privacy-First',
      description: 'LunaCycle was built from the ground up with a strict privacy-first architecture. We never see, collect, or store your health data.',
      icon: Shield,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Local-Only Storage',
      description: 'Your cycle data is stored exclusively in your browser\'s local storage. Your information never leaves your device.',
      icon: Database,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      title: 'No Accounts Required',
      description: 'Start tracking immediately. No email, no passwords, no personal information needed to use LunaCycle.',
      icon: EyeOff,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      title: 'Zero Cloud Sync',
      description: 'By design, we have no servers or databases for your data. You are the sole owner of your menstrual health history.',
      icon: CloudOff,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
    {
      title: 'Visual Cycle Calendar',
      description: 'Intuitively spot patterns and phases with our color-coded calendar designed for clarity and ease of use.',
      icon: Zap,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Smart Predictions',
      description: 'Our algorithm learns from your history to provide increasingly accurate predictions for your next period and fertile window.',
      icon: Clock,
      color: 'text-pink-500',
      bg: 'bg-pink-50',
    },
    {
      title: 'Secure Passcode Lock',
      description: 'Enable an optional passcode to keep your data private even when someone else has access to your device.',
      icon: Lock,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
    },
    {
      title: 'PWA / Offline Ready',
      description: 'Install LunaCycle on your home screen and use it anytime, anywhere—even without an internet connection.',
      icon: Smartphone,
      color: 'text-cyan-500',
      bg: 'bg-cyan-50',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="heading-1">Designed for Privacy, Built for Utility</h1>
        <p className="text-xl text-[var(--muted)]">
          LunaCycle isn&apos;t just another period tracker. It&apos;s a sovereign space for your menstrual health data.
        </p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="card p-6 flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-2xl ${feature.bg} ${feature.color}`}>
              <feature.icon size={24} />
            </div>
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-[var(--primary)] rounded-[32px] p-8 md:p-16 text-white text-center space-y-8 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to take control of your data?</h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Experience the peace of mind that comes with a tracker that respects your boundaries and secures your privacy by design.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/tracker" className="px-8 py-4 bg-white text-[var(--primary)] font-bold rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
            Open Tracker Now
          </Link>
          <Link href="/blog" className="px-8 py-4 bg-[var(--primary)] border border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
            Read Our Guides
          </Link>
        </div>
      </section>

      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="heading-2">Technical Sovereignty</h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            We use modern web technologies to ensure your data stays where it belongs: with you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8 space-y-4">
            <h3 className="heading-3">Why Local Storage?</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              By using the <code>localStorage</code> API, we store your cycle data directly in your browser. This means there is no central database that can be hacked, sold, or subpoenaed. Your data is as secure as the device in your hand.
            </p>
          </div>
          <div className="card p-8 space-y-4">
            <h3 className="heading-3">Progressive Web App</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              LunaCycle is a PWA, meaning it offers an app-like experience without needing to download a binary from an app store. It works offline, loads instantly, and can be added to your home screen for quick access.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
