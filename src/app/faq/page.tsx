import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle FAQ - Frequently Asked Questions',
  description: 'Find answers to common questions about LunaCycle, period tracking, data privacy, and menstrual health.',
});

const faqs = [
  {
    question: "Is LunaCycle really private?",
    answer: "Yes. LunaCycle stores all your data locally on your device. We do not require an account, we do not have servers storing your personal health data, and we do not sell your information."
  },
  {
    question: "How do I backup my data?",
    answer: "Currently, because all data is stored locally, it remains on your device. We are working on a secure export feature that will allow you to save a backup file locally to your phone or computer."
  },
  {
    question: "How accurate are the predictions?",
    answer: "LunaCycle uses standard algorithms based on the data you input. The more consistently you log your cycle start and end dates over several months, the more accurate the predictions will become."
  },
  {
    question: "Can LunaCycle help me get pregnant?",
    answer: "LunaCycle can help you track your cycle and identify your potential fertile window based on calendar averages. However, it is not a medical device and should not be used as the sole method for family planning."
  }
];

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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <SchemaMarkup schema={faqSchema} />

      <h1 className="heading-1 mb-6">Frequently Asked Questions</h1>
      <p className="text-lg text-muted mb-10">
        Got questions? We&apos;ve got answers. Learn more about how LunaCycle works and our commitment to your privacy.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="heading-3 mb-3">{faq.question}</h3>
            <p className="text-muted">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
