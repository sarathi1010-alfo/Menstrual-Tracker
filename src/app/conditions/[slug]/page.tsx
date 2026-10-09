
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'conditions')
    .map(a => ({ slug: a.slug }));
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'conditions') {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };

  let faqSchema = null;
  if (article.meta.faqs && article.meta.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.meta.faqs.map((faq) => ({
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
    <article className="max-w-3xl mx-auto px-4 py-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="text-4xl font-bold mb-4">{article.meta.title}</h1>
      <div className="text-xl mb-8 font-semibold">{article.meta.summary}</div>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose dark:prose-invert max-w-none mt-8">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, i) => (
              <details key={i} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                <div className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
