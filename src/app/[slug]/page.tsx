import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MDXComponents } from '@/components/MDXComponents';
import { absoluteUrl } from '@/lib/seo';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'what-is')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return {};

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    openGraph: {
      title: article.meta.seoTitle || article.meta.title,
      description: article.meta.seoDescription || article.meta.summary,
      url: absoluteUrl(`/${article.meta.slug}`),
      type: 'article',
    },
  };
}

export default async function WhatIsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

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

  const faqSchema = article.meta.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  } : null;

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose dark:prose-invert">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <MDXRemote
        source={article.content}
        components={MDXComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg my-8 border border-gray-200 dark:border-gray-700">
          <h3 className="mt-0">Core Principles</h3>
          <ul>
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2>Frequently Asked Questions</h2>
          <dl className="space-y-6 mt-6">
            {article.meta.faqs.map((faq, i) => (
              <div key={i}>
                <dt className="font-semibold text-[var(--foreground)]">{faq.question}</dt>
                <dd className="mt-2 text-[var(--muted)]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </article>
  );
}
