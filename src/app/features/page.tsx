import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Shield, Activity, CalendarDays, Lock, Smartphone, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Period Tracking Tools',
  description: 'Explore the features of LunaCycle, from visual cycle calendars to smart predictions and local-only data storage. Secure, simple, and free.',
  path: '/features',
});

export default function FeaturesPage() {
  const features = [
    {
      title: 'Local-Only Storage',
      description: 'Your health data never leaves your device. We use browser local storage to ensure 100% privacy.',
      icon: Lock,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Smart Cycle Predictions',
      description: 'Our algorithm learns your unique rhythm to provide accurate estimates for your next period and fertile window.',
      icon: Activity,
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--primary)]/10'
    },
    {
      title: 'Visual Cycle Calendar',
      description: 'An intuitive, color-coded calendar that helps you spot patterns and understand your cycle phases at a glance.',
      icon: CalendarDays,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'PWA / Installable',
      description: 'Install LunaCycle on your home screen for a native app experience that works completely offline.',
      icon: Smartphone,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      title: 'No Accounts Required',
      description: 'Start tracking immediately. No email, no password, no barriers to managing your health.',
      icon: Shield,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    {
      title: 'Instant Performance',
      description: 'Because there are no servers to wait for, everything in LunaCycle happens instantly.',
      icon: Zap,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-12">
      <section className="text-center space-y-4">
        <h1 className="heading-1">Powerful Features, Total Privacy</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle combines advanced tracking technology with a strict commitment to your data sovereignty.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card p-8 space-y-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center`}>
              <feature.icon size={24} />
            </div>
            <h3 className="heading-3">{feature.title}</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <section className="bg-[var(--primary)]/5 rounded-3xl p-8 md:p-12 text-center space-y-6 border border-[var(--primary)]/10">
        <h2 className="heading-2">Ready to take control of your cycle data?</h2>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          Join thousands of users who trust LunaCycle for private, secure, and simple period tracking.
        </p>
        <div className="flex justify-center">
          <Link href="/tracker" className="button-primary">
            Start Tracking for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
