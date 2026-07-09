import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Share2, CheckCircle2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(g => g.slug !== article.meta.slug && g.tags.some(t => article.meta.tags.includes(t)))
    .slice(0, 3); // Get top 3 related

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle,
    "description": article.meta.seoDescription,
    "keywords": article.meta.tags.join(', '),
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LunaCycle",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lunacycle.alfo.online/logo.png"
      }
    }
  };

  const faqSchema = article.meta.faqs && article.meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      <article className="lg:w-2/3">
        <SchemaMarkup schema={articleSchema} />
        {faqSchema && <SchemaMarkup schema={faqSchema} />}

        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to all articles
          </Link>
          <div className="flex gap-2 mb-4 flex-wrap">
            {article.meta.tags.map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
            {article.meta.title}
          </h1>

          {/* Quick Answer Block / AI Chunk */}
          <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mt-8 mb-6">
            <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
               <BookOpen size={16} className="mr-2" /> Quick Answer
            </h2>
            <p className="text-lg text-[var(--foreground)] leading-relaxed m-0 font-medium">
               {article.meta.summary}
            </p>
          </div>

          {/* Key Takeaways (AEO) */}
          {article.meta.takeaways && article.meta.takeaways.length > 0 && (
            <div className="mb-10 p-6 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/10">
              <h2 className="text-lg font-bold mb-4 flex items-center text-[var(--primary)]">
                <CheckCircle2 size={20} className="mr-2" /> Key Takeaways
              </h2>
              <ul className="grid gap-3 m-0 p-0 list-none">
                {article.meta.takeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--foreground)]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="mb-10 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm text-[var(--muted)] italic">
            Medical Disclaimer: This information is for educational purposes only and does not constitute medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
          <MDXRemote source={article.content} />
        </div>

        {/* FAQ Section */}
        {article.meta.faqs && article.meta.faqs.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
              <HelpCircle size={24} className="text-[var(--primary)]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {article.meta.faqs.map((faq, index) => (
                <details key={index} className="group card p-0 overflow-hidden border border-gray-200 dark:border-gray-800 open:border-[var(--primary)]/30 transition-all">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-[var(--foreground)] group-open:text-[var(--primary)]">
                    {faq.question}
                    <ChevronDown size={18} className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-5 pt-0 text-[var(--muted)] border-t border-gray-100 dark:border-gray-800">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-800">
           <span className="font-medium">Was this article helpful?</span>
           <button className="flex items-center text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
             <Share2 size={18} className="mr-2" /> Share
           </button>
        </div>
      </article>

      {/* Semantic Linking Sidebar / Authority Distribution */}
      <aside className="lg:w-1/3 space-y-8">
        <div className="card p-6 bg-[var(--primary)] text-white shadow-lg sticky top-24">
          <h3 className="text-xl font-bold mb-3">Apply this to your cycle</h3>
          <p className="text-white/80 text-sm mb-6">
            LunaCycle is a 100% private, local-only tracker. We never see your data. Start tracking now to get personalized predictions.
          </p>
          <Link href="/tracker" className="block w-full py-3 bg-white text-[var(--primary)] text-center font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Open Free Tracker
          </Link>
        </div>

        {relatedArticles.length > 0 && (
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              Related Knowledge
            </h3>
            <div className="space-y-4">
              {relatedArticles.map(related => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="block group">
                  <h4 className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 mb-1">
                    {related.title}
                  </h4>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">
                    {related.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
