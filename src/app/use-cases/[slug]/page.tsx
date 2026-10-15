import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { mdxComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'use-cases')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    return { title: 'Not Found' };
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle || article.meta.title,
    "description": article.meta.seoDescription || article.meta.summary,
    "author": { "@type": "Organization", "name": "LunaCycle" },
    "publisher": { "@type": "Organization", "name": "LunaCycle" }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <SchemaMarkup schema={articleSchema} />

      <h1 className="text-4xl font-bold mb-6">{article.meta.title}</h1>

      <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mb-8">
        <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
           <BookOpen size={16} className="mr-2" /> Overview
        </h2>
        <p className="text-lg font-medium">{article.meta.summary}</p>
      </div>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="p-5 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/20 shadow-sm mb-8">
          <h2 className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider mb-2">Key Takeaways</h2>
          <ul className="list-disc pl-5 m-0 text-[var(--muted)] space-y-2">
            {article.meta.takeaways.map((takeaway, idx) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
        <MDXRemote source={article.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>
    </div>
  );
}