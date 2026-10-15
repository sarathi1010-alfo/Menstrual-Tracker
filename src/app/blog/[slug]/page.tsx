import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return {};

  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/blog/${article.meta.slug}`,
  });
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => !article.category || article.category === 'blog')
    .map((article) => ({
      slug: article.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || (article.meta.category && article.meta.category !== 'blog')) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.seoTitle,
    description: article.meta.seoDescription,
  };

  const faqSchema = article.meta.faqs ? {
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
  } : null;

  return (
    <article className="max-w-3xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="heading-1 mb-6">{article.meta.title}</h1>

      <div className="text-xl text-[var(--muted)] mb-8">
        {article.meta.summary}
      </div>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 p-6 rounded-lg mb-8">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-[var(--foreground)]">
            {article.meta.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, index) => (
              <details key={index} className="group border border-[var(--border)] rounded-lg p-4 cursor-pointer">
                <summary className="font-medium text-lg flex justify-between items-center list-none">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="mt-3 text-[var(--muted)]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
