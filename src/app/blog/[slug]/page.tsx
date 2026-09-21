import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => !article.category || article.category === 'blog')
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.title,
    "description": article.meta.summary,
  };

  const faqSchema = article.meta.faqs ? {
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
    <article className="max-w-3xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="mb-10 text-center">
        <h1 className="heading-1 mb-4">{article.meta.title}</h1>
        <p className="text-xl text-[var(--muted)]">{article.meta.summary}</p>
      </header>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 p-6 rounded-xl mb-8">
          <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
          <ul className="list-disc pl-5 space-y-2">
            {article.meta.takeaways.map((takeaway, idx) => (
              <li key={idx} className="text-[var(--muted)]">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[var(--foreground)] prose-a:text-[var(--primary)]">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[var(--primary)]/10">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {article.meta.faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
