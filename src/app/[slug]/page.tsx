import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Share2, CheckCircle } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { FAQAccordion } from '@/components/FAQAccordion';

const CATEGORY = 'what-is';
const BACK_LINK = '/blog';
const BACK_TEXT = 'Back to blog';

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  const allArticles = getAllArticles();

  return slugs
    .filter((slug) => {
      const article = allArticles.find(a => a.slug === slug);
      if (!article) return false;
      return article.category === CATEGORY;
    })
    .map((slug) => ({
      slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== CATEGORY) {
    return {
      title: 'Not Found',
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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== CATEGORY) {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(a => a.slug !== article.meta.slug && a.tags.some(t => article.meta.tags.includes(t)))
    .slice(0, 3);

  const articleSchema = {
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
      "name": "LunaCycle"
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      <article className="lg:w-2/3">
        <SchemaMarkup schema={articleSchema} />
        <div className="mb-8">
          <Link href={BACK_LINK} className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> {BACK_TEXT}
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

          <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mt-8 mb-6">
            <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
               <BookOpen size={16} className="mr-2" /> Quick Answer
            </h2>
            <p className="text-lg text-[var(--foreground)] leading-relaxed m-0 font-medium">
               {article.meta.summary}
            </p>
          </div>

          {article.meta.takeaways && article.meta.takeaways.length > 0 && (
            <div className="card p-6 bg-[var(--primary)]/5 border-[var(--primary)]/20 mb-10">
              <h3 className="heading-3 mb-4 flex items-center text-[var(--primary)]">
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {article.meta.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="text-[var(--primary)] shrink-0 mr-3 mt-0.5" size={18} />
                    <span className="text-[var(--foreground)]">{takeaway}</span>
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
          <FAQAccordion faqs={article.meta.faqs} />
        )}

        <div className="mt-12 flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-800">
           <span className="font-medium">Was this article helpful?</span>
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
          <Link href="/tracker" className="block w-full py-3 bg-white text-[var(--primary)] text-center font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            Open Free Tracker
          </Link>
        </div>

        {relatedArticles.length > 0 && (
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              Related Articles
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
