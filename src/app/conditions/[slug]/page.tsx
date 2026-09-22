import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'conditions')
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article || article.meta.category !== 'conditions') return { title: 'Not Found' };

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
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
    headline: article.meta.title,
    description: article.meta.summary,
  };

  const faqSchema = article.meta.faqs && article.meta.faqs.length > 0 ? {
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
  } : null;

  return (
    <article className="max-w-3xl mx-auto py-12 prose dark:prose-invert">
      <SchemaMarkup schema={articleSchema as Record<string, unknown>} />
      {faqSchema && <SchemaMarkup schema={faqSchema as Record<string, unknown>} />}

      <h1 className="text-4xl font-bold mb-4">{article.meta.title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium">{article.meta.summary}</p>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8 border border-blue-100 dark:border-blue-800">
          <h2 className="text-xl font-semibold mb-4 mt-0">Quick Reference</h2>
          <ul className="m-0">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}


      <MDXRemote
        source={article.content}
        components={{ ...MDXComponents, MedicalDisclaimer }}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4 mt-6">
            {article.meta.faqs.map((faq, i) => (
              <details key={i} className="group bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
