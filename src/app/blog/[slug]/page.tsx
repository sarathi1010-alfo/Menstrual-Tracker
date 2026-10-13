import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((a) => !a.category || a.category === 'cluster')
    .map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article || (article.meta.category && article.meta.category !== 'cluster')) return {};

  return {
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || (article.meta.category && article.meta.category !== 'cluster')) {
    notFound();
  }

  const hasFaqs = article.meta.faqs && article.meta.faqs.length > 0;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.title,
    "description": article.meta.summary,
  };

  const faqSchema = hasFaqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs?.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="max-w-3xl mx-auto">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="mb-8">
        <h1 className="heading-1 mb-4">{article.meta.title}</h1>
        <p className="text-xl text-[var(--muted)]">{article.meta.summary}</p>
      </header>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--surface)] border-2 border-[var(--primary)]/20 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="heading-3 mb-4 text-[var(--foreground)]">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-[var(--muted)]">
            {article.meta.takeaways.map((takeaway, idx) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {hasFaqs && (
        <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {article.meta.faqs?.map((faq, idx) => (
              <div key={idx} className="bg-[var(--surface)] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="heading-3 mb-2 text-lg">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
