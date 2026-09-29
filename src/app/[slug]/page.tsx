import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Share2, CheckCircle2 } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'what-is')
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    return {
      title: 'Article Not Found',
    };
  }

  return constructMetadata({
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
    path: `/${resolvedParams.slug}`,
  });
}

export default async function TopLevelArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(a => a.slug !== article.meta.slug && a.tags?.some(t => article.meta.tags?.includes(t)))
    .slice(0, 3);

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle || article.meta.title,
    "description": article.meta.seoDescription || article.meta.summary,
    "keywords": article.meta.tags?.join(', ') || '',
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  let faqSchema: Record<string, unknown> | null = null;
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
          <div className="flex gap-2 mb-4 flex-wrap">
            {article.meta.tags?.map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
            {article.meta.title}
          </h1>

          <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mt-8 mb-6">
            <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
               <BookOpen size={16} className="mr-2" /> Quick Answer
            </h2>
            <p className="text-lg text-[var(--foreground)] leading-relaxed m-0 font-medium">
               {article.meta.summary}
            </p>
          </div>

          {article.meta.takeaways && article.meta.takeaways.length > 0 && (
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {article.meta.takeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[var(--primary)] shrink-0 mt-0.5" size={18} />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <MedicalDisclaimer />
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
          <MDXRemote source={article.content} />
        </div>

        {article.meta.faqs && article.meta.faqs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {article.meta.faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  <p className="text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-800">
           <span className="font-medium">Was this helpful?</span>
           <button className="flex items-center text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
             <Share2 size={18} className="mr-2" /> Share
           </button>
        </div>
      </article>

      <aside className="lg:w-1/3 space-y-8">
        <div className="card p-6 bg-[var(--primary)] text-white shadow-lg sticky top-24">
          <h3 className="text-xl font-bold mb-3">Apply this to your cycle</h3>
          <p className="text-white/80 text-sm mb-6">
            LunaCycle is a 100% private, local-only tracker. We never see your data. Start tracking now to get personalized predictions.
          </p>
          <Link href="/" className="block w-full py-3 bg-white text-[var(--primary)] text-center font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Open Free Tracker
          </Link>
        </div>

        {relatedArticles.length > 0 && (
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              Related Knowledge
            </h3>
            <div className="space-y-4">
              {relatedArticles.map(related => {
                let href = `/blog/${related.slug}`;
                if (related.category === 'what-is') href = `/${related.slug}`;
                else if (related.category === 'use-cases') href = `/use-cases/${related.slug}`;
                else if (related.category === 'conditions') href = `/conditions/${related.slug}`;
                return (
                  <Link key={related.slug} href={href} className="block group">
                    <h4 className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 mb-1">
                      {related.title}
                    </h4>
                    <p className="text-sm text-[var(--muted)] line-clamp-2">
                      {related.summary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
