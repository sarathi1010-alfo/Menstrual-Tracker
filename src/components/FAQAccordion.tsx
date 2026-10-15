'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '@/lib/mdx';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="my-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-[var(--surface)] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-[var(--muted)] flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown size={20} className="text-[var(--muted)] flex-shrink-0 ml-4" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 text-[var(--foreground)]">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
