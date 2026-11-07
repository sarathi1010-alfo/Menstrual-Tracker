import { Metadata } from 'next';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { constructMetadata } from '@/lib/seo';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const articles = slugs.map((slug) => ({ slug, article: getArticleBySlug(slug) }));

  // Filter for regular blog categories
  return articles
    .filter(({ article }) => article && article.meta.category !== 'what-is')
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category === 'what-is') {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category === 'what-is') {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.title,
    "description": article.meta.summary,
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  const faqSchema = article.meta.faqs ? {
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
  } : null;

  return (
    <article className="max-w-3xl mx-auto space-y-8 pb-12">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <div className="space-y-4">
        <Link href="/blog" className="text-sm text-[var(--primary)] hover:underline inline-flex items-center gap-1">
          &larr; Back to blog
        </Link>
        <h1 className="heading-1">{article.meta.title}</h1>
        {article.meta.tags && article.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.meta.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <MedicalDisclaimer />

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 p-6 rounded-xl my-8">
          <h2 className="heading-3 mb-4 text-[var(--secondary)]">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 text-[var(--foreground)]">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="heading-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, i) => (
              <div key={i} className="card p-6">
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
