import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
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
        <div className="mt-4 flex gap-4 text-sm">
          <Link href="/" className="text-[var(--primary)] hover:underline">Home</Link>
          <Link href="/about" className="text-[var(--primary)] hover:underline">About Us</Link>
        </div>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-[var(--muted)] mb-6 text-lg font-medium">
          The short version: LunaCycle does not collect, store, or transmit your cycle data to any external server.
        </p>

        <h2 className="heading-3 mt-8 mb-4">1. Local Storage Only</h2>
        <p className="text-[var(--muted)] mb-6">
          All data you input into LunaCycle (such as period start dates and symptom logs) is stored exclusively on your device using your web browser&apos;s standard <code>localStorage</code> API. We do not operate a backend database for user data, meaning we physically cannot access your health information. There is no cloud sync and no data collection.
        </p>

        <h2 className="heading-3 mt-8 mb-4">2. No Accounts Required</h2>
        <p className="text-[var(--muted)] mb-6">
          Because your data is stored locally, there is no need to create an account or provide any personal information like an email address or phone number to use LunaCycle. Your identity remains completely unlinked from your cycle data.
        </p>

        <h2 className="heading-3 mt-8 mb-4">3. Essential Analytics</h2>
        <p className="text-[var(--muted)] mb-6">
          We use Google Analytics (GA4) with anonymized data collection to understand general website traffic patterns (like which pages are popular). This analytics setup strictly avoids associating page views with your personal cycle data, which remains inaccessible in your local storage.
        </p>

        <h2 className="heading-3 mt-8 mb-4">4. Data Portability & Deletion</h2>
        <p className="text-[var(--muted)] mb-6">
          Because your data lives in your browser, you have complete control over it. You can export your data to a JSON file via the Settings page. You can also clear your data at any time by clearing your browser&apos;s site data or cache for this website, which will permanently delete your cycle history from that device.
        </p>

        <h2 className="heading-3 mt-8 mb-4">5. Changes to this Policy</h2>
        <p className="text-[var(--muted)] mb-6">
          If we ever change how we handle data, we will update this privacy policy to clearly explain the technical implementation.
        </p>
      </article>

      <MedicalDisclaimer />
    </div>
  );
}
