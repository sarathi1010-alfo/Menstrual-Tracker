import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MDXComponents } from '@/components/MDXComponents';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => article.category === 'what-is')
    .map((article) => ({ slug: article.slug }));
}

export default async function WhatIsPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'what-is') {
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
      url: 'https://lunacycle.alfo.online/',
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
    <article className="max-w-3xl mx-auto px-4 py-12">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="text-4xl font-bold mb-6">{article.meta.title}</h1>

      <MedicalDisclaimer />

      <div className="prose prose-lg max-w-none prose-blue mt-8">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8 rounded-r-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Core Principles</h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {article.meta.faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
