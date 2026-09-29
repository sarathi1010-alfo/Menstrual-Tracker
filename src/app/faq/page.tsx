import { SchemaMarkup } from '@/components/SchemaMarkup';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Frequently Asked Questions - LunaCycle',
  description: 'Common questions and answers about tracking your menstrual cycle with LunaCycle.',
};

export default function FAQPage() {
  const faqsPath = path.join(process.cwd(), 'src/data/faqs.json');
  let faqs = [];

  if (fs.existsSync(faqsPath)) {
    const fileContents = fs.readFileSync(faqsPath, 'utf8');
    faqs = JSON.parse(fileContents);
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: Record<string, string>) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <SchemaMarkup schema={faqSchema as Record<string, unknown>} />

      <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="text-xl text-[var(--muted)] mb-12">
        Find answers to common questions about tracking your menstrual cycle with LunaCycle.
      </p>

      <div className="space-y-8">
        {faqs.map((faq: Record<string, string>, idx: number) => (
          <div key={idx} className="bg-[var(--surface)] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold mb-3">{faq.question}</h2>
            <p className="text-[var(--muted)]">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
