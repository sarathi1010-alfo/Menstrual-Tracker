import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(article => article.category === 'use-cases')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    return constructMetadata({ title: 'Article Not Found' });
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/use-cases/${article.meta.slug}`,
  });
}

export default async function UseCasesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
  };

  return (
    <article className="max-w-3xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema} />

      <header className="mb-10">
        <h1 className="heading-1 mb-4">{meta.title}</h1>
        <div className="text-xl text-[var(--muted)] leading-relaxed">
          {meta.summary}
        </div>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Quick Reference</h2>
          <ul className="list-disc pl-6 space-y-2 text-[var(--foreground)]">
            {meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[var(--foreground)] prose-a:text-[var(--primary)] prose-a:no-underline hover:prose-a:underline">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
