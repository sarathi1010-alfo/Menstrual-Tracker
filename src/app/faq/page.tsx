
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import faqs from '@/data/faqs.json';

export default function FAQPage() {
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SchemaMarkup schema={faqSchema} />
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <MedicalDisclaimer />

      <div className="space-y-4 mt-8">
        {faqs.map((faq, i) => (
          <details key={i} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <summary className="font-semibold cursor-pointer text-lg">{faq.question}</summary>
            <div className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
