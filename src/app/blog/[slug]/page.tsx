import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { constructMetadata, absoluteUrl } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => article.category !== 'what-is')
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const { title, summary, takeaways, faqs } = article.meta;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": summary,
    "author": {
      "@type": "Organization",
      "name": "LunaCycle",
      "url": absoluteUrl('/')
    }
  };

  let faqSchema = null;
  if (faqs && faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
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
    <article className="max-w-3xl mx-auto space-y-8 pb-12">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
        <ChevronLeft size={16} /> Back to Blog
      </Link>

      <header className="space-y-4">
        <h1 className="heading-1">{title}</h1>
        {summary && <p className="text-xl text-[var(--muted)] leading-relaxed">{summary}</p>}
      </header>

      {takeaways && takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-6 my-8">
          <h2 className="font-bold text-lg mb-4 text-[var(--foreground)]">Key Takeaways</h2>
          <ul className="space-y-2 list-disc list-inside text-[var(--muted)]">
            {takeaways.map((takeaway, idx) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-gray dark:prose-invert max-w-none prose-a:text-[var(--primary)] hover:prose-a:text-[var(--primary)]/80 prose-headings:text-[var(--foreground)]">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {faqs && faqs.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card p-6 space-y-2">
                <h3 className="font-bold text-[var(--foreground)]">{faq.question}</h3>
                <p className="text-sm text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <MedicalDisclaimer />
    </article>
  );
}
