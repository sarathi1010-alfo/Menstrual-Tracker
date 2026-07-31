import { getArticleBySlug } from '@/lib/mdx';
import { ArticleRenderer } from '@/components/ArticleRenderer';
import { constructMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const article = getArticleBySlug('pcos-and-cycle-tracking-guide');
  if (!article) return constructMetadata({ title: 'Not Found' });
  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/conditions/pcos-and-cycle-tracking-guide`,
  });
}

export default function Page() {
  const article = getArticleBySlug('pcos-and-cycle-tracking-guide');
  if (!article) notFound();
  return <ArticleRenderer article={article} url={`https://lunacycle.alfo.online/conditions/pcos-and-cycle-tracking-guide`} />;
}
