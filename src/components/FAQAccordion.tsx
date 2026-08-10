'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export function FAQAccordion({ faqs }: { faqs?: { question: string; answer: string }[] }) {
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
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="mt-12">
      <SchemaMarkup schema={faqSchema} />
      <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left font-medium flex justify-between items-center bg-[var(--surface)] hover:bg-[var(--primary)]/5 transition-colors"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-[var(--foreground)]">{faq.question}</span>
                <ChevronDown
                  className={`text-[var(--muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              {isOpen && (
                <div className="px-6 py-4 bg-[var(--surface)]/50 border-t border-gray-200 dark:border-gray-800 text-[var(--muted)]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
