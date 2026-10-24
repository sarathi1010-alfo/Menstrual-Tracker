import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

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

  if (!article) {
    return constructMetadata({
      title: 'Article Not Found',
    });
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/${article.meta.slug}`,
  });
}

export default async function MicroAnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

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
  } : {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": article.meta.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": article.meta.summary
      }
    }]
  };

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <SchemaMarkup schema={faqSchema} />

      <header className="mb-8">
        <h1 className="heading-1 mb-4">{article.meta.title}</h1>
        {article.meta.summary && (
          <div className="bg-[var(--primary)]/10 p-6 rounded-xl mb-8">
             <p className="text-lg font-medium text-[var(--foreground)]">{article.meta.summary}</p>
          </div>
        )}
      </header>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="heading-2 mb-6">Related Questions</h2>
          <div className="space-y-6">
            {article.meta.faqs.map((faq, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="heading-3 mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <MedicalDisclaimer />
    </article>
  );
}
