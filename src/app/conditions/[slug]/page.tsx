import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((a) => a.category === 'conditions')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'conditions') {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/conditions/${resolvedParams.slug}`,
  });
}

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'conditions') {
    notFound();
  }

  const hasFaqs = article.meta.faqs && article.meta.faqs.length > 0;


  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.title,
    "description": article.meta.summary,
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  const faqSchema = hasFaqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs?.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="text-4xl font-bold mb-8">{article.meta.title}</h1>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mb-8 border border-blue-100 dark:border-blue-800">
          <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-blue-800 dark:text-blue-200">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <MedicalDisclaimer />

      {hasFaqs && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {article.meta.faqs?.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-800 pb-4">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
