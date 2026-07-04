import { Shield, Smartphone, Zap, Clock, Lock, BarChart3 } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Features - Privacy-First Menstrual Cycle Tracking | LunaCycle',
  description: 'Explore the features of LunaCycle. 100% private, local storage, no accounts, and accurate cycle predictions on your device.',
  path: '/features',
});

export default function FeaturesPage() {
  const features = [
    {
      title: "100% Privacy-First",
      description: "No accounts, no cloud sync, and no servers. Your health data never leaves your browser.",
      icon: <Shield size={24} />,
    },
    {
      title: "Local Storage Only",
      description: "Data is saved directly to your device. You own your data entirely, with zero third-party access.",
      icon: <Lock size={24} />,
    },
    {
      title: "Accurate Predictions",
      description: "Smart algorithms that learn from your history to predict periods, ovulation, and fertile windows.",
      icon: <Zap size={24} />,
    },
    {
      title: "Offline Ready",
      description: "Works completely offline. Log your cycle anytime, anywhere, without needing an internet connection.",
      icon: <Smartphone size={24} />,
    },
    {
      title: "Cycle Insights",
      description: "Visualize your cycle phases and track symptoms to better understand your body's unique rhythms.",
      icon: <BarChart3 size={24} />,
    },
    {
      title: "Instant History",
      description: "Quickly view past cycles to identify patterns and prepare for upcoming changes.",
      icon: <Clock size={24} />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <header className="text-center space-y-4">
        <h1 className="heading-1">Designed for Privacy, Built for Utility</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle provides powerful cycle tracking without the privacy compromises of traditional health apps.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
              {feature.icon}
            </div>
            <h2 className="heading-3">{feature.title}</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <section className="card p-8 md:p-12 bg-[var(--primary)] text-white text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-bold">Ready to track your cycle privately?</h2>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Join thousands of users who trust LunaCycle with their most sensitive health data. No signups required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/tracker" className="px-8 py-3 bg-white text-[var(--primary)] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
            Open Tracker
          </Link>
          <Link href="/blog" className="px-8 py-3 bg-[var(--primary)] border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
            Read Education Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
