import React from 'react';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import faqsData from '@/data/faqs.json';
import { absoluteUrl } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - LunaCycle',
  description: 'Find answers to common questions about menstrual tracking, cycle phases, and how to use the LunaCycle app securely and privately.',
};

export default function FAQPage() {
  const faqSchema = {
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
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={faqSchema} />

      <h1 className="text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
        Frequently Asked Questions
      </h1>

      <MedicalDisclaimer />

      <div className="mt-8">
        <dl className="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
          {faqsData.map((faq, index) => (
            <div key={index} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base font-medium text-[var(--foreground)] lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-2 lg:mt-0 lg:col-span-7">
                <p className="text-base text-[var(--muted)]">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
