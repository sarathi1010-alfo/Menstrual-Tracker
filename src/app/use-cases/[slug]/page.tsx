import { getArticleBySlug, getAllArticles, ArticleMeta } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/use-cases/${slug}`,
  });
}

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'use-cases');
  return articles.map((article: ArticleMeta) => ({
    slug: article.slug,
  }));
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const { meta, content } = article;

  const faqSchema = meta.faqs && meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": meta.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.seoDescription,
  };

  return (
    <article className="max-w-3xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="mb-8">
        <h1 className="heading-1 mb-4">{meta.title}</h1>
        <p className="text-xl text-[var(--muted)]">{meta.summary}</p>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-xl p-6 mb-8">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index} className="text-[var(--foreground)]">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12 space-y-6">
          <h2 className="heading-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {meta.faqs.map((faq, index) => (
              <details key={index} className="card p-4 group">
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
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
