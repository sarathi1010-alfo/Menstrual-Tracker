import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MDXComponents } from '@/components/MDXComponents';
import React from 'react';

export async function generateStaticParams() {
  const articles = getAllArticles();
  // Filter for standard blog category
  return articles
    .filter(article => article.category === 'blog' || !article.category)
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || (article.meta.category && article.meta.category !== 'blog')) {
    notFound();
  }

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.summary,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
      url: 'https://lunacycle.alfo.online/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LunaCycle',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lunacycle.alfo.online/logo.png', // Assuming logo path
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lunacycle.alfo.online/blog/${article.meta.slug}`,
    },
  };

  // FAQ Schema if FAQs exist
  let faqSchema = null;
  if (article.meta.faqs && article.meta.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.meta.faqs.map(faq => ({
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
    <article className="max-w-3xl mx-auto px-4 py-8">
      <SchemaMarkup schema={articleSchema as Record<string, unknown>} />
      {faqSchema && <SchemaMarkup schema={faqSchema as Record<string, unknown>} />}

      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          {article.meta.title}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {article.meta.summary}
        </p>
      </header>

      {/* AEO Key Takeaways Box */}
      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-purple-50 rounded-lg p-6 mb-8 border border-purple-100">
          <h2 className="text-lg font-bold text-purple-900 mb-3">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {article.meta.takeaways.map((point, i) => (
              <li key={i} className="text-purple-800">{point}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-purple prose-lg max-w-none mt-8">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            }
          }}
        />
      </div>

      {/* FAQ Section Rendered in UI */}
      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {article.meta.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
