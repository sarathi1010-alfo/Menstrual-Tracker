import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { absoluteUrl, constructMetadata } from '@/lib/seo';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { siteConfig } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Blog',
  description: 'Read the latest articles about cycle tracking, health, and more.',
  path: '/blog',
});

export default function BlogPage() {
  const allArticles = getAllArticles();
  const articles = allArticles.filter((article) => article.category === 'blog');

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "LunaCycle Blog",
    "url": absoluteUrl('/blog'),
    "description": "Read the latest articles about cycle tracking, health, and more.",
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": absoluteUrl('/icon.png')
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <SchemaMarkup schema={schema} />
      <h1 className="heading-1 mb-8">LunaCycle Blog</h1>
      <MedicalDisclaimer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link href={`/blog/${article.slug}`} key={article.slug} className="card p-6 block hover:border-[var(--primary)] transition-colors">
            <h2 className="heading-3 mb-2">{article.title}</h2>
            <p className="text-[var(--muted)]">{article.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
