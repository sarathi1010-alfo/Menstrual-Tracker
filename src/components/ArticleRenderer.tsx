import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Article } from '@/lib/mdx';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export function ArticleRenderer({ article }: { article: Article }) {
  const { meta, content } = article;

  const faqs = meta.faqs || [];
  const takeaways = meta.takeaways || [];

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.seoTitle,
    "description": meta.seoDescription,
    "keywords": meta.tags.join(', '),
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

  const faqSchema: Record<string, unknown> | null = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="max-w-4xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema as Record<string, unknown>} />
      {faqSchema && <SchemaMarkup schema={faqSchema as Record<string, unknown>} />}

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
        {meta.summary && (
          <p className="text-xl text-[var(--muted)] mb-6">{meta.summary}</p>
        )}
      </header>

      {takeaways.length > 0 && (
        <div className="p-6 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl mb-8">
          <h2 className="text-xl font-semibold text-[var(--primary)] mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-6 space-y-2">
            {takeaways.map((takeaway, idx) => (
              <li key={idx} className="text-[var(--foreground)]">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] max-w-none mt-8">
        <MDXRemote source={content} />
      </div>

      {faqs.length > 0 && (
        <div className="mt-12 border-t border-[var(--border)] pt-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)]">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
