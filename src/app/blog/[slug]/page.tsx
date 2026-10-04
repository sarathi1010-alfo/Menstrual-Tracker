import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { siteConfig } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => !a.category || a.category === 'blog');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return {};
  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || (article.meta.category && article.meta.category !== 'blog')) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.summary,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  let faqSchema = null;
  if (article.meta.faqs && article.meta.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.meta.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="heading-1 mb-4">{article.meta.title}</h1>
      <p className="text-xl text-[var(--muted)] mb-8">{article.meta.summary}</p>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--secondary)]/10 p-6 rounded-xl mb-8">
          <h2 className="heading-3 mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-6 space-y-2">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, i) => (
              <details key={i} className="group border rounded-lg p-4 bg-[var(--surface)]">
                <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                <div className="mt-2 text-[var(--muted)]">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
