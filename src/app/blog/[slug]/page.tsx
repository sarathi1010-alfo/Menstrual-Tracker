import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  const filtered = articles.filter(a => a.category === 'blog');
  return filtered.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articleData = getArticleBySlug(slug);

  if (!articleData) {
    return { title: 'Article Not Found' };
  }

  const { meta } = articleData;
  const prefix = 'blog';
  const path = prefix ? `/${prefix}/${slug}` : `/${slug}`;

  return {
    title: meta.seoTitle || meta.title,
    description: meta.seoDescription || meta.summary,
    alternates: { canonical: absoluteUrl(path) },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articleData = getArticleBySlug(slug);

  if (!articleData) {
    notFound();
  }

  const { meta, content } = articleData;
  const prefix = 'blog';
  const path = prefix ? `/${prefix}/${slug}` : `/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "author": { "@type": "Organization", "name": "LunaCycle" },
    "url": absoluteUrl(path)
  };

  const faqSchema = meta.faqs && meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": meta.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  return (
    <article className="max-w-3xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <nav className="flex items-center space-x-2 text-sm text-[var(--muted)] mb-8">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center">
          <Home size={14} className="mr-1" /> Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">Blog</Link>
        <ChevronRight size={14} />
        <span className="text-[var(--foreground)] truncate max-w-[200px] sm:max-w-xs">{meta.title}</span>
      </nav>

      <header className="mb-10 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{meta.title}</h1>
        {meta.summary && <p className="text-xl text-[var(--muted)] leading-relaxed">{meta.summary}</p>}
      </header>

      <MedicalDisclaimer />

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-[var(--primary)] mb-4 flex items-center gap-2">Key Takeaways</h2>
          <ul className="space-y-2 list-disc list-inside">
            {meta.takeaways.map((takeaway, i) => (
              <li key={i} className="text-sm md:text-base text-[var(--foreground)]">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-emerald dark:prose-invert max-w-none">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, i) => (
              <div key={i} className="space-y-2">
                <h3 className="font-bold text-lg">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:underline">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    </article>
  );
}
