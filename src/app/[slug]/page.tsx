import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { absoluteUrl, constructMetadata, siteConfig } from '@/lib/seo';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => article.category === 'what-is')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) return {};

  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/${article.meta.slug}`,
  });
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
    "headline": article.meta.title,
    "description": article.meta.summary,
    "image": absoluteUrl('/og-image.png'),
    "author": {
      "@type": "Organization",
      "name": siteConfig.name
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": absoluteUrl('/icon.png')
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": absoluteUrl(`/${article.meta.slug}`)
    }
  };

  const faqSchema = article.meta.faqs && article.meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="heading-1 mb-4">{article.meta.title}</h1>
      <p className="text-xl text-[var(--muted)] mb-8">{article.meta.summary}</p>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 p-6 rounded-lg mb-8">
          <h2 className="heading-3 text-[var(--primary)] mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {article.meta.takeaways.map((takeaway, index) => (
              <li key={index} className="text-[var(--foreground)]">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            }
          }}
        />
      </article>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12 border-t border-[var(--border)] pt-8">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="heading-4 mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
