import { getGuideBySlug, getGuideSlugs, getAllGuides } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Share2, CheckCircle2, ChevronDown } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';


export async function generateStaticParams() {
  const slugs = getGuideSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = getGuideBySlug(resolvedParams.slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: guide.meta.seoTitle,
    description: guide.meta.seoDescription,
    openGraph: {
      title: guide.meta.seoTitle,
      description: guide.meta.seoDescription,
      type: 'article',
      tags: guide.meta.tags,
    }
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guide = getGuideBySlug(resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  const allGuides = getAllGuides();
  const relatedGuides = allGuides
    .filter(g => g.slug !== guide.meta.slug && g.tags.some(t => guide.meta.tags.includes(t)))
    .slice(0, 3); // Get top 3 related

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.meta.seoTitle,
    "description": guide.meta.seoDescription,
    "keywords": guide.meta.tags.join(', '),
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LunaCycle",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cyclehub.example.com/logo.png"
      }
    }
  };

  const faqSchema = guide.meta.faqs && guide.meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.meta.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // AI-Retrieval Optimization: Answer-first formatting and semantic chunking
  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
      <article className="lg:w-2/3">

        <SchemaMarkup schema={articleSchema} />
        {faqSchema && <SchemaMarkup schema={faqSchema as Record<string, unknown>} />}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to all guides
          </Link>
          <div className="flex gap-2 mb-4 flex-wrap">
            {guide.meta.tags.map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
            {guide.meta.title}
          </h1>

          {/* Quick Answer Block / AI Chunk */}
          <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mt-8 mb-10">
            <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
               <BookOpen size={16} className="mr-2" /> Quick Answer
            </h2>
            <p className="text-lg text-[var(--foreground)] leading-relaxed m-0 font-medium">
               {guide.meta.summary}
            </p>
          </div>

          {/* Key Takeaways (AEO Box) */}
          {guide.meta.takeaways && guide.meta.takeaways.length > 0 && (
            <div className="bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-10 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-[var(--foreground)] flex items-center">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {guide.meta.takeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--foreground)]">
                    <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <MedicalDisclaimer />
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
          <MDXRemote source={guide.content} />
        </div>

        {/* FAQ Section */}
        {guide.meta.faqs && guide.meta.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {guide.meta.faqs.map((faq, index) => (
                <details key={index} className="group bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-xl p-6 cursor-pointer open:ring-2 open:ring-[var(--primary)]/20">
                  <summary className="flex items-center justify-between font-medium text-lg list-none text-[var(--foreground)]">
                    {faq.question}
                    <ChevronDown size={20} className="text-[var(--muted)] group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-4 text-[var(--muted)] leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-800">
           <span className="font-medium">Was this guide helpful?</span>
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

        {relatedGuides.length > 0 && (
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              Related Knowledge
            </h3>
            <div className="space-y-4">
              {relatedGuides.map(related => (
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
