import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Cycle Tracking Blog & Educational Resources',
  description: 'Read the latest educational articles, guides, and tips on menstrual cycle tracking and health.',
};

export default function BlogLanding() {
  const allArticles = getAllArticles();

  const blogPosts = allArticles.filter(a => a.category === 'blog');
  const useCases = allArticles.filter(a => a.category === 'use-cases');
  const conditions = allArticles.filter(a => a.category === 'conditions');

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Cycle Tracking Blog</h1>
      <p className="text-[var(--muted)] mb-8 text-lg">
        Explore our guides to understanding your menstrual cycle, predicting your period, and optimizing your health.
      </p>

      <MedicalDisclaimer />

      <div className="space-y-12 mt-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[var(--primary)] border-b pb-2 border-gray-200 dark:border-gray-800">Featured Guides</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-[var(--surface)] p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--primary)] transition-colors">
                <h3 className="text-xl font-medium mb-2 group-hover:text-[var(--primary)]">{post.title}</h3>
                <p className="text-sm text-[var(--muted)] line-clamp-3">{post.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        {useCases.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[var(--primary)] border-b pb-2 border-gray-200 dark:border-gray-800">Use Cases</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {useCases.map((post) => (
                <Link key={post.slug} href={`/use-cases/${post.slug}`} className="group block bg-[var(--surface)] p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--primary)] transition-colors">
                  <h3 className="text-xl font-medium mb-2 group-hover:text-[var(--primary)]">{post.title}</h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-3">{post.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {conditions.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-[var(--primary)] border-b pb-2 border-gray-200 dark:border-gray-800">Health Conditions</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {conditions.map((post) => (
                <Link key={post.slug} href={`/conditions/${post.slug}`} className="group block bg-[var(--surface)] p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[var(--primary)] transition-colors">
                  <h3 className="text-xl font-medium mb-2 group-hover:text-[var(--primary)]">{post.title}</h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-3">{post.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
