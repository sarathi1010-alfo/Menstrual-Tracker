import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy - CycleHub Data Protection & Local Storage',
  description: 'CycleHub stores your period tracking data locally on your device only. No servers, no accounts, no cloud storage. Read our complete privacy policy.',
  path: '/privacy',
});

import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <MedicalDisclaimer />
      <div>
        <h1 className="heading-1 mb-4">Privacy Policy</h1>
        <p className="text-[var(--muted)] text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-[var(--muted)] mb-6 text-lg font-medium">
          The short version: CycleHub does not collect, store, or transmit your cycle data to any external server.
        </p>

        <h2 className="heading-3 mt-8 mb-4">1. Local Storage Only</h2>
        <p className="text-[var(--muted)] mb-6">
          All data you input into CycleHub (such as period start dates) is stored exclusively on your device using your web browser&apos;s standard <code>localStorage</code> API. We do not operate a backend database for user data, meaning we physically cannot access your health information.
        </p>

        <h2 className="heading-3 mt-8 mb-4">2. Analytics</h2>
        <p className="text-[var(--muted)] mb-6">
          We do not use invasive third-party tracking scripts or analytics tools that profile your usage behavior. Any essential analytics (such as basic pageview counting, if implemented in the future) will strictly avoid associating page views with your personal cycle data.
        </p>

        <h2 className="heading-3 mt-8 mb-4">3. Data Portability & Deletion</h2>
        <p className="text-[var(--muted)] mb-6">
          Because your data lives in your browser, you have complete control over it. You can clear your data at any time by clearing your browser&apos;s site data or cache for this website. Doing so will permanently delete your cycle history from that device.
        </p>

        <h2 className="heading-3 mt-8 mb-4">4. Changes to this Policy</h2>
        <p className="text-[var(--muted)] mb-6">
          If we ever change how we handle data (for example, if we introduce an optional, encrypted cloud sync feature in the future), we will make it strictly opt-in and update this privacy policy to clearly explain the technical implementation.
        </p>
      </article>
    </div>
  );
}
