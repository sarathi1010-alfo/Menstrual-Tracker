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
    .filter((a) => a.category === 'conditions')
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
    path: `/conditions/${slug}`,
  });
}

export default async function ConditionArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { meta, content } = article;

  const schemas: any[] = [];

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "url": absoluteUrl(`/conditions/${slug}`),
  });

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
            Quick Reference
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
    </article>
  );
}
