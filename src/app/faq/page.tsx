import React from 'react';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';
import faqsData from '@/data/faqs.json';

export const metadata: Metadata = constructMetadata({
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about LunaCycle and menstrual cycle tracking.',
  path: '/faq',
});

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <SchemaMarkup schema={schema} />

      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-[var(--muted)]">Find answers to common questions about LunaCycle.</p>
      </header>

      <div className="space-y-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-[var(--surface)] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-[var(--muted)] leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
