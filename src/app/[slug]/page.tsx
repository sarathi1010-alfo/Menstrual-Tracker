import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const validSlugs = [];

  for (const slug of slugs) {
    const article = getArticleBySlug(slug);
    // Explicit top level routes are typically micro-answers starting with 'what-is-'
    if (article && article.meta.category === 'what-is') {
      validSlugs.push({ slug });
    }
  }

  return validSlugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    return constructMetadata({ title: 'Not Found' });
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/${resolvedParams.slug}`,
  });
}

export default async function WhatIsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  const { meta, content } = article;

  let faqSchema = null;
  if (meta.faqs && meta.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": meta.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">Blog</Link>
          <span>/</span>
          <span>Micro-Answer</span>
        </div>
        <h1 className="heading-1">{meta.title}</h1>
        <div className="text-xl text-[var(--muted)] leading-relaxed font-medium bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
          <p>{meta.summary}</p>
        </div>
      </header>

      <MedicalDisclaimer />

      <div className="prose prose-gray dark:prose-invert max-w-none mt-8">
        <MDXRemote source={content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <MedicalDisclaimer />
      </div>
    </article>
  );
}
