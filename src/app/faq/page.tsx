import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Find answers to common questions about LunaCycle, our privacy-first approach, and menstrual cycle tracking.',
};

const faqs = [
  {
    question: "Is LunaCycle really free?",
    answer: "Yes, LunaCycle is completely free to use. There are no premium tiers or hidden costs."
  },
  {
    question: "Where is my data stored?",
    answer: "Your data is stored locally on your device within your browser's Local Storage. We do not have servers, and your data never leaves your device."
  },
  {
    question: "How accurate are the predictions?",
    answer: "LunaCycle uses rule-based averages from your logged history to estimate future cycles. The more cycles you log, the more tailored the estimates become. However, it is an estimation and not a guarantee."
  },
  {
    question: "Can I use LunaCycle for birth control?",
    answer: "No. LunaCycle is a tracking and educational tool, not a medical device or a reliable method of contraception."
  }
];

export default function FAQPage() {
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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <SchemaMarkup schema={faqSchema} />
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <MedicalDisclaimer />

      <div className="space-y-6 mt-12">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-3">{faq.question}</h2>
            <p className="text-[var(--muted)]">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
