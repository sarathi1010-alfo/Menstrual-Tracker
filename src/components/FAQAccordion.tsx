'use client';

import React, { useState } from 'react';
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

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    <div className="my-8">
      <SchemaMarkup schema={faqSchema} />
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <button
              className="w-full text-left p-4 flex justify-between items-center bg-[var(--surface)] hover:bg-[var(--secondary)]/5 transition-colors focus:outline-none"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`transform transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180 text-[var(--primary)]' : 'text-[var(--muted)]'
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 bg-[var(--background)] border-t border-gray-200 dark:border-gray-800">
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
