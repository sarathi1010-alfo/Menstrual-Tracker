import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import faqs from '@/data/faqs.json';

export const metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Find answers to common questions about menstrual cycle tracking and the LunaCycle app.',
};

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
    <div className="max-w-3xl mx-auto prose dark:prose-invert">
      <SchemaMarkup schema={faqSchema} />
      <h1 className="heading-1 mb-8">Frequently Asked Questions</h1>
      <p className="lead text-lg text-[var(--muted)] mb-8">
        Find answers to common questions about menstrual cycle tracking, privacy, and using the LunaCycle app.
      </p>

      <MedicalDisclaimer />

      <div className="space-y-6 mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[var(--surface)] border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
            <h3 className="heading-3 mt-0 mb-3">{faq.question}</h3>
            <p className="mb-0 text-[var(--muted)]">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
