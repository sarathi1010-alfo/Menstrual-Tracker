import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata, absoluteUrl } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = getArticleBySlug(resolvedParams.slug);

  if (!guide) {
    return {};
  }

  return constructMetadata({
    title: guide.meta.seoTitle,
    description: guide.meta.seoDescription,
    path: `/blog/${resolvedParams.slug}`,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const guide = getArticleBySlug(resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  const { meta, content } = guide;

  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.seoTitle,
    description: meta.seoDescription,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
    url: absoluteUrl(`/blog/${resolvedParams.slug}`),
  };

  const faqSchema: Record<string, unknown> | null =
    meta.faqs && meta.faqs.length > 0
      ? {
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
        }
      : null;

  return (
    <article className="max-w-3xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <div className="space-y-4 mb-8">
        <h1 className="heading-1">{meta.title}</h1>
        {meta.summary && (
          <p className="text-xl text-[var(--muted)] leading-relaxed">
            {meta.summary}
          </p>
        )}
      </div>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-6 mb-8">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 text-[var(--muted)]">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8">
        <MedicalDisclaimer />
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="heading-3 mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <MedicalDisclaimer />
      </div>
    </article>
  );
}
