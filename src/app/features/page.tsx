import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'Features - LunaCycle Privacy-First Period Tracker',
  description: 'Explore the features of LunaCycle. Visual calendar, accurate predictions, local storage, and 100% privacy-first design with no accounts required.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <MedicalDisclaimer />

      <div className="text-center space-y-4">
        <h1 className="heading-1">Features that put you in control</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle is built differently. We prioritize your privacy above all else while providing a beautiful, intuitive tracking experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="card p-8 space-y-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="heading-3">100% Privacy-First</h2>
          <p className="text-[var(--muted)]">
            No accounts. No sign-ups. No cloud syncing. Your data never leaves your device. Everything is stored locally in your browser, ensuring your health information remains completely private and secure.
          </p>
        </div>

        <div className="card p-8 space-y-4">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="heading-3">Visual Calendar</h2>
          <p className="text-[var(--muted)]">
            Our intuitive, color-coded calendar makes it easy to spot patterns, log your period, and visualize your cycle phases. See your past cycles and future predictions at a glance.
          </p>
        </div>

        <div className="card p-8 space-y-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="heading-3">Smart Predictions</h2>
          <p className="text-[var(--muted)]">
            LunaCycle learns from your logged data over time. Our algorithm calculates your average cycle length to provide increasingly accurate predictions for your next period and estimated fertile window.
          </p>
        </div>

        <div className="card p-8 space-y-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="heading-3">No Ads or Clutter</h2>
          <p className="text-[var(--muted)]">
            We believe a health tool should be clean, focused, and free from distractions. You won&apos;t find any intrusive ads, confusing social features, or bloatware in LunaCycle.
          </p>
        </div>
      </div>
    </div>
  );
}
