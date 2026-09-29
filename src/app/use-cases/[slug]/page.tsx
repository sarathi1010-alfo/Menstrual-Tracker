import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { absoluteUrl } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((a) => a.category === 'use-cases')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') return {};

  return {
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    url: absoluteUrl(`/use-cases/${meta.slug}`),
  };

  const faqSchema = meta.faqs && meta.faqs.length > 0 ? {
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
  } : null;

  return (
    <article className="max-w-3xl mx-auto py-12">
      <SchemaMarkup schema={articleSchema as Record<string, unknown>} />
      {faqSchema && <SchemaMarkup schema={faqSchema as Record<string, unknown>} />}

      <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
      <p className="text-xl text-[var(--muted)] mb-8">{meta.summary}</p>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Quick Reference</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose dark:prose-invert max-w-none mt-8">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
