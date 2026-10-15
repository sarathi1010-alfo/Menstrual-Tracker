import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const validSlugs = [];

  for (const slug of slugs) {
    const article = getArticleBySlug(slug);
    if (article && article.meta.category !== 'what-is') {
      validSlugs.push({ slug });
    }
  }

  return validSlugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return constructMetadata({ title: 'Not Found' });
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/blog/${resolvedParams.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
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
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  let faqSchema = null;
  if (meta.faqs && meta.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": meta.faqs.map(faq => ({
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
    <article className="max-w-3xl mx-auto space-y-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
          <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">Blog</Link>
          <span>/</span>
          <span className="capitalize">{meta.category?.replace('-', ' ') || 'Article'}</span>
        </div>
        <h1 className="heading-1">{meta.title}</h1>
        <p className="text-xl text-[var(--muted)] leading-relaxed">
          {meta.summary}
        </p>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-6 my-8">
          <h2 className="heading-3 text-[var(--primary)] mb-4">Key Takeaways</h2>
          <ul className="space-y-2">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex gap-2 text-[var(--muted)]">
                <span className="text-[var(--primary)] mt-1">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-gray dark:prose-invert max-w-none mt-8">
        <MDXRemote source={content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {meta.faqs.map((faq, idx) => (
              <div key={idx} className="card p-6">
                <h3 className="heading-3 mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <MedicalDisclaimer />
      </div>
    </article>
  );
}
