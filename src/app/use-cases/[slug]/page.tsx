import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'use-cases');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const articleData = getArticleBySlug(resolvedParams.slug);

  if (!articleData) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: articleData.meta.seoTitle,
    description: articleData.meta.seoDescription,
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
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
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={articleSchema} />

      <header className="mb-10 text-center">
        <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
          Audience Guide
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          {meta.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {meta.summary}
        </p>
      </header>

      <MedicalDisclaimer />

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4 dark:border-gray-700">Quick Reference Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {meta.takeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <p className="ml-3 text-gray-700 dark:text-gray-300">{takeaway}</p>
                </div>
             ))}
          </div>
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
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
