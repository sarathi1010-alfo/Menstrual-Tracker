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
    .filter(a => a.category === 'what-is')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function WhatIsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
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

  const hasFaqs = article.meta.faqs && article.meta.faqs.length > 0;
  const faqSchema: Record<string, unknown> | null = hasFaqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs?.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="text-4xl font-bold mb-6">{article.meta.title}</h1>

      <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mb-8">
        <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
           <BookOpen size={16} className="mr-2" /> Definition
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

      {hasFaqs && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs?.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}