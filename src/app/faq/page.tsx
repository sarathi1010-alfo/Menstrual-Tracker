import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Common questions and answers about LunaCycle, period tracking, and privacy.',
};

export default function FAQPage() {
  const faqsPath = path.join(process.cwd(), 'src/data/faqs.json');
  const faqs = JSON.parse(fs.readFileSync(faqsPath, 'utf8'));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <SchemaMarkup schema={faqSchema} />

      <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-8">
        Frequently Asked Questions
      </h1>

      <MedicalDisclaimer />

      <div className="space-y-8 mt-12">
        {faqs.map((faq: { question: string; answer: string }, index: number) => (
          <div key={index} className="bg-[var(--surface)] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-3">{faq.question}</h2>
            <p className="text-[var(--muted)]">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
