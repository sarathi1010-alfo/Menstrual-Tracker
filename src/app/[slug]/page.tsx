import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { absoluteUrl } from '@/lib/seo';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import remarkGfm from 'remark-gfm';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((a) => a.category === 'what-is')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    openGraph: {
      title: article.meta.seoTitle || article.meta.title,
      description: article.meta.seoDescription || article.meta.summary,
      url: absoluteUrl(`/${slug}`),
    },
  };
}

export default async function WhatIsArticle({ params }: Props) {
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
      url: absoluteUrl('/'),
    },
  };

  const hasFaqs = article.meta.faqs && article.meta.faqs.length > 0;
  const faqSchema = hasFaqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.meta.faqs?.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    }))
  } : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <Link href="/blog" className="text-pink-600 hover:underline mb-4 inline-block">
        &larr; Back to blog
      </Link>

      <article className="prose prose-pink lg:prose-lg max-w-none">
        <h1>{article.meta.title}</h1>

        {article.meta.takeaways && article.meta.takeaways.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg my-8">
            <h2 className="text-xl font-bold mt-0 mb-4">Key Takeaways</h2>
            <ul className="mb-0">
              {article.meta.takeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}

        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />

        {hasFaqs && (
          <div className="mt-12">
            <h2>Frequently Asked Questions</h2>
            {article.meta.faqs?.map((faq, idx) => (
              <details key={idx} className="group border-b border-gray-200 py-4">
                <summary className="flex cursor-pointer items-center justify-between font-semibold">
                  {faq.question}
                </summary>
                <div className="mt-2 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        )}

        <MedicalDisclaimer />
      </article>
    </div>
  );
}
