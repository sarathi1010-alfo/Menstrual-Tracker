import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'LunaCycle FAQ - Frequently Asked Questions',
  description: 'Find answers to common questions about menstrual tracking, fertility, and using the LunaCycle app.',
};

export default function FAQPage() {
  const faqsPath = path.join(process.cwd(), 'src/data/faqs.json');
  let faqs = [];
  try {
    const fileContents = fs.readFileSync(faqsPath, 'utf8');
    faqs = JSON.parse(fileContents);
  } catch (e) {
    console.error('Failed to load FAQs', e);
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: { question: string, answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={faqSchema} />
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h1>

      <MedicalDisclaimer />

      <div className="space-y-6 mt-12">
        {faqs.map((faq: { question: string, answer: string }, idx: number) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
