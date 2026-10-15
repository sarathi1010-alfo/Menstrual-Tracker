import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(article => article.category === 'what-is')
    .map((article) => ({ slug: article.slug }));
}

export default async function MicroAnswerPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  const { meta, content: articleContent } = article;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.seoTitle || meta.title,
    "description": meta.seoDescription || meta.summary,
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };


  const faqSchema = meta.faqs && meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": meta.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {faqSchema && <SchemaMarkup schema={faqSchema} />}
      <SchemaMarkup schema={articleSchema} />
      <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>

      {meta.summary && (
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <p className="text-lg text-gray-700">{meta.summary}</p>
        </div>
      )}

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Core Principles</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, i) => (
              <li key={i} className="text-blue-800">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-blue max-w-none mt-8">
        <MDXRemote source={articleContent} />
      </div>
    </article>
  );
}
