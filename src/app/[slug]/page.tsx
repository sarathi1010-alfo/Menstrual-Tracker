import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import FAQAccordion from '@/components/FAQAccordion';
import KeyTakeaways from '@/components/KeyTakeaways';
import { mdxComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article) => article !== null);

  // Filter for what-is category
  const whatIsArticles = articles.filter(article => article?.meta.category === 'what-is');

  return whatIsArticles.map((article) => ({
    slug: article!.meta.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'what-is') {
    return constructMetadata({ title: 'Not Found' });
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/${slug}`,
  });
}

export default async function WhatIsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SchemaMarkup
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.meta.title,
          description: article.meta.summary,
          url: `https://lunacycle.alfo.online/${slug}`,
        }}
      />

      <article>
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.meta.title}
          </h1>
          {article.meta.summary && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {article.meta.summary}
            </p>
          )}
        </header>

        {article.meta.takeaways && article.meta.takeaways.length > 0 && (
          <KeyTakeaways takeaways={article.meta.takeaways} />
        )}

        <MedicalDisclaimer />

        <div className="prose prose-lg prose-pink max-w-none">
          <MDXRemote source={article.content} components={mdxComponents} />
        </div>

        {article.meta.faqs && article.meta.faqs.length > 0 && (
          <FAQAccordion faqs={article.meta.faqs} />
        )}
      </article>
    </div>
  );
}
