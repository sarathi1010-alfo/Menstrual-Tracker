import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Not Found | LunaCycle',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: `${article.meta.seoTitle} | LunaCycle Blog`,
    description: article.meta.seoDescription,
    openGraph: {
      title: article.meta.seoTitle,
      description: article.meta.seoDescription,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.seoDescription,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
  };

  const faqSchema = meta.faqs && meta.faqs.length > 0 ? {
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
  } : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <article className="prose prose-indigo prose-lg max-w-none">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-8">
          {meta.title}
        </h1>

        {meta.summary && (
          <p className="text-xl text-gray-500 mb-8 border-l-4 border-indigo-500 pl-4">
            {meta.summary}
          </p>
        )}

        {meta.takeaways && meta.takeaways.length > 0 && (
          <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-100">
            <h2 className="text-xl font-bold text-indigo-900 mt-0 mb-4">Key Takeaways</h2>
            <ul className="space-y-2 mb-0">
              {meta.takeaways.map((takeaway, index) => (
                <li key={index} className="text-indigo-800 flex items-start">
                  <span className="mr-2 text-indigo-500">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-8">
          <MedicalDisclaimer />
        </div>

        <div className="mt-8 mdx-content">
          <MDXRemote source={content} components={MDXComponents} />
        </div>

        {meta.faqs && meta.faqs.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {meta.faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <div className="text-gray-600 prose-sm max-w-none">
                    <MDXRemote source={faq.answer} components={MDXComponents} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      <div className="mt-12">
          <MedicalDisclaimer />
      </div>
    </div>
  );
}
