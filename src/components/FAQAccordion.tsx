'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SchemaMarkup } from './SchemaMarkup';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

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
    <div className="my-10">
      <SchemaMarkup schema={faqSchema} />
      <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left bg-[var(--surface)] hover:bg-[var(--background)] transition-colors flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium text-[var(--foreground)]">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-[var(--muted)] flex-shrink-0 ml-4" size={20} />
              ) : (
                <ChevronDown className="text-[var(--muted)] flex-shrink-0 ml-4" size={20} />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-[var(--background)] border-t border-gray-200 dark:border-gray-800">
                <p className="text-[var(--foreground)]">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
