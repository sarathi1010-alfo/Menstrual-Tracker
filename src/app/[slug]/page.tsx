import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(article => article.category === 'what-is')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'what-is') {
    return {};
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function WhatIsArticle({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    url: `https://lunacycle.alfo.online/${slug}`,
  };

  let faqSchema = null;
  if (meta.faqs && meta.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faqs.map((faq) => ({
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
    <article className="max-w-3xl mx-auto prose dark:prose-invert">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="heading-1 mb-4">{meta.title}</h1>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--surface)] border border-gray-200 dark:border-gray-800 p-6 rounded-lg mb-8">
          <h2 className="heading-3 mt-0 mb-4">Core Principles</h2>
          <ul className="mb-0">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          }
        }}
      />

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="heading-2">Frequently Asked Questions</h2>
          <div className="space-y-4 mt-6">
            {meta.faqs.map((faq, index) => (
              <details key={index} className="group bg-[var(--surface)] border border-gray-200 dark:border-gray-800 p-4 rounded-lg">
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="mt-4 text-[var(--muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
