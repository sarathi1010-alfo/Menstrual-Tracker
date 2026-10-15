import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { ArticleRenderer } from '@/components/ArticleRenderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => !a.category || a.category === 'blog')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) return { title: 'Not Found' };

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

  if (!article || (article.meta.category && article.meta.category !== 'blog')) {
    notFound();
  }

  return <ArticleRenderer article={article} />;
}
