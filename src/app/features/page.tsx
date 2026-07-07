import { Metadata } from 'next';
import { Shield, Database, Lock, EyeOff, Smartphone, Zap, RefreshCw, BarChart3 } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy-First Features - Why LunaCycle is Different',
  description: 'Explore the features of LunaCycle. Learn about our 100% local storage, no-account architecture, and privacy-first design for menstrual tracking.',
  path: '/features',
});

export default function FeaturesPage() {
  const features = [
    {
      title: '100% Local Storage',
      description: 'Your health data never leaves your device. We use browser local storage instead of central servers, ensuring your most intimate information stays under your control.',
      icon: <Database className="text-[var(--primary)]" size={24} />,
    },
    {
      title: 'No Accounts Required',
      description: 'Start tracking immediately without an email, password, or social login. By eliminating accounts, we eliminate the primary way data is linked to your identity.',
      icon: <Lock className="text-[var(--secondary)]" size={24} />,
    },
    {
      title: 'Zero Tracking & Analytics',
      description: 'Unlike other apps, we don\'t use third-party trackers or sell your behavioral data to advertisers. Your cycle is your business, not a data point.',
      icon: <EyeOff className="text-[var(--accent)]" size={24} />,
    },
    {
      title: 'Works Offline',
      description: 'LunaCycle is a Progressive Web App (PWA) that works perfectly without an internet connection. Track your cycle anywhere, anytime.',
      icon: <Smartphone className="text-green-500" size={24} />,
    },
    {
      title: 'Instant Predictions',
      description: 'Our rule-based algorithm calculates your next period and fertile window instantly on your device, providing clarity without the wait.',
      icon: <Zap className="text-yellow-500" size={24} />,
    },
    {
      title: 'Data Sovereignty',
      description: 'You can export your entire history as a JSON file at any time. Your data is yours to keep, move, or delete whenever you choose.',
      icon: <RefreshCw className="text-blue-500" size={24} />,
    },
    {
      title: 'Visual Insights',
      description: 'Spot patterns easily with color-coded calendars and intuitive charts that help you understand your unique rhythm.',
      icon: <BarChart3 className="text-purple-500" size={24} />,
    },
    {
      title: 'Privacy-First Architecture',
      description: 'Built with the latest web technologies to provide a native-app experience with the security and transparency of an open-source utility.',
      icon: <Shield className="text-[var(--primary)]" size={24} />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8">
      <section className="text-center space-y-4">
        <h1 className="heading-1">Designed for Privacy, Built for Clarity</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle isn&apos;t just another period tracker. It&apos;s a privacy-first utility designed to give you total control over your health data.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card p-6 flex gap-4 items-start hover:border-[var(--primary)]/30 transition-colors">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 shrink-0">
              {feature.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-3xl p-8 md:p-12 text-center space-y-6">
        <h2 className="heading-2">Ready to take control?</h2>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          Experience the peace of mind that comes with local-only tracking. No strings, no servers, just your data on your device.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/tracker" className="button-primary">
            Start Tracking Now
          </Link>
          <Link href="/about" className="px-6 py-3 rounded-2xl font-medium text-[var(--foreground)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition-colors">
            Read Our Philosophy
          </Link>
        </div>
      </section>
    </div>
  );
}
