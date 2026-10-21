import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'cluster' || !a.category)
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return {};
  return {
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
  };

  const faqSchema = meta.faqs && meta.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: meta.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      }
    }))
  } : null;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
      <MedicalDisclaimer />

      {meta.takeaways && (
        <div className="bg-secondary/10 p-6 rounded-lg mb-8 border border-secondary/30">
          <h2 className="text-xl font-bold mb-3">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <article className="prose prose-lg max-w-none prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:text-foreground">
        <MDXRemote source={content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
