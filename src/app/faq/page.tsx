import { SchemaMarkup } from '@/components/SchemaMarkup';
import Link from 'next/link';
import { HelpCircle, Shield, Calendar, Heart } from 'lucide-react';

import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Frequently Asked Questions - LunaCycle Period Tracker Help',
  description: 'Get answers to common questions about LunaCycle period tracker. Learn how to track your cycle, data privacy, predictions, and more in our FAQ.',
  path: '/faq',
});

const faqCategories = [
  {
    title: 'Privacy & Security',
    icon: <Shield className="text-purple-500" size={20} />,
    questions: [
      {
        q: 'Is my data secure?',
        a: 'Yes. We built LunaCycle with a strict privacy-first architecture. Your data is stored locally on your device using your browser\'s local storage. We do not have servers, databases, or accounts. Your information never leaves your device.'
      },
      {
        q: 'Can anyone else see my logs?',
        a: 'No. Since the data is stored in your browser on your specific device, only someone with physical access to your device and browser could see it. We recommend using your device\'s built-in security features (passcode, biometric lock).'
      }
    ]
  },
  {
    title: 'Tracking & Accuracy',
    icon: <Calendar className="text-blue-500" size={20} />,
    questions: [
      {
        q: 'How do I track my period?',
        a: 'Navigate to the Tracker page and tap the date on the calendar when your period started. The app will automatically calculate your cycle length based on the distance between your logged dates.'
      },
      {
        q: 'How is my next period predicted?',
        a: 'We look at your past logged periods to determine your average cycle length (excluding extreme outliers). We then add this average to your most recent period\'s start date to predict when your next one will begin.'
      }
    ]
  },
  {
    title: 'Health & Fertility',
    icon: <Heart className="text-rose-500" size={20} />,
    questions: [
      {
        q: 'Can I use this for birth control?',
        a: 'No. LunaCycle is designed for educational and tracking purposes only. The fertile window estimations are based on standard calendar calculations, which are not reliable enough to prevent pregnancy. Please consult with a healthcare professional for reliable contraception methods.'
      },
      {
        q: 'How does it calculate the fertile window?',
        a: 'We use the standard calendar method, estimating ovulation approximately 14 days before your next predicted period, with a 6-day fertile window leading up to it.'
      }
    ]
  }
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(cat => cat.questions).map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <SchemaMarkup schema={faqSchema} />
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <HelpCircle size={32} />
        </div>
        <h1 className="heading-1">Frequently Asked Questions</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Everything you need to know about tracking your cycle with LunaCycle.
        </p>
      </header>

      <div className="grid gap-12">
        {faqCategories.map((category, idx) => (
          <section key={idx} className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
              {category.icon}
              {category.title}
            </h2>
            <div className="grid gap-6">
              {category.questions.map((faq, qIdx) => (
                <div key={qIdx} className="card p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                  <p className="text-[var(--muted)] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="card p-8 bg-[var(--secondary)]/10 border-[var(--secondary)]/20 text-center">
        <h3 className="heading-3 mb-4">Still have questions?</h3>
        <p className="text-[var(--muted)] mb-6">
          We&apos;re here to help you navigate your cycle tracking journey.
        </p>
        <Link href="/contact" className="inline-block px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
          Contact Support
        </Link>
      </div>

      {/* Quick Access to Tools */}
      <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="heading-3 mb-6">Free Cycle Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/tools/next-period-predictor" className="card p-5 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-base mb-1 group-hover:text-[var(--primary)] transition-colors">Next Period Predictor</h3>
            <p className="text-sm text-[var(--muted)]">Predict your next period date instantly.</p>
          </Link>
          <Link href="/tools/safe-days-calculator" className="card p-5 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-base mb-1 group-hover:text-[var(--primary)] transition-colors">Safe Days Calculator</h3>
            <p className="text-sm text-[var(--muted)]">Calculate safe days and fertile window.</p>
          </Link>
          <Link href="/tools/ovulation-calculator" className="card p-5 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-base mb-1 group-hover:text-[var(--primary)] transition-colors">Ovulation Calculator</h3>
            <p className="text-sm text-[var(--muted)]">Find your most fertile days.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
