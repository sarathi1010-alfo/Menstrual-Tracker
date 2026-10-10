import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { constructMetadata, absoluteUrl } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  // Filter out the routes that are meant for other top-level or specific routes
  const filteredSlugs = slugs.filter((slug) => {
    const article = getArticleBySlug(slug);
    if (!article) return false;
    const cat = article.meta.category;
    return cat !== 'what-is' && cat !== 'use-cases' && cat !== 'conditions';
  });

  return filteredSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/blog/${resolvedParams.slug}`,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "url": absoluteUrl(`/blog/${resolvedParams.slug}`),
    "publisher": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  let faqSchema = null;
  if (meta.faqs && meta.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": meta.faqs.map((faq) => ({
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
    <article className="max-w-3xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="mb-8 space-y-4">
        <div className="flex gap-2 text-sm text-[var(--primary)] font-medium">
          {meta.tags?.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-[var(--primary)]/10 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="heading-1">{meta.title}</h1>
        <p className="text-xl text-[var(--muted)] leading-relaxed">{meta.summary}</p>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
             <span className="w-1.5 h-6 bg-[var(--primary)] rounded-full"></span>
             Key Takeaways
          </h2>
          <ul className="space-y-2">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index} className="flex gap-2 text-[var(--muted)]">
                <span className="text-[var(--primary)]">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--primary)]">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="heading-3 mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-2xl p-8 text-center border border-[var(--primary)]/20">
          <h3 className="heading-3 mb-4">Ready to start tracking?</h3>
          <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto">
            LunaCycle is a 100% private, local-only tracker. We never see your data. Start tracking now to get personalized predictions.
          </p>
          <Link href="/tracker" className="button-primary inline-flex items-center gap-2">
            Go to Tracker
          </Link>
        </div>
      </div>
    </article>
  );
}
