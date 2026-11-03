import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'conditions');
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'conditions') {
    return {
      title: 'Not Found',
    };
  }

  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/conditions/${resolvedParams.slug}`,
  });
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'conditions') {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle,
    "description": article.meta.seoDescription,
    "keywords": article.meta.tags.join(', '),
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      <article className="lg:w-2/3">
        <SchemaMarkup schema={articleSchema} />
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to blog
          </Link>
          <div className="flex gap-2 mb-4 flex-wrap">
            {article.meta.tags.map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
            {article.meta.title}
          </h1>
        </div>

        {article.meta.takeaways && article.meta.takeaways.length > 0 && (
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Quick Reference</h2>
            <ul className="list-disc pl-5 space-y-2">
              {article.meta.takeaways.map((takeaway, index) => (
                <li key={index}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
          <MDXRemote source={article.content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        <MedicalDisclaimer />
      </article>

      <aside className="lg:w-1/3 space-y-8">
        <div className="card p-6 bg-[var(--primary)] text-white shadow-lg sticky top-24">
          <h3 className="text-xl font-bold mb-3">Track Your Symptoms</h3>
          <p className="text-white/80 text-sm mb-6">
            LunaCycle is a 100% private, local-only tracker. Start tracking now to get personalized predictions.
          </p>
          <Link href="/tracker" className="block w-full py-3 bg-white text-[var(--primary)] text-center font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Open Free Tracker
          </Link>
        </div>
      </aside>
    </div>
  );
}
