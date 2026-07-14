import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Shield, Smartphone, Zap, Database, UserCheck, Lock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Period Tracking Architecture',
  description: 'Explore the features of LunaCycle. Built with a local-first, no-account architecture to ensure your menstrual cycle data remains private and secure on your device.',
  path: '/features',
});

export default function FeaturesPage() {
  const features = [
    {
      title: 'Local-Only Storage',
      description: 'Your cycle data never leaves your device. We use browser local storage instead of cloud databases.',
      icon: <Database className="text-[var(--primary)]" size={24} />,
    },
    {
      title: 'No Accounts Required',
      description: 'Start tracking immediately without an email, password, or profile. True anonymity by design.',
      icon: <UserCheck className="text-[var(--secondary)]" size={24} />,
    },
    {
      title: 'Privacy-First Architecture',
      description: 'No third-party tracking pixels or invasive analytics. Your health data is your business.',
      icon: <Shield className="text-[var(--accent)]" size={24} />,
    },
    {
      title: 'Fast & Lightweight',
      description: 'A clean, minimal interface that loads instantly and works offline as a PWA.',
      icon: <Zap className="text-yellow-500" size={24} />,
    },
    {
      title: 'Client-Side Processing',
      description: 'All predictions and cycle calculations happen on your device, not on our servers.',
      icon: <Smartphone className="text-blue-500" size={24} />,
    },
    {
      title: 'Data Sovereignty',
      description: 'Export or delete your data at any time. You have total control over your digital footprint.',
      icon: <Lock className="text-purple-500" size={24} />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-20">
      <section className="text-center space-y-4 py-12">
        <h1 className="heading-1">Designed for Privacy, Built for Clarity.</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle is a different kind of period tracker. We prioritize your data sovereignty above all else.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="card p-8 space-y-4 hover:shadow-md transition-shadow border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <section className="card p-10 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 border-[var(--primary)]/10 text-center space-y-6">
        <h2 className="heading-2">Ready to take control of your data?</h2>
        <p className="text-[var(--muted)] max-w-xl mx-auto">
          Experience the peace of mind that comes with knowing your most sensitive health information is stored only on the device in your hand.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/tracker" className="button-primary px-8 py-4">
            Open Tracker
          </Link>
          <Link href="/blog" className="px-8 py-4 rounded-2xl font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Read Our Guides
          </Link>
        </div>
      </section>
    </div>
  );
}
