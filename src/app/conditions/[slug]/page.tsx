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
    .filter((article) => article.category === 'conditions')
    .map((article) => ({ slug: article.slug }));
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'conditions') {
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

      <div className="mb-8">
        <MedicalDisclaimer />
      </div>

      <div className="prose prose-lg max-w-none prose-purple mt-8">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mt-8 rounded-r-lg">
          <h2 className="text-lg font-semibold text-purple-900 mb-4">Quick Reference</h2>
          <ul className="list-disc list-inside space-y-2 text-purple-800">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
