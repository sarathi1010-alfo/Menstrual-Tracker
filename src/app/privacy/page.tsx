import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy - LunaCycle\'s Commitment to Your Data Privacy',
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

        <h2 className="heading-3 mt-8 mb-4">2. No Accounts or Data Collection</h2>
        <p className="text-[var(--muted)] mb-6">
          LunaCycle functions completely without requiring an account. We do not collect names, emails, or personal identifiers. The app functions entirely locally.
        </p>

        <h2 className="heading-3 mt-8 mb-4">3. No Cloud Sync</h2>
        <p className="text-[var(--muted)] mb-6">
          Because your data is strictly stored locally, we have no cloud sync or backup services. Your data remains solely on your current device and browser.
        </p>

        <h2 className="heading-3 mt-8 mb-4">4. Analytics</h2>
        <p className="text-[var(--muted)] mb-6">
          We do not use invasive third-party tracking scripts or analytics tools that profile your usage behavior. Any essential analytics (such as basic pageview counting) will strictly avoid associating page views with your personal cycle data.
        </p>

        <h2 className="heading-3 mt-8 mb-4">5. Data Portability & Deletion</h2>
        <p className="text-[var(--muted)] mb-6">
          Because your data lives in your browser, you have complete control over it. You can clear your data at any time by clearing your browser&apos;s site data or cache for this website. Doing so will permanently delete your cycle history from that device.
        </p>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>
            Return to the <Link href="/" className="text-[var(--primary)] hover:underline">homepage</Link> or learn more <Link href="/about" className="text-[var(--primary)] hover:underline">about us</Link>.
          </p>
        </div>
      </article>

      <MedicalDisclaimer />
    </div>
  );
}
