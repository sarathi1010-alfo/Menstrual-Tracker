import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { components } from '@/components/MDXComponents';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import remarkGfm from 'remark-gfm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles().filter(a => a.category !== 'what-is' && a.category !== 'use-cases' && a.category !== 'conditions');
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return { title: 'Not Found' };

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || (article.meta.category && ['what-is', 'use-cases', 'conditions'].includes(article.meta.category))) {
    notFound();
  }

  const { meta, content } = article;

  const schemas: Record<string, unknown>[] = [];

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    author: {
      '@type': 'Organization',
      name: meta.author || 'LunaCycle Editorial Team'
    },
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
  });

  if (meta.faqs && meta.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {schemas.map((schema, idx) => (
        <SchemaMarkup key={idx} schema={schema} />
      ))}

      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
          {meta.title}
        </h1>
        {meta.summary && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {meta.summary}
          </p>
        )}
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
          <ul className="space-y-2">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span className="text-gray-800">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg prose-primary max-w-none mt-8">
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            }
          }}
        />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}