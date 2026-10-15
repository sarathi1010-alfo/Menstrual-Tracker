import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { FAQAccordion } from '@/components/FAQAccordion';
import { MDXComponents } from '@/components/MDXComponents';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'blog' || a.category === 'cluster' || !a.category)
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) return { title: 'Article Not Found' };

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.meta.seoTitle,
    "description": article.meta.seoDescription,
    "keywords": article.meta.tags.join(', '),
    "author": { "@type": "Organization", "name": "LunaCycle" },
    "publisher": { "@type": "Organization", "name": "LunaCycle" }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <SchemaMarkup schema={articleSchema} />

      <Link href="/blog" className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Back to blog
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
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-xl mb-4 flex items-center">Key Takeaways</h2>
          <ul className="space-y-2">
            {article.meta.takeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={20} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <MedicalDisclaimer />

      <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
        <MDXRemote source={article.content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>

      {article.meta.faqs && article.meta.faqs.length > 0 && (
        <FAQAccordion faqs={article.meta.faqs} />
      )}
    </div>
  );
}
