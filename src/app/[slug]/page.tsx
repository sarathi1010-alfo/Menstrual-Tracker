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
  const filteredSlugs = slugs.filter((slug) => {
    const article = getArticleBySlug(slug);
    if (!article) return false;
    return article.meta.category === 'what-is';
  });

  return filteredSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/${resolvedParams.slug}`,
  });
}

export default async function MicroAnswer({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.summary,
    "url": absoluteUrl(`/${resolvedParams.slug}`),
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
        <h1 className="heading-1">{meta.title}</h1>
        <div className="bg-[var(--surface)] border-l-4 border-[var(--primary)] p-4 rounded-r-lg shadow-sm">
           <p className="text-lg text-[var(--muted)] leading-relaxed">{meta.summary}</p>
        </div>
      </header>

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

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <Link href="/blog" className="text-[var(--primary)] hover:underline inline-flex items-center gap-2">
           &larr; Back to Menstrual Health Guides
        </Link>
      </div>
    </article>
  );
}
