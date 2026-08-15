
import Link from 'next/link';
import { Metadata } from 'next';
import { HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ - LunaCycle Tracking App',
  description: 'Frequently asked questions about LunaCycle period tracker, privacy, calculations, and cycle phases.',
};

export default function FAQPage() {
  const categories = [
    {
      title: "Privacy & Data",
      faqs: [
        {
          q: "Is my data safe?",
          a: "Yes. LunaCycle stores your data 100% locally on your device. We do not have servers, accounts, or databases. Your data never leaves your phone unless you manually export it."
        },
        {
          q: "Can I use LunaCycle without making an account?",
          a: "Absolutely. LunaCycle is designed to be completely account-free. You just open the app and start tracking immediately."
        }
      ]
    },
    {
      title: "Tracking & Predictions",
      faqs: [
        {
          q: "How accurate are the predictions?",
          a: "Predictions are based on your personal cycle history. The more cycles you log, the more accurate the predictions become. We recommend logging at least 3 full cycles for the best results."
        },
        {
          q: "How does it predict my next period?",
          a: "LunaCycle calculates the average length of your past cycles to predict your next period start date."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <HelpCircle size={32} />
        </div>
        <h1 className="heading-1">Frequently Asked Questions</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Find answers to common questions about LunaCycle, tracking, and your privacy.
        </p>
      </header>

      <div className="space-y-8">
        {categories.map((category, idx) => (
          <div key={idx} className="card p-6">
            <h2 className="heading-3 mb-4">{category.title}</h2>
            <div className="space-y-4">
              {category.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-[var(--muted)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-[var(--muted)] mb-4">Still have questions?</p>
        <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-[var(--primary)] text-[var(--primary)] font-semibold rounded-xl hover:bg-[var(--primary)] hover:text-white transition-colors">
          Contact Support <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
