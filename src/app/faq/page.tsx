import React from 'react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Metadata } from 'next';
import faqsData from '@/data/faqs.json';

export const metadata: Metadata = {
  title: 'LunaCycle FAQs - Frequently Asked Questions',
  description: 'Find answers to common questions about cycle tracking, menstrual health, and using the LunaCycle app.',
};

export default async function FAQPage() {
  const faqs = faqsData;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={faqSchema} />

      <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>

      <MedicalDisclaimer />

      <div className="space-y-6 mt-8">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
