import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const articles = slugs.map((slug) => getArticleBySlug(slug)).filter(Boolean);
  return articles
    .filter((a) => a!.meta.category === 'what-is')
    .map((a) => ({ slug: a!.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) return { title: 'Not Found' };

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/${resolvedParams.slug}`,
  });
}

export default async function WhatIsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.title,
    "description": article.meta.summary,
    "author": { "@type": "Organization", "name": "LunaCycle" },
  };

  const faqSchema = article.meta.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to blog
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{article.meta.title}</h1>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={article.content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      {article.meta.faqs && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, i) => (
              <div key={i} className="card p-4">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <p className="mt-2 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <MedicalDisclaimer />
    </article>
  );
}
