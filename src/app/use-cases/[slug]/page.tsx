import React from 'react';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'use-cases');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const article = getArticleBySlug(params.slug);
  if (!article || article.meta.category !== 'use-cases') {
    return { title: 'Not Found' };
  }
  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function UseCasePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = getArticleBySlug(params.slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.summary,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
  };

  let faqSchema = null;
  if (article.meta.faqs && article.meta.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.meta.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <Link href="/blog" className="text-primary hover:underline mb-8 inline-block">
        &larr; Back to blog
      </Link>

      <h1 className="text-4xl font-bold mb-4">{article.meta.title}</h1>

      <article className="prose prose-lg dark:prose-invert mt-8 max-w-none">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, idx) => (
              <div key={idx} className="card p-4">
                <h3 className="font-bold text-lg">{faq.question}</h3>
                <p className="text-muted mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <MedicalDisclaimer />
    </div>
  );
}
