import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { absoluteUrl } from '@/lib/seo';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'conditions')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'conditions') {
    return {};
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    alternates: {
      canonical: absoluteUrl(`/conditions/${article.meta.slug}`),
    },
  };
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'conditions') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "url": absoluteUrl(`/conditions/${meta.slug}`),
    "author": {
      "@type": "Organization",
      "name": "LunaCycle",
      "url": absoluteUrl('/')
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <SchemaMarkup schema={articleSchema} />

      <h1 className="heading-1 mb-4 text-[var(--primary)]">{meta.title}</h1>
      <p className="text-lg text-gray-700 font-medium mb-6">{meta.summary}</p>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--secondary)] bg-opacity-20 p-6 rounded-lg mb-8 border border-[var(--secondary)]">
          <h2 className="text-xl font-bold mb-3">Condition Overview</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx} className="text-gray-800">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg max-w-none text-gray-800 my-8 prose-a:text-[var(--primary)] hover:prose-a:text-opacity-80 prose-headings:text-gray-900">
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
