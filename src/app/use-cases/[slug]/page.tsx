import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const validSlugs = slugs.filter((slug) => {
    const article = getArticleBySlug(slug);
    return article && article.meta.category === 'use-cases';
  });
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return {};

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function UseCasesPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.seoTitle || meta.title,
    description: meta.seoDescription || meta.summary,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
    datePublished: meta.date,
  };

  let faqSchema = null;
  if (meta.faqs && meta.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="text-4xl font-bold mb-6">{meta.title}</h1>

      <div className="text-xl text-gray-600 mb-8 italic">
        {meta.summary}
      </div>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-xl border mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Reference</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-lg max-w-none mt-8">
        <MDXRemote source={content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
