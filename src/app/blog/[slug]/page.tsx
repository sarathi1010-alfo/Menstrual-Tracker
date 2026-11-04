import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { constructMetadata, absoluteUrl } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MDXComponents } from '@/components/MDXComponents';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'cluster') {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/blog/${slug}`,
  });
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => article.category === 'cluster')
    .map((article) => ({
      slug: article.slug,
    }));
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'cluster') {
    notFound();
  }

  const { title, summary, faqs, takeaways } = article.meta;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
    url: absoluteUrl(`/blog/${slug}`),
  };

  let faqSchema = null;
  if (faqs && faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
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
    <article className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <nav className="mb-8">
        <Link href="/blog" className="text-blue-600 hover:underline">
          &larr; Back to blog
        </Link>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight mb-4">{title}</h1>
      <p className="text-xl text-gray-600 mb-8">{summary}</p>

      {takeaways && takeaways.length > 0 && (
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-blue max-w-none">
        <MDXRemote
          source={article.content}
          components={MDXComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <MedicalDisclaimer />

      {faqs && faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
