import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MDXComponents } from '@/components/MDXComponents';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => article.category === 'use-cases')
    .map((article) => ({ slug: article.slug }));
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.summary,
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <SchemaMarkup schema={articleSchema} />

      <h1 className="text-4xl font-bold mb-4">{article.meta.title}</h1>
      <p className="text-xl text-gray-600 mb-8">{article.meta.summary}</p>

      <MedicalDisclaimer />

      <div className="prose prose-lg max-w-none prose-green mt-8">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-8 rounded-r-lg">
          <h2 className="text-lg font-semibold text-green-900 mb-4">Quick Reference</h2>
          <ul className="list-disc list-inside space-y-2 text-green-800">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
