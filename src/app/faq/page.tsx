import { SchemaMarkup } from '@/components/SchemaMarkup';
import faqsData from '@/data/faqs.json';
import Link from 'next/link';

import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Frequently Asked Questions - LunaCycle Period Tracker Help',
  description: 'Get answers to common questions about LunaCycle period tracker. Learn how to track your cycle, data privacy, predictions, and more in our FAQ.',
  path: '/faq',
});

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <SchemaMarkup schema={faqSchema} />
      <div>
        <h1 className="heading-1 mb-4">Frequently Asked Questions</h1>
        <p className="text-[var(--muted)] text-lg">
          Everything you need to know about tracking your cycle with LunaCycle.
        </p>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="heading-3 mb-2">Is my data secure?</h3>
          <p className="text-[var(--muted)]">
            Yes. We built LunaCycle with a strict privacy-first architecture. Your data is stored locally on your device using your browser&apos;s local storage. We do not have servers, databases, or accounts. Your information never leaves your device.
          </p>
        </div>

        <div className="card p-6">
          <h3 className="heading-3 mb-2">How do I track my period?</h3>
          <p className="text-[var(--muted)]">
            Navigate to the Tracker page and tap the date on the calendar when your period started. The app will automatically calculate your cycle length based on the distance between your logged dates.
          </p>
        </div>

        <div className="card p-6">
          <h3 className="heading-3 mb-2">How is my next period predicted?</h3>
          <p className="text-[var(--muted)]">
            We look at your past logged periods to determine your average cycle length (excluding extreme outliers). We then add this average to your most recent period&apos;s start date to predict when your next one will begin.
          </p>
        </div>

        <div className="card p-6">
          <h3 className="heading-3 mb-2">Can I use this for birth control?</h3>
          <p className="text-[var(--muted)] text-[var(--accent)] font-medium">
            No. LunaCycle is designed for educational and tracking purposes only.
          </p>
          <p className="text-[var(--muted)] mt-2">
            The fertile window estimations are based on standard calendar calculations, which are not reliable enough to prevent pregnancy. Please consult with a healthcare professional for reliable contraception methods.
          </p>
        </div>

        {/* Quick Access to Tools */}
        <div className="card p-6 bg-[var(--primary)]/5 border-[var(--primary)]/20">
          <h3 className="heading-3 mb-3 text-[var(--primary)]">Quick Access: Free Cycle Tools</h3>
          <div className="space-y-3">
            <Link href="/tools/next-period-predictor" className="block text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              <span className="font-medium">Next Period Predictor</span>
              <span className="block text-sm text-[var(--muted)]">Predict when your next period will start</span>
            </Link>
            <Link href="/tools/safe-days-calculator" className="block text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              <span className="font-medium">Safe Days Calculator</span>
              <span className="block text-sm text-[var(--muted)]">Calculate safe days and fertile window</span>
            </Link>
            <Link href="/tools/ovulation-calculator" className="block text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              <span className="font-medium">Ovulation Calculator</span>
              <span className="block text-sm text-[var(--muted)]">Find your most fertile days instantly</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
