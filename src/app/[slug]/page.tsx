import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BookOpen, CheckCircle } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const allArticles = getAllArticles();

  return allArticles
    .filter(a => a.category === 'what-is')
    .map(a => ({ slug: a.slug }));
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
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    openGraph: {
      title: article.meta.seoTitle,
      description: article.meta.seoDescription,
      type: 'article',
      tags: article.meta.tags,
    }
  };
}

export default async function WhatIsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
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
    },
    "publisher": {
      "@type": "Organization",
      "name": "LunaCycle",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lunacycle.alfo.online/logo.png"
      }
    }
  };

  let faqSchema = null;
  if (article.meta.faqs && article.meta.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.meta.faqs.map(faq => ({
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
    <div className="max-w-3xl mx-auto">
      <SchemaMarkup schema={articleSchema as Record<string, unknown>} />
      {faqSchema && <SchemaMarkup schema={faqSchema as Record<string, unknown>} />}

      <div className="mb-8">
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

        <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mt-8 mb-6">
          <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
             <BookOpen size={16} className="mr-2" /> Definition
          </h2>
          <p className="text-lg text-[var(--foreground)] leading-relaxed m-0 font-medium">
             {article.meta.summary}
          </p>
        </div>

        {article.meta.takeaways && article.meta.takeaways.length > 0 && (
          <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center">
              Core Principles
            </h2>
            <ul className="space-y-2">
              {article.meta.takeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={18} className="mr-2 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <MedicalDisclaimer />
      </div>

      <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
        <MDXRemote source={article.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-5">
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
