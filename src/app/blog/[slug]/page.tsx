import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { constructMetadata, absoluteUrl } from '@/lib/seo';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((a) => a.category === 'cluster' || !a.category) // Default or explicit cluster
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return constructMetadata();

  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/blog/${slug}`,
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { meta, content } = article;

  // Construct schemas
  const schemas: any[] = [];

  // Article Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "url": absoluteUrl(`/blog/${slug}`),
  });

  // FAQ Schema if available
  if (meta.faqs && meta.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": meta.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    });
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      {schemas.map((schema, i) => <SchemaMarkup key={i} schema={schema} />)}

      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{meta.title}</h1>
        <p className="text-xl text-[var(--muted)]">{meta.summary}</p>
      </header>

      <MedicalDisclaimer />

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-6 my-8">
          <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Key Takeaways
          </h3>
          <ul className="space-y-2 list-disc list-inside">
            {meta.takeaways.map((takeaway, i) => (
              <li key={i} className="text-[var(--foreground)]">{takeaway}</li>
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
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, index) => (
              <div key={index} className="bg-[var(--surface)] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
