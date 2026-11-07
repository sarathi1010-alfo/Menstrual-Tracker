import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = constructMetadata({
  title: 'Frequently Asked Questions - LunaCycle',
  description: 'Find answers to common questions about cycle tracking, LunaCycle features, and your privacy.',
  path: '/faq',
});

interface FaqItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const faqsPath = path.join(process.cwd(), 'src/data/faqs.json');
  let faqs: FaqItem[] = [];

  if (fs.existsSync(faqsPath)) {
    const fileContents = fs.readFileSync(faqsPath, 'utf8');
    try {
      const parsed = JSON.parse(fileContents);
      // Map q/a to question/answer if necessary based on data
      faqs = parsed.map((item: unknown) => {
        const obj = item as Record<string, unknown>;
        return {
          question: (obj.question as string) || (obj.q as string) || '',
          answer: (obj.answer as string) || (obj.a as string) || ''
        };
      });
    } catch (e) {
      console.error("Error parsing FAQs:", e);
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {faqs.length > 0 && <SchemaMarkup schema={faqSchema} />}

      <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight sm:text-5xl mb-8 text-center">
        Frequently Asked Questions
      </h1>

      <div className="space-y-8 mt-12 mb-12">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">{faq.question}</h2>
            <p className="text-[var(--muted)]">{faq.answer}</p>
          </div>
        ))}
        {faqs.length === 0 && (
          <p className="text-center text-[var(--muted)]">Check back soon for FAQs!</p>
        )}
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
