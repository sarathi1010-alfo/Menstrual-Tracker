import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  // only explicitly match specific categories like 'what-is', 'use-cases', 'conditions' for root dynamic routing
  const rootArticles = articles.filter(a => a.category === 'what-is' || a.category === 'use-cases' || a.category === 'conditions');
  return rootArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/${resolvedParams.slug}`,
  });
}

export default async function RootArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Check if it should be under a different path based on category (but Next handles static params above)
  if (article.meta.category !== 'what-is' && article.meta.category !== 'use-cases' && article.meta.category !== 'conditions') {
     notFound(); // Ensure standard blog posts don't leak into root level
  }

  // Build FAQ Schema if faqs exist
  const hasFaqs = article.meta.faqs && article.meta.faqs.length > 0;
  const faqSchema = hasFaqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs!.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="max-w-3xl mx-auto pb-12">
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="mb-8 space-y-4">
        <Link href="/blog" className="text-sm font-medium text-[var(--primary)] hover:underline mb-4 inline-block">
          &larr; Back to Guides
        </Link>
        <h1 className="heading-1">{article.meta.title}</h1>
        {article.meta.summary && (
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            {article.meta.summary}
          </p>
        )}
      </header>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--primary)]/20 p-6 rounded-2xl mb-8">
          <h3 className="font-semibold text-[var(--primary)] mb-3">Key Takeaways</h3>
          <ul className="list-disc list-inside space-y-2 text-[var(--muted)]">
            {article.meta.takeaways.map((takeaway, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: takeaway }} />
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-gray dark:prose-invert max-w-none mt-8">
        <MDXRemote source={article.content} />
      </div>

      {hasFaqs && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs!.map((faq, idx) => (
              <details key={idx} className="group bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-xl p-4 cursor-pointer">
                <summary className="font-medium flex justify-between items-center outline-none">
                  {faq.question}
                  <span className="text-[var(--primary)] group-open:rotate-180 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-[var(--muted)] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      <MedicalDisclaimer />
    </article>
  );
}
