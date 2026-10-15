import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { absoluteUrl } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.filter(a => a.category === 'use-cases').map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {};
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    alternates: {
      canonical: absoluteUrl(`/use-cases/${resolvedParams.slug}`),
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.seoTitle || meta.title,
    "description": meta.seoDescription || meta.summary,
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LunaCycle",
      "logo": {
        "@type": "ImageObject",
        "url": absoluteUrl('/favicon.ico')
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": absoluteUrl(`/use-cases/${resolvedParams.slug}`)
    }
  };

  let faqSchema = null;
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
    <article className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}

      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{meta.summary}</p>
      </header>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose dark:prose-invert max-w-none mb-10">
        <MDXRemote source={content} />
      </div>

      {meta.faqs && meta.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {meta.faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
