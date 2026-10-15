import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category !== 'what-is' && a.category !== 'use-cases' && a.category !== 'conditions');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const articleData = getArticleBySlug(resolvedParams.slug);

  if (!articleData) {
    return { title: 'Article Not Found' };
  }

  return {
    title: articleData.meta.seoTitle,
    description: articleData.meta.seoDescription,
    openGraph: {
      title: articleData.meta.seoTitle,
      description: articleData.meta.seoDescription,
      type: 'article',
      tags: articleData.meta.tags,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articleData = getArticleBySlug(resolvedParams.slug);

  if (!articleData) {
    notFound();
  }

  const { meta, content } = articleData;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.seoTitle,
    "description": meta.seoDescription,
    "keywords": meta.tags.join(', '),
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  let faqSchema: Record<string, unknown> | null = null;
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
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          {meta.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto italic bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          {meta.summary}
        </p>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-10 shadow-sm">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Key Takeaways
          </h2>
          <ul className="space-y-2 list-disc list-inside text-blue-800 dark:text-blue-200">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
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

      {meta.faqs && meta.faqs.length > 0 && (
        <section className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-10">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
