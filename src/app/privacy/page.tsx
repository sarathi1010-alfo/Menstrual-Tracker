import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy - LunaCycle Data Protection & Local Storage',
  description: 'LunaCycle stores your period tracking data locally on your device only. No servers, no accounts, no cloud storage. Read our complete privacy policy.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">Privacy Policy – LunaCycle&apos;s Commitment to Your Data Privacy</h1>
        <p className="text-[var(--muted)] text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-[var(--muted)] mb-6 text-lg font-medium">
          The short version: LunaCycle does not collect, store, or transmit your cycle data to any external server.
        </p>

        <h2 className="heading-3 mt-8 mb-4">1. Local Storage Only</h2>
        <p className="text-[var(--muted)] mb-6">
          All data you input into LunaCycle (such as period start dates) is stored exclusively on your device using your web browser&apos;s standard <code>localStorage</code> API. We do not operate a backend database for user data, meaning we physically cannot access your health information.
        </p>

        <h2 className="heading-3 mt-8 mb-4">2. No Accounts or Cloud Sync</h2>
        <p className="text-[var(--muted)] mb-6">
          LunaCycle requires no user registration, no emails, and no passwords. Your identity is completely detached from your usage of the tool. We purposefully avoid building cloud synchronization features to ensure your data never leaves your device.
        </p>

        <h2 className="heading-3 mt-8 mb-4">3. Analytics</h2>
        <p className="text-[var(--muted)] mb-6">
          We use basic Google Analytics (GA4) to understand how many people visit our site and which pages are most popular, but this is completely separate from your personal cycle data. Analytics tracking does not and cannot access the health data stored in your local storage.
        </p>

        <h2 className="heading-3 mt-8 mb-4">4. Data Portability & Deletion</h2>
        <p className="text-[var(--muted)] mb-6">
          Because your data lives entirely in your browser, you have complete control over it. You can clear your data at any time by clearing your browser&apos;s site data or cache for this website. Doing so will permanently delete your cycle history from that device.
        </p>

        <h2 className="heading-3 mt-8 mb-4">5. Changes to this Policy</h2>
        <p className="text-[var(--muted)] mb-6">
          If we ever change how we handle data, we will update this privacy policy to clearly explain the technical implementation.
        </p>
      </article>
      <div className="mt-8 text-center text-[var(--muted)] border-t pt-6">
        <p>Explore more sections: <Link href="/" className="hover:text-[var(--primary)]">Home</Link> | <Link href="/about" className="hover:text-[var(--primary)]">About</Link> | <Link href="/faq" className="hover:text-[var(--primary)]">FAQ</Link></p>
      </div>
    </div>
  );
}
