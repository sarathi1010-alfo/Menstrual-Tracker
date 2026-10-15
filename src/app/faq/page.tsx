import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { FAQAccordion } from '@/components/FAQAccordion';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Find answers to common questions about menstrual cycle tracking, privacy, and how to use LunaCycle.',
};

const generalFaqs = [
  {
    question: "Is LunaCycle really free?",
    answer: "Yes, LunaCycle is completely free to use. There are no premium features hidden behind a paywall."
  },
  {
    question: "Do I need to create an account?",
    answer: "No! LunaCycle is designed to be fully functional without an account. We don't ask for your email, name, or any identifying information."
  },
  {
    question: "Where is my data stored?",
    answer: "All your data is stored locally on your device (in your browser's local storage). It is never sent to our servers, sold to third parties, or shared."
  },
  {
    question: "What happens if I clear my browser data?",
    answer: "Because your data is stored in your browser, clearing your site data will delete your tracking history. We highly recommend using the 'Export Data' feature in settings to keep a backup."
  },
  {
    question: "Is LunaCycle a medical device?",
    answer: "No, LunaCycle is an educational and tracking tool. It is not intended to diagnose, treat, or prevent any medical condition, nor is it a reliable form of contraception."
  }
];

export default function FAQPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": generalFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <SchemaMarkup schema={pageSchema} />
      <h1 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h1>
      <p className="text-[var(--muted)] text-center mb-8">
        Learn more about how LunaCycle works and how we protect your privacy.
      </p>

      <MedicalDisclaimer />

      <FAQAccordion faqs={generalFaqs} />
    </div>
  );
}
