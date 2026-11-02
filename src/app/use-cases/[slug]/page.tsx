import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((a) => a.category === 'use-cases')
    .map((a) => ({
      slug: a.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    return {
      title: 'Use Case Not Found',
    };
  }

  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/use-cases/${resolvedParams.slug}`,
  });
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.title,
    "description": article.meta.summary,
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SchemaMarkup schema={articleSchema} />

      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to blog
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
          {article.meta.title}
        </h1>

        <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mt-8 mb-10">
          <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
             <Users size={16} className="mr-2" /> Who is this for?
          </h2>
          <p className="text-lg text-[var(--foreground)] leading-relaxed m-0 font-medium">
             {article.meta.summary}
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
        <MDXRemote source={article.content} components={MDXComponents} />
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
