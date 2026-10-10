import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { absoluteUrl } from '@/lib/seo';

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

  if (!article || article.meta.category !== 'conditions') {
    return {};
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    alternates: {
      canonical: absoluteUrl(`/conditions/${slug}`),
    }
  };
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'conditions') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <SchemaMarkup schema={articleSchema} />

      <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">
        {meta.title}
      </h1>

      <p className="text-xl text-[var(--muted)] mb-8">
        {meta.summary}
      </p>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--primary)]/20 p-6 rounded-xl mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--primary)] mb-4">Condition Overview</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, i) => (
              <li key={i} className="text-[var(--foreground)]">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert prose-a:text-[var(--primary)] max-w-none">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
