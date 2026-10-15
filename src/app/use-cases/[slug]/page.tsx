import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { absoluteUrl } from '@/lib/seo';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
    return {};
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    openGraph: {
      title: article.meta.seoTitle || article.meta.title,
      description: article.meta.seoDescription || article.meta.summary,
      url: absoluteUrl(`/use-cases/${article.meta.slug}`),
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category === 'use-cases');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.summary,
    url: absoluteUrl(`/use-cases/${article.meta.slug}`),
  };

  const faqSchema = article.meta.faqs && article.meta.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.meta.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      }
    }))
  } : null;

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="text-4xl font-bold mb-4">{article.meta.title}</h1>
      <p className="text-xl text-gray-600 mb-8 italic">{article.meta.summary}</p>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-1">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i} className="text-blue-800">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose max-w-none">
        <MDXRemote source={article.content} components={MDXComponents} />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.meta.faqs.map((faq, i) => (
              <div key={i} className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
