import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { absoluteUrl } from '@/lib/seo';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'what-is')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    return {};
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    alternates: {
      canonical: absoluteUrl(`/${article.meta.slug}`),
    },
  };
}

export default async function MicroAnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "url": absoluteUrl(`/${meta.slug}`),
    "author": {
      "@type": "Organization",
      "name": "LunaCycle",
      "url": absoluteUrl('/')
    }
  };

  const hasFaqs = meta.faqs && meta.faqs.length > 0;
  const faqSchema: Record<string, unknown> | null = hasFaqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": meta.faqs?.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="heading-1 mb-4 text-[var(--primary)]">{meta.title}</h1>
      <p className="text-xl text-gray-800 font-medium mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-[var(--primary)]">{meta.summary}</p>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--secondary)] bg-opacity-20 p-6 rounded-lg mb-8 border border-[var(--secondary)]">
          <h2 className="text-xl font-bold mb-3">Core Principles</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx} className="text-gray-800">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg max-w-none text-gray-800 my-8 prose-a:text-[var(--primary)] hover:prose-a:text-opacity-80 prose-headings:text-gray-900">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            }
          }}
        />
      </div>

      {hasFaqs && (
        <div className="mt-12 border-t pt-8">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs?.map((faq, idx) => (
              <div key={idx} className="border-b pb-4">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
