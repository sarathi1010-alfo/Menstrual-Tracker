import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy - LunaCycle Data Protection & Local Storage',
  description: 'LunaCycle stores your period tracking data locally on your device only. No servers, no accounts, no cloud storage. Read our complete privacy policy.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div>
        <h1 className="heading-1 mb-4">Privacy Policy</h1>
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

        <h2 className="heading-3 mt-8 mb-4">2. Zero Cloud Sync</h2>
        <p className="text-[var(--muted)] mb-6">
          Unlike other period trackers, LunaCycle does not offer cloud synchronization by default. Your data never leaves your browser. This means your data is not subject to data breaches on our end, as we don&apos;t have your data to begin with.
        </p>

        <h2 className="heading-3 mt-8 mb-4">3. Analytics</h2>
        <p className="text-[var(--muted)] mb-6">
          We use minimal, privacy-respecting analytics to understand how our app is used. We do not use invasive third-party tracking scripts that profile your usage behavior across the web. We never associate analytics data with your personal cycle information.
        </p>

        <h2 className="heading-3 mt-8 mb-4">4. Data Portability & Deletion</h2>
        <p className="text-[var(--muted)] mb-6">
          Because your data lives in your browser, you have complete control over it. You can clear your data at any time by clearing your browser&apos;s site data or cache for this website. We also provide a JSON export/import feature in the Settings page so you can back up your data manually.
        </p>

        <h2 className="heading-3 mt-8 mb-4">5. Changes to this Policy</h2>
        <p className="text-[var(--muted)] mb-6">
          If we ever change how we handle data, we will update this policy and provide a clear notice within the app. Our commitment to your privacy is the foundation of LunaCycle.
        </p>
      </article>
    </div>
  );
}
