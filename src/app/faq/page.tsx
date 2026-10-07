import faqsData from '@/data/faqs.json';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'FAQ | LunaCycle',
  description: 'Frequently asked questions about LunaCycle and menstrual cycle tracking.',
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={faqSchema} />

      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="border-b pb-6">
            <h2 className="text-xl font-bold mb-3">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
