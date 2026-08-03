import { getArticleBySlug, getAllArticles } from '@/lib/mdx';
import { ArticleRenderer } from '@/components/ArticleRenderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'what-is')
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
  };
}

export default async function TopLevelPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'what-is') {
    notFound();
  }

  return <ArticleRenderer article={article} />;
}
