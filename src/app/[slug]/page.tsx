
import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const allArticles = getAllArticles();
  return allArticles
    .filter(a => a.category === 'what-is')
    .map((a) => ({
      slug: a.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/${resolvedParams.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || (article.meta.category !== 'what-is')) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle || article.meta.title,
    "description": article.meta.seoDescription || article.meta.summary,
    "keywords": article.meta.tags?.join(', ') || '',
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LunaCycle",
    }
  };

  let faqSchema = null;
  if (article.meta.faqs && article.meta.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": article.meta.faqs.map(faq => ({
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
    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      <article className="lg:w-2/3">
        <SchemaMarkup schema={articleSchema} />
        {faqSchema && <SchemaMarkup schema={faqSchema} />}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
            {article.meta.title}
          </h1>

          <p className="text-lg text-[var(--foreground)] leading-relaxed m-0 font-medium mb-6">
             {article.meta.summary}
          </p>
        </div>

        <MedicalDisclaimer />

        {article.meta.takeaways && article.meta.takeaways.length > 0 && (
          <div className="bg-[var(--primary)]/10 p-6 rounded-lg mb-8 border border-[var(--primary)]/20">
            <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
            <ul className="list-disc pl-5 space-y-2">
              {article.meta.takeaways.map((takeaway, i) => (
                <li key={i}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
          <MDXRemote source={article.content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        {article.meta.faqs && article.meta.faqs.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {article.meta.faqs.map((faq, i) => (
                <div key={i} className="border p-4 rounded">
                  <h4 className="font-bold">{faq.question}</h4>
                  <p className="mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
