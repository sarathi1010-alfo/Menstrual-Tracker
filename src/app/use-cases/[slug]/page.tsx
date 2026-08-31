import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'use-cases');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) return { title: 'Not Found' };
  return { title: article.meta.seoTitle, description: article.meta.seoDescription };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') notFound();

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle,
    "description": article.meta.seoDescription,
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <SchemaMarkup schema={articleSchema} />
      <h1 className="text-4xl font-bold mb-6">{article.meta.title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{article.meta.summary}</p>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8 border border-blue-100 dark:border-blue-800">
            <h2 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-100">Quick Reference</h2>
            <ul className="list-disc pl-5 space-y-2 text-blue-800 dark:text-blue-200">
              {article.meta.takeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert max-w-none mt-8">
        <MDXRemote source={article.content} />
      </div>
    </div>
  );
}
