import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { constructMetadata, absoluteUrl } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const articles = slugs.map((slug) => getArticleBySlug(slug)).filter(a => a !== null);
  const blogSlugs = articles.filter(a => a?.meta.category !== 'what-is' && a?.meta.category !== 'use-cases' && a?.meta.category !== 'conditions').map(a => a?.meta.slug);

  return blogSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category === 'what-is' || article.meta.category === 'use-cases' || article.meta.category === 'conditions') {
    return {};
  }

  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category === 'what-is' || article.meta.category === 'use-cases' || article.meta.category === 'conditions') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    url: absoluteUrl(`/blog/${meta.slug}`),
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
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
    <article className="max-w-3xl mx-auto px-4 py-12">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="mb-10">
        <h1 className="heading-1 mb-4">{meta.title}</h1>
        <p className="text-xl text-muted">{meta.summary}</p>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="heading-3 mb-4 text-blue-900">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-blue-800">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote
          source={content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <section className="mt-16">
          <h2 className="heading-2 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="heading-3 mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
