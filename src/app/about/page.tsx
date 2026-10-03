import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'About LunaCycle - Privacy-First Period Tracking App',
  description: 'Learn about LunaCycle, a privacy-first period tracking app that stores your cycle data locally on your device. No accounts, no cloud storage, complete privacy.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">About LunaCycle</h1>
        <p className="text-[var(--muted)] text-lg">
          The period tracker built for absolute privacy and simplicity.
        </p>
      </div>

      <MedicalDisclaimer />

      <article className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <section className="card p-8 border-none bg-[var(--card)]">
          <h2 className="heading-2 mt-0 mb-4 text-[var(--foreground)]">Our Mission</h2>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            We believe your health data is intimately yours. In an era where personal data is often monetized, we built a tool that explicitly prevents us from seeing yours.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-3">How It Works (Technically)</h2>
          <p className="text-[var(--muted)]">
            LunaCycle was built to be different. It is a client-side only web application. This means the code runs entirely in your browser. When you log a date, it is saved directly to your device&apos;s local storage.
          </p>
          <p className="text-[var(--muted)]">
            We do not have a user database. We do not have login servers. If you clear your browser data or switch devices, you will start fresh, because we hold nothing on our end.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="heading-3">Who is this for?</h2>
          <p className="text-[var(--muted)]">
            LunaCycle is for anyone who wants a minimal, beautifully designed calendar to track their cycle length and predict upcoming dates. It is perfect for those who value digital privacy and prefer tools over social networks.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link href="/tracker" className="btn-primary text-center">
            Try the Tracker
          </Link>
          <Link href="/privacy" className="btn-secondary text-center">
            Read Privacy Policy
          </Link>
          <Link href="/faq" className="btn-secondary text-center">
            Read FAQ
          </Link>
        </div>
      </article>
    </div>
  );
}
