import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy - LunaCycle Data Protection & Local Storage',
  description: 'LunaCycle stores your period tracking data locally on your device only. No servers, no accounts, no cloud storage. Read our complete privacy policy.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-8">
      <div>
        <h1 className="heading-1 mb-4">Privacy Policy &ndash; LunaCycle&apos;s Commitment to Your Data Privacy</h1>
        <p className="text-[var(--muted)] text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-[var(--muted)] mb-6 text-lg font-medium">
          The short version: LunaCycle does not collect, store, or transmit your cycle data to any external server. We have built this app from the ground up to respect your digital privacy.
        </p>

        <h2 className="heading-3 mt-8 mb-4">1. Local Storage Only</h2>
        <p className="text-[var(--muted)] mb-6">
          All data you input into LunaCycle (such as period start dates, cycle length, and symptoms) is stored exclusively on your device using your web browser&apos;s standard <code>localStorage</code> API. We do not operate a backend database for user data, meaning we physically cannot access your health information.
        </p>

        <h2 className="heading-3 mt-8 mb-4">2. No Accounts, No Cloud Sync</h2>
        <p className="text-[var(--muted)] mb-6">
          Because we do not use servers, there are no accounts to create, passwords to remember, or emails to provide. Your data never leaves your device and is not synced to the cloud. This means if you switch devices or clear your browser data, your cycle history will not automatically transfer over.
        </p>

        <h2 className="heading-3 mt-8 mb-4">3. Analytics</h2>
        <p className="text-[var(--muted)] mb-6">
          We use Google Analytics (GA4) solely to understand basic website traffic (e.g., how many people visit our homepage or read our blog). This tracking is completely disconnected from your personal cycle data. Analytics scripts cannot and do not access your local storage data.
        </p>

        <h2 className="heading-3 mt-8 mb-4">4. Data Portability & Deletion</h2>
        <p className="text-[var(--muted)] mb-6">
          Because your data lives entirely in your browser, you have complete control over it. You can clear your data at any time by going to the Settings page in LunaCycle and clicking &quot;Clear All Data&quot;, or by clearing your browser&apos;s site data or cache. Doing so will permanently delete your cycle history from that device.
        </p>

        <h2 className="heading-3 mt-8 mb-4">5. Changes to this Policy</h2>
        <p className="text-[var(--muted)] mb-6">
          If we ever change how we handle data (for example, if we introduce an optional, encrypted cloud sync feature in the future), we will make it strictly opt-in and update this privacy policy to clearly explain the technical implementation before any changes take effect.
        </p>
      </article>

      <section className="flex gap-4 justify-center py-8">
        <Link href="/" className="button-primary">Back to Tracker</Link>
        <Link href="/about" className="px-6 py-3 rounded-2xl font-medium text-[var(--foreground)] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Learn More About Us</Link>
      </section>

      <MedicalDisclaimer />
    </div>
  );
}
