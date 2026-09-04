import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'what-is');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const articleData = getArticleBySlug(resolvedParams.slug);

  if (!articleData) {
    return { title: 'Not Found' };
  }

  return {
    title: articleData.meta.seoTitle,
    description: articleData.meta.seoDescription,
  };
}

export default async function WhatIsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articleData = getArticleBySlug(resolvedParams.slug);

  if (!articleData) {
    notFound();
  }

  const { meta, content } = articleData;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.seoTitle,
    "description": meta.seoDescription,
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={articleSchema} />

      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          {meta.title}
        </h1>
        <div className="bg-[var(--primary)]/10 border-l-4 border-[var(--primary)] p-5 rounded-r-lg">
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100 m-0">
            {meta.summary}
          </p>
        </div>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wider text-gray-500 dark:text-gray-400 text-sm">
            Core Principles
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx} className="text-gray-700 dark:text-gray-300">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert max-w-none">
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
