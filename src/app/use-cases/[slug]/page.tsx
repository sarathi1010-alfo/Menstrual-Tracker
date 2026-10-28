import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles
    .filter((a) => a.category === 'use-cases')
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.meta.category !== 'use-cases') return {};

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function UseCaseArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
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
    },
  };

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-blue prose-lg">
      <SchemaMarkup schema={articleSchema} />

      <h1>{article.meta.title}</h1>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg not-prose">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Quick Reference</h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-800">
            {article.meta.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MDXRemote
        source={article.content}
        components={MDXComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />

      <MedicalDisclaimer />
    </article>
  );
}
