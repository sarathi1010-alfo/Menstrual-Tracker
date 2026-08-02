import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { absoluteUrl } from '@/lib/seo';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter((article) => article.category === 'conditions')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'conditions') {
    return {};
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    alternates: {
      canonical: absoluteUrl(`/conditions/${slug}`),
    },
  };
}

export default async function ConditionArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'conditions') {
    notFound();
  }

  const hasFaqs = article.meta.faqs && article.meta.faqs.length > 0;

  return (
    <article className="max-w-3xl mx-auto prose dark:prose-invert">
      <h1>{article.meta.title}</h1>
      <p className="lead">{article.meta.summary}</p>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--primary)] rounded-lg p-6 my-8 shadow-sm">
          <h2 className="!mt-0 !mb-4 text-[var(--primary)] text-xl font-bold">Key Takeaways</h2>
          <ul className="!mt-0 !mb-0 space-y-2">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i} className="!my-0">{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <MDXRemote source={article.content} />

      {hasFaqs && (
        <div className="mt-12">
          <h2>Frequently Asked Questions</h2>
          <div className="space-y-6">
            {article.meta.faqs!.map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": article.meta.faqs!.map((faq) => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })
            }}
          />
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.meta.title,
            "description": article.meta.summary,
            "url": absoluteUrl(`/${slug}`),
            "author": {
              "@type": "Organization",
              "name": "LunaCycle"
            }
          })
        }}
      />

    </article>
  );
}
