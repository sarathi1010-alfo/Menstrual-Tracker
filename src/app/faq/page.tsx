import { SchemaMarkup } from '@/components/SchemaMarkup';
import faqsData from '@/data/faqs.json';
import Link from 'next/link';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

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
        <h1 className="heading-1 mb-4">Frequently Asked Questions About LunaCycle & Cycle Tracking</h1>
        <p className="text-[var(--muted)] text-lg">
          Everything you need to know about tracking your cycle with LunaCycle.
        </p>
      </div>

      <div className="space-y-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="card p-6">
            <h3 className="heading-3 mb-2">{faq.question}</h3>
            <p className="text-[var(--muted)]">{faq.answer}</p>
          </div>
        ))}

        {/* Quick Access to Tools */}
        <div className="card p-6 bg-[var(--primary)]/5 border-[var(--primary)]/20 mt-8">
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

      <MedicalDisclaimer />
    </div>
  );
}
