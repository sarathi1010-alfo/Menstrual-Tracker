import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'conditions');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const articleData = getArticleBySlug(resolvedParams.slug);

  if (!articleData) {
    return { title: 'Deep-Dive Not Found' };
  }

  return {
    title: articleData.meta.seoTitle,
    description: articleData.meta.seoDescription,
  };
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
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
        <span className="inline-block bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
          Health Deep-Dive
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          {meta.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {meta.summary}
        </p>
      </header>

      {/* Prominent Medical Disclaimer for Conditions */}
      <div className="mb-12 shadow-md">
         <MedicalDisclaimer />
      </div>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-l-4 border-teal-500 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Condition Overview</h2>
          <ul className="space-y-4">
             {meta.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-2 w-2 rounded-full bg-teal-500 mt-2"></div>
                  </div>
                  <p className="ml-4 text-gray-700 dark:text-gray-300">{takeaway}</p>
                </li>
             ))}
          </ul>
        </div>
      )}

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
