import React from 'react';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import faqsData from '@/data/faqs.json';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Frequently Asked Questions',
  description: 'Answers to your most common questions about LunaCycle and cycle tracking.',
  path: '/faq',
});

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <SchemaMarkup schema={faqSchema} />

      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3">{faq.question}</h2>
            <p className="text-[var(--muted)]">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
