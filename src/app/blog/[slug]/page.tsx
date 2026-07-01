import { getGuideBySlug, getGuideSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { constructMetadata } from '@/lib/seo';

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
      title: 'Post Not Found',
    };
  }

  return constructMetadata({
    title: guide.meta.seoTitle,
    description: guide.meta.seoDescription,
    path: `/blog/${resolvedParams.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getGuideBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.meta.seoTitle,
    "description": post.meta.seoDescription,
    "keywords": post.meta.tags.join(', '),
    "author": {
      "@type": "Organization",
      "name": "LunaCycle"
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <article>
        <SchemaMarkup schema={articleSchema} />
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--primary)] mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to blog
          </Link>
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.meta.tags.map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
            {post.meta.title}
          </h1>

          <div className="p-5 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 shadow-sm mt-8 mb-10">
            <h2 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center">
               <BookOpen size={16} className="mr-2" /> Quick Summary
            </h2>
            <p className="text-lg text-[var(--foreground)] leading-relaxed m-0 font-medium">
               {post.meta.summary}
            </p>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--primary)] hover:prose-a:text-[var(--accent)] prose-a:transition-colors max-w-none">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-12 flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-800">
           <span className="font-medium">Was this post helpful?</span>
           <button className="flex items-center text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
             <Share2 size={18} className="mr-2" /> Share
           </button>
        </div>
      </article>
    </div>
  );
}
