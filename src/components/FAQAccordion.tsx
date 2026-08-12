'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SchemaMarkup } from './SchemaMarkup';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

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

  return (
    <div className="mt-12">
      <SchemaMarkup schema={faqSchema} />
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
            <button
              className="w-full text-left p-4 font-semibold text-[var(--foreground)] bg-[var(--surface)] hover:bg-[var(--secondary)]/10 transition-colors flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 text-[var(--muted)] bg-[var(--background)] border-t border-gray-200 dark:border-gray-800">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
