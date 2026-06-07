import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import seoData from '@/data/pSeoData.json';
import { CycleCalendar } from '@/components/CycleCalendar';
import { PredictionCard } from '@/components/PredictionCard';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { RelatedToolsWidget } from '@/components/RelatedToolsWidget';
import { constructMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seoData.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const pageData = seoData.find((p) => p.slug === resolvedParams.slug);

  if (!pageData) {
    return {};
  }

  return constructMetadata({
    title: pageData.title,
    description: pageData.description,
    path: `/tools/${pageData.slug}`,
  });
}

export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params;
  const pageData = seoData.find((p) => p.slug === resolvedParams.slug);

  if (!pageData) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageData.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="space-y-12">
      <SchemaMarkup schema={faqSchema} />

      <section className="max-w-3xl mx-auto text-center space-y-6 pt-8">
        <h1 className="heading-1 text-[var(--primary)]">{pageData.h1}</h1>
        <p className="text-lg text-[var(--muted)] leading-relaxed">
          {pageData.intro}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-start my-12 p-6 bg-[var(--surface)] rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="space-y-6">
          <h2 className="heading-3 mb-4">Try the Tool</h2>
          <PredictionCard />
        </div>
        <div className="flex justify-center">
          <div className="transform scale-90 origin-top w-full">
            <CycleCalendar />
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto space-y-8 pb-12 border-b border-gray-200 dark:border-gray-800">
        <h2 className="heading-2">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {pageData.faq.map((item, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-lg text-[var(--foreground)]">{item.question}</h3>
              <p className="text-[var(--muted)]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedToolsWidget />
    </div>
  );
}
