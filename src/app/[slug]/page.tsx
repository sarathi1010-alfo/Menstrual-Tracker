import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import { constructMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const articles = getAllArticles();
  const whatIsArticles = articles.filter(a => a.category === 'what-is');

  return whatIsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'what-is') {
    return {};
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
    <article className="max-w-3xl mx-auto space-y-8">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote source={article.content} components={MDXComponents} />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, index) => (
              <div key={index} className="bg-[var(--surface)] p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-2 text-[var(--foreground)]">{faq.question}</h3>
                <p className="text-[var(--muted)] text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <MedicalDisclaimer />
    </article>
  );
}
