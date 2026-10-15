import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'Frequently Asked Questions - LunaCycle',
  description: 'Answers to common questions about LunaCycle and menstrual health.',
  path: '/faq',
});

export default function FAQPage() {
  const faqs = [
    { question: 'Is my data private?', answer: 'Yes, LunaCycle is entirely private and saves data locally on your device.' },
    { question: 'What does LunaCycle track?', answer: 'LunaCycle tracks cycles, symptoms, flow intensity, and moods.' },
    { question: 'Is LunaCycle a medical device?', answer: 'No, LunaCycle is for educational purposes and is not a medical device.' }
  ];

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
    <div className="max-w-4xl mx-auto space-y-12">
      <SchemaMarkup schema={faqSchema} />
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      <MedicalDisclaimer />
    </div>
  );
}
