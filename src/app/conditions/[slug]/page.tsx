import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { FAQAccordion } from '@/components/FAQAccordion';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'conditions')
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) return { title: 'Condition Not Found' };

  return {
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    openGraph: {
      title: article.meta.seoTitle,
      description: article.meta.seoDescription,
      type: 'article',
      tags: article.meta.tags,
    }
  };
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle,
    "description": article.meta.seoDescription
  };

  return (
    <div className="max-w-3xl mx-auto">
      <SchemaMarkup schema={articleSchema} />

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
        {article.meta.title}
      </h1>

      <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
        {article.meta.summary}
      </p>

      {article.meta.takeaways && article.meta.takeaways.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-xl mb-4 text-red-900 dark:text-red-200">Key Information</h2>
          <ul className="space-y-2">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={20} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <span className="text-red-900 dark:text-red-100">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight max-w-none">
        <MDXRemote source={article.content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <FAQAccordion faqs={article.meta.faqs} />
      )}
    </div>
  );
}
