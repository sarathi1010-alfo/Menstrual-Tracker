import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | LunaCycle',
  description: 'Common questions about LunaCycle period tracker, privacy, local storage, and cycle predictions.',
};

const faqs = [
  {
    question: "How does LunaCycle protect my privacy?",
    answer: "LunaCycle is a 100% private, local-only tracker. All your cycle data is stored exclusively in your browser's local storage. We never collect, sync, or transmit your data to any external servers or third parties."
  },
  {
    question: "Do I need to create an account?",
    answer: "No, you never need to create an account. Because everything is stored locally on your device, there is no need for user accounts, passwords, or emails. You can start tracking immediately."
  },
  {
    question: "What happens if I clear my browser data?",
    answer: "Since LunaCycle uses local storage, clearing your browser data or cache will erase your tracking history. We highly recommend using our data export feature in the Settings page to regularly backup your data locally."
  },
  {
    question: "Can I use LunaCycle offline?",
    answer: "Yes! Because the app relies solely on your local device and doesn't communicate with external servers, all tracking, insights, and predictions work perfectly without an internet connection."
  },
  {
    question: "Is LunaCycle a substitute for medical advice?",
    answer: "No. LunaCycle is designed for educational and informational purposes only. It is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment."
  }
];

export default function FAQPage() {
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
    <div className="max-w-4xl mx-auto space-y-12">
      <SchemaMarkup schema={faqSchema} />

      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <HelpCircle size={32} />
        </div>
        <h1 className="heading-1">Frequently Asked Questions</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Everything you need to know about how LunaCycle works and keeps your data completely private.
        </p>
      </header>

      <MedicalDisclaimer />

      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-xl p-6 cursor-pointer open:ring-2 open:ring-[var(--primary)]/20 shadow-sm">
            <summary className="flex items-center justify-between font-medium text-lg list-none text-[var(--foreground)]">
              {faq.question}
              <ChevronDown size={20} className="text-[var(--muted)] group-open:rotate-180 transition-transform" />
            </summary>
            <div className="mt-4 text-[var(--muted)] leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
