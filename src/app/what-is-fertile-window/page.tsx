import { getArticleBySlug } from '@/lib/mdx';
import { ArticleRenderer } from '@/components/ArticleRenderer';
import { constructMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const article = getArticleBySlug('what-is-fertile-window');
  if (!article) return constructMetadata({ title: 'Not Found' });
  return constructMetadata({
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    path: `/what-is-fertile-window`,
  });
}

export default function Page() {
  const article = getArticleBySlug('what-is-fertile-window');
  if (!article) notFound();
  return <ArticleRenderer article={article} url={`https://lunacycle.alfo.online/what-is-fertile-window`} />;
}
