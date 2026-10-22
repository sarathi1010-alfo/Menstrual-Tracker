import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata, absoluteUrl } from '@/lib/seo';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((a) => a.category === 'cluster' || a.category === 'pillar' || !a.category)
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/blog/${article.meta.slug}`,
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || (article.meta.category && !['cluster', 'pillar'].includes(article.meta.category))) {
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
    },
    "url": absoluteUrl(`/blog/${article.meta.slug}`)
  };

  const faqSchema = article.meta.faqs && article.meta.faqs.length > 0 ? {
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
    <article className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="space-y-4 text-center pb-8 border-b border-[var(--border)]">
        <h1 className="heading-1">{article.meta.title}</h1>
        <p className="text-lg text-[var(--muted)]">{article.meta.summary}</p>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {article.meta.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-6 my-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-[var(--primary)]">✨</span> Key Takeaways
          </h3>
          <ul className="space-y-2">
            {article.meta.takeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                <span className="text-[var(--primary)] mt-1">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-a:text-[var(--primary)] hover:prose-a:text-[var(--primary)]/80 prose-headings:scroll-mt-20">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <MedicalDisclaimer />

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <section className="mt-12 pt-8 border-t border-[var(--border)]">
          <h2 className="heading-3 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, index) => (
              <div key={index} className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)] text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
