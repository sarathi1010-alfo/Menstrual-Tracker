import React from 'react';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import faqs from '@/data/faqs.json';
import { constructMetadata, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Frequently Asked Questions - LunaCycle',
  description: 'Find answers to common questions about cycle tracking, privacy, and how to use LunaCycle.',
  path: '/faq',
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={faqSchema} />

      <h1 className="heading-1 mb-8">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
