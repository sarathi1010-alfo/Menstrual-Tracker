import React from 'react';
import faqsData from '@/data/faqs.json';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Find answers to common questions about cycle tracking, privacy, and LunaCycle features.',
};

export default function FAQPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={schema as Record<string, unknown>} />
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">Frequently Asked Questions</h1>
      <p className="text-xl text-gray-600 mb-10">
        Have questions? We&apos;ve got answers. Learn more about how LunaCycle works and keeps your data safe.
      </p>

      <MedicalDisclaimer />

      <div className="space-y-6 mt-12">
        {faqsData.map((faq, idx) => (
          <div key={idx} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}