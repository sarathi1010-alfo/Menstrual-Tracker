import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/MDXComponents';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'use-cases')
    .map((article) => ({
      slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article || article.meta.category !== 'use-cases') return {};
  return {
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article || article.meta.category !== 'use-cases') {
    notFound();
  }

  const { meta, content } = article;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    author: {
      '@type': 'Organization',
      name: 'LunaCycle',
    },
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <SchemaMarkup schema={articleSchema} />

      <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
      <MedicalDisclaimer />

      {meta.takeaways && (
        <div className="bg-secondary/10 p-6 rounded-lg mb-8 border border-secondary/30">
          <h2 className="text-xl font-bold mb-3">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2">
            {meta.takeaways.map((takeaway, idx) => (
              <li key={idx}>{takeaway}</li>
            ))}
          </ul>
        </div>
      )}

      <article className="prose prose-lg max-w-none prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:text-foreground">
        <MDXRemote source={content} components={MDXComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>
    </div>
  );
}
