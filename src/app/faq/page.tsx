import React from 'react';
import faqsData from '@/data/faqs.json';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Find answers to common questions about cycle tracking, LunaCycle features, privacy, and menstrual health.',
};

export default function FAQPage() {
  const faqSchema = {
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
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={faqSchema} />

      <h1 className="heading-1 mb-6 text-center text-primary">Frequently Asked Questions</h1>
      <p className="text-lg text-muted text-center mb-12">
        Find answers to common questions about cycle tracking, privacy, and LunaCycle features.
      </p>

      <MedicalDisclaimer />

      <div className="space-y-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h2>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
