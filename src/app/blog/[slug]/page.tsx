import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { FAQAccordion } from '@/components/FAQAccordion';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'blog' || !a.category);
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) return {};

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/blog/${article.meta.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || (article.meta.category && article.meta.category !== 'blog')) {
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

  return (
    <article className="max-w-3xl mx-auto">
      <SchemaMarkup schema={articleSchema} />
      <header className="mb-8 space-y-4">
        <h1 className="heading-1">{meta.title}</h1>
        <p className="text-xl text-[var(--muted)]">{meta.summary}</p>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--primary)]/5 p-6 rounded-2xl mb-8 border border-[var(--primary)]/10">
          <h2 className="heading-3 mb-4 text-[var(--primary)]">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-[var(--foreground)]">
            {meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-pink dark:prose-invert max-w-none mb-12">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            }
          }}
        />
      </div>

      {meta.faqs && <FAQAccordion faqs={meta.faqs} />}
    </article>
  );
}
