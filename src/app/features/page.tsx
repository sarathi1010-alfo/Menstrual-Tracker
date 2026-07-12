import { constructMetadata } from '@/lib/seo';
import { Shield, Database, Lock, EyeOff, Smartphone, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Period Tracking',
  description: 'Explore the features of LunaCycle: local storage, zero-cloud sync, offline access, and accurate cycle predictions without the privacy cost.',
  path: '/features',
});

const features = [
  {
    title: 'Local-Only Storage',
    description: 'Your cycle data never leaves your device. We use browser local storage to keep your information strictly under your control.',
    icon: <Database className="w-8 h-8 text-[var(--primary)]" />,
  },
  {
    title: 'Zero Accounts Required',
    description: 'Start tracking instantly. No email, no password, and no account creation required. Your identity remains anonymous.',
    icon: <Lock className="w-8 h-8 text-[var(--primary)]" />,
  },
  {
    title: 'Offline-First Architecture',
    description: 'Access your calendar and log symptoms even without an internet connection. Perfect for travel and privacy.',
    icon: <Smartphone className="w-8 h-8 text-[var(--primary)]" />,
  },
  {
    title: 'No Data Monetization',
    description: 'We don\'t sell your data because we don\'t have it. Your health history is not a product for advertisers.',
    icon: <EyeOff className="w-8 h-8 text-[var(--primary)]" />,
  },
  {
    title: 'Accurate Predictions',
    description: 'Smart algorithms calculate your average cycle length to predict future periods and fertile windows locally.',
    icon: <Zap className="w-8 h-8 text-[var(--primary)]" />,
  },
  {
    title: 'Privacy by Design',
    description: 'Built from the ground up to prioritize user sovereignty over data. We believe health tracking should be private.',
    icon: <Shield className="w-8 h-8 text-[var(--primary)]" />,
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Designed for Your Privacy</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle provides the tracking tools you need without the privacy compromises of traditional period apps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card p-8 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-[var(--primary)]/10 rounded-2xl">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-[var(--muted)]">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 card p-10 bg-[var(--primary)] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to take control?</h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of users who trust LunaCycle for private, secure, and accurate cycle tracking.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/tracker" className="px-8 py-3 bg-white text-[var(--primary)] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
            Open Tracker
          </Link>
          <Link href="/blog" className="px-8 py-3 bg-[var(--primary-dark)] text-white font-bold rounded-xl border border-white/20 hover:bg-white/10 transition-colors">
            Read Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
