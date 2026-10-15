import { absoluteUrl } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import faqsData from '@/data/faqs.json';

export const metadata = {
  title: 'Frequently Asked Questions - LunaCycle',
  description: 'Find answers to common questions about menstrual cycle tracking, privacy, and how to use LunaCycle.',
  alternates: {
    canonical: absoluteUrl('/faq'),
  },
};

export default function FAQPage() {
  const faqSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SchemaMarkup schema={faqSchema} />
      <h1 className="text-4xl font-bold mb-6 text-[var(--primary)]">Frequently Asked Questions</h1>

      <MedicalDisclaimer />

      <div className="space-y-8 mt-8">
        {faqsData.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">{faq.question}</h2>
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
