import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import { constructMetadata, absoluteUrl } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { AEOBox } from '@/components/AEOBox';
import { FAQAccordion } from '@/components/FAQAccordion';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return constructMetadata({ title: 'Article Not Found' });
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  });
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => !article.slug.startsWith('what-is-') && !article.slug.includes('use-case') && !article.slug.includes('teens-guide') && !article.slug.includes('conditions') && !article.slug.includes('pcos'))
    .map((article) => ({
      slug: article.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': article.meta.schemaType || 'Article',
    headline: article.meta.title,
    description: article.meta.summary,
    url: absoluteUrl(`/blog/${slug}`),
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
  };

  return (
    <article className="max-w-3xl mx-auto py-8">
      <SchemaMarkup schema={articleSchema as Record<string, unknown>} />

      <header className="mb-10 text-center">
        <h1 className="heading-1 mb-4">{article.meta.title}</h1>
        <p className="text-xl text-[var(--muted)]">{article.meta.summary}</p>
      </header>

      {article.meta.takeaways && <AEOBox takeaways={article.meta.takeaways} />}

      <MedicalDisclaimer />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <MDXRemote source={article.content} />
      </div>

      {article.meta.faqs && <FAQAccordion faqs={article.meta.faqs} />}
    </article>
  );
}
