import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'what-is');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
  };
}

export default async function MicroAnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle,
    "description": article.meta.seoDescription,
  };

  const faqSchema = article.meta.faqs && article.meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <article>
        <SchemaMarkup schema={articleSchema} />
        {faqSchema && <SchemaMarkup schema={faqSchema} />}

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[var(--foreground)]">
          {article.meta.title}
        </h1>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-8">
          <p className="text-xl font-medium m-0">
             {article.meta.summary}
          </p>
        </div>

        {article.meta.takeaways && article.meta.takeaways.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8 border border-blue-100 dark:border-blue-800">
            <h2 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-100">Core Principles</h2>
            <ul className="list-disc pl-5 space-y-2 text-blue-800 dark:text-blue-200">
              {article.meta.takeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}

        <MedicalDisclaimer />

        <div className="prose prose-lg dark:prose-invert max-w-none mt-8">
          <MDXRemote source={article.content} />
        </div>
      </article>
    </div>
  );
}
