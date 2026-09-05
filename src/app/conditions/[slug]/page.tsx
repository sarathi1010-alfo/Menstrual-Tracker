import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { mdxComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(
    (article) => article.category === 'conditions'
  );
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return constructMetadata({ title: 'Not Found' });
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/conditions/${article.meta.slug}`,
  });
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
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
    <div className="max-w-3xl mx-auto space-y-8">
      <SchemaMarkup schema={articleSchema as Record<string, unknown>} />
      {faqSchema && <SchemaMarkup schema={faqSchema as Record<string, unknown>} />}

      <h1 className="heading-1">{meta.title}</h1>

      <p className="text-xl text-[var(--muted)]">{meta.summary}</p>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="card p-6 bg-[var(--primary)]/5 border-[var(--primary)]/20">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index} className="text-[var(--foreground)]">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-p:text-[var(--foreground)] prose-headings:text-[var(--foreground)] prose-a:text-[var(--primary)] max-w-none">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            }
          }}
        />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12 space-y-6">
          <h2 className="heading-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {meta.faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="heading-3 mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
