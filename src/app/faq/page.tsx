import { absoluteUrl } from '@/lib/seo';
import Link from 'next/link';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import faqsData from '@/data/faqs.json';

export const metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Find answers to common questions about LunaCycle, our privacy-first approach, and menstrual cycle tracking.',
  alternates: {
    canonical: absoluteUrl('/faq'),
  },
};

export default function FAQPage() {
  const faqSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsData.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SchemaMarkup schema={faqSchema} />

      <div className="text-center mb-12">
        <h1 className="heading-1 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted">
          Everything you need to know about LunaCycle and private cycle tracking.
        </p>
      </div>

      <div className="space-y-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="card p-6 border border-gray-100">
            <h3 className="heading-3 text-lg mb-3">{faq.question}</h3>
            <p className="text-muted leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="heading-2 mb-6">Need more help?</h2>
        <div className="flex justify-center gap-4">
           <Link href="/contact" className="button-primary">Contact Support</Link>
           <Link href="/guides" className="text-primary hover:underline px-4 py-3">Read Guides</Link>
        </div>
      </div>
    </div>
  );
}
