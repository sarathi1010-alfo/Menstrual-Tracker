import { Metadata } from 'next';
import { Shield, HardDrive, UserX } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Features | Privacy-First Cycle Tracking | LunaCycle',
  description: 'Explore LunaCycle\'s features: 100% offline functionality, local storage, and zero accounts required.',
});

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-16">
      <header className="text-center space-y-4">
        <h1 className="heading-1">Features Built for Privacy</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle is engineered from the ground up to protect your most intimate health data. No cloud sync, no tracking, no compromise.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="card p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <HardDrive size={32} />
          </div>
          <h2 className="heading-3">100% Local Storage</h2>
          <p className="text-[var(--muted)] text-sm">
            Your data never leaves your device. It is securely stored directly in your browser&apos;s local storage.
          </p>
        </div>

        <div className="card p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <UserX size={32} />
          </div>
          <h2 className="heading-3">No Accounts</h2>
          <p className="text-[var(--muted)] text-sm">
            Start tracking instantly. We never ask for your email, name, or phone number.
          </p>
        </div>

        <div className="card p-8 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <Shield size={32} />
          </div>
          <h2 className="heading-3">Zero External APIs</h2>
          <p className="text-[var(--muted)] text-sm">
            All prediction models and algorithms run locally on your device. We don&apos;t send your data to third-party servers.
          </p>
        </div>
      </div>
    </div>
  );
}
