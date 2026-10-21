import React from 'react';
import faqsData from '@/data/faqs.json';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Common questions about LunaCycle and cycle tracking.',
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
    <div className="max-w-3xl mx-auto py-12 px-4">
      <SchemaMarkup schema={schema} />
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <MedicalDisclaimer />

      <div className="space-y-6 mt-8">
        {faqsData.map((faq, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-2 text-primary">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
