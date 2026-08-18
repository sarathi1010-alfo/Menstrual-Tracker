import { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { FAQAccordion } from '@/components/FAQAccordion';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about menstrual cycles, tracking, and using LunaCycle.',
  path: '/faq',
});

const commonFaqs = [
  {
    question: "Is my data really private?",
    answer: "Yes, 100%. LunaCycle does not use any cloud servers to store your cycle data. Everything is saved locally on your device's browser using localStorage. We cannot see, sell, or share your data because we never have access to it."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required. Because data is stored locally on your device, you can start tracking immediately without signing up or providing an email address."
  },
  {
    question: "How do I backup my data if it's not in the cloud?",
    answer: "You can easily export your data as a JSON file from the Settings page. If you get a new device or want to keep a secure backup, just export the file and save it somewhere safe. You can then import it back into LunaCycle at any time."
  },
  {
    question: "How accurate are the predictions?",
    answer: "Our algorithm uses simple, rule-based averages (like calculating your average cycle and luteal phase length over your past logs). The more consistently you track, the more accurate the predictions become. However, remember that human bodies are not machines, and variations are completely normal."
  },
  {
    question: "Can I use LunaCycle as a form of contraception?",
    answer: "No. LunaCycle is an educational and tracking tool, NOT a certified contraceptive device. Predictions are estimates and should never be relied upon to prevent pregnancy."
  }
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="heading-1 text-center mb-4">Frequently Asked Questions</h1>
      <p className="text-center text-[var(--muted)] text-lg mb-12">
        Learn more about how LunaCycle works and how we protect your privacy.
      </p>

      <div className="bg-[var(--surface)] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <FAQAccordion faqs={commonFaqs} />
      </div>

      <div className="mt-12">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
