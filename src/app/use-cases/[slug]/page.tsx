import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { MDXComponents } from '@/components/MDXComponents';
import { SchemaMarkup } from '@/components/SchemaMarkup';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(article => article.category === 'use-cases')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
    return {};
  }

  return {
    title: article.meta.seoTitle || article.meta.title,
    description: article.meta.seoDescription || article.meta.summary,
  };
}

export default async function UseCaseArticle({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    url: `https://lunacycle.alfo.online/use-cases/${slug}`,
  };

  return (
    <article className="max-w-3xl mx-auto prose dark:prose-invert">
      <SchemaMarkup schema={articleSchema} />

      <h1 className="heading-1 mb-4">{meta.title}</h1>
      <p className="lead text-lg text-[var(--muted)] mb-8">{meta.summary}</p>

      {meta.takeaways && meta.takeaways.length > 0 && (
        <div className="bg-[var(--surface)] border border-gray-200 dark:border-gray-800 p-6 rounded-lg mb-8">
          <h2 className="heading-3 mt-0 mb-4">Key Takeaways</h2>
          <ul className="mb-0">
            {meta.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <MDXRemote
        source={content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          }
        }}
      />
    </article>
  );
}
