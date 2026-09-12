import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';
import React from 'react';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'use-cases');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article || article.meta.category !== 'use-cases') return {};

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/use-cases/${resolvedParams.slug}`,
  });
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "author": {
      "@type": "Organization",
      "name": "CycleHub"
    }
  };

  return (
    <article className="max-w-3xl mx-auto">
      <SchemaMarkup schema={articleSchema} />

      <header className="mb-8">
        <Link href="/blog" className="text-sm text-[var(--primary)] hover:underline mb-4 inline-block">
          &larr; Back to Guides
        </Link>
        <h1 className="heading-1 mb-4">{meta.title}</h1>
        <p className="text-lg text-[var(--muted)]">{meta.summary}</p>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 p-6 rounded-lg mb-8">
          <h2 className="heading-3 text-[var(--primary)] mb-4">Quick Reference</h2>
          <ul className="list-disc pl-5 space-y-2 text-[var(--muted)]">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-slate max-w-none mt-8 prose-headings:font-semibold prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)]">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            }
          }}
        />
      </div>
    </article>
  );
}
