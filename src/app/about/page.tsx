import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'About CycleHub - Privacy-First Period Tracking App',
  description: 'Learn about CycleHub, a privacy-first period tracking app that stores your cycle data locally on your device. No accounts, no cloud storage, complete privacy.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">About CycleHub</h1>
        <p className="text-[var(--muted)] text-lg">
          A beautifully simple utility designed to give you clarity over your cycle, stored securely on your own device.
        </p>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="heading-3 mt-8 mb-4">The Problem</h2>
        <p className="text-[var(--muted)] mb-6 leading-relaxed">
          Most period tracking apps require an account, store sensitive health data on remote servers, and clutter their interfaces with ads or complex social features. Users often just want a simple way to log dates and see when their next period is due without sacrificing their privacy.
        </p>

        <h2 className="heading-3 mt-8 mb-4">Our Approach</h2>
        <p className="text-[var(--muted)] mb-6 leading-relaxed">
          CycleHub was built to be different. It is a client-side only web application. This means the code runs entirely in your browser. When you log a date, it is saved directly to your device&apos;s local storage.
        </p>

        <ul className="list-disc list-inside space-y-2 text-[var(--muted)] mb-6">
          <li>No accounts to create or manage.</li>
          <li>No cloud servers storing your health data.</li>
          <li>No tracking pixels monitoring your behavior.</li>
          <li>Fast, instantaneous interactions.</li>
        </ul>

        <h2 className="heading-3 mt-8 mb-4">Who is it for?</h2>
        <p className="text-[var(--muted)] mb-6 leading-relaxed">
          CycleHub is for anyone who wants a minimal, beautifully designed calendar to track their cycle length and predict upcoming dates. It is perfect for those who value digital privacy and prefer tools over social networks.
        </p>

        <MedicalDisclaimer />
      </article>
    </div>
  );
}
