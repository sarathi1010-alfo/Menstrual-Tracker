import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { Shield, Smartphone, Zap, Lock, Calendar, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Features - Privacy-First Period Tracking Tools',
  description: 'Explore the features of LunaCycle: 100% local data storage, no accounts required, accurate cycle predictions, and beautiful data visualization.',
  path: '/features',
});

const features = [
  {
    title: '100% Privacy-First',
    description: 'Your data stays on your device. We use local storage to ensure your health information is never uploaded to a cloud or shared with third parties.',
    icon: Shield,
  },
  {
    title: 'No Accounts Required',
    description: 'Start tracking immediately without giving away your email or personal identity. We value your anonymity.',
    icon: Lock,
  },
  {
    title: 'Visual Cycle Calendar',
    description: 'A beautiful, intuitive calendar to log your period dates and view your historical cycle patterns at a glance.',
    icon: Calendar,
  },
  {
    title: 'Smart Predictions',
    description: 'Advanced algorithms calculate your average cycle length to predict your next period and fertile window with increasing accuracy.',
    icon: Zap,
  },
  {
    title: 'Offline-First PWA',
    description: 'Install LunaCycle on your phone and use it completely offline. No internet connection required to track your data.',
    icon: Smartphone,
  },
  {
    title: 'Cycle Insights',
    description: 'Understand your body better with charts that visualize your cycle length variability and symptoms over time.',
    icon: BarChart2,
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      <div className="text-center space-y-4">
        <h1 className="heading-1">Designed for Privacy, Built for Utility</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle combines powerful tracking tools with a strict local-only data policy to give you total sovereignty over your health data.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card p-8 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
              <feature.icon size={24} />
            </div>
            <h3 className="heading-3">{feature.title}</h3>
            <p className="text-[var(--muted)] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="card p-12 bg-[var(--primary)] text-white text-center space-y-8">
        <h2 className="text-3xl font-bold">Ready to take control of your cycle?</h2>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Join thousands of users who trust LunaCycle for private, secure, and accurate period tracking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tracker" className="px-8 py-4 bg-white text-[var(--primary)] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg">
            Open Tracker
          </Link>
          <Link href="/blog" className="px-8 py-4 bg-[var(--primary)] border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
            Read Our Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
