import { Metadata } from 'next';
import Link from 'next/link';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { constructMetadata } from '@/lib/seo';
import { getAllArticles } from '@/lib/mdx';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog - Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Cycle Tracking Guides, Menstrual Health & Privacy Tips from LunaCycle.',
  path: '/blog',
});

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="heading-1 mb-4">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-[var(--muted)] text-lg">
          Welcome to the LunaCycle Blog. Here you will find comprehensive guides on cycle tracking, insights into menstrual health, and practical tips on privacy and security when managing your health data.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="heading-3">Latest Articles</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => {
             const href = article.category === 'what-is' ? `/${article.slug}` : `/blog/${article.slug}`;
             return (
              <Link key={article.slug} href={href} className="card p-6 hover:border-[var(--primary)]/50 transition-all group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">{article.title}</h3>
                <p className="text-sm text-[var(--muted)]">{article.summary}</p>
              </Link>
             );
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-2">Categories</h3>
            <ul className="space-y-2 text-[var(--muted)] text-sm">
              <li>Cycle Fundamentals</li>
              <li>Fertility & Family Planning</li>
              <li>Privacy & Security</li>
              <li>Conditions & Health</li>
              <li>Wellness & Lifestyle</li>
            </ul>
          </div>
          <div className="card p-6">
             <h3 className="font-semibold text-lg mb-2">Important Links</h3>
             <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-[var(--primary)] hover:underline">LunaCycle Tracker</Link></li>
                <li><Link href="/about" className="text-[var(--primary)] hover:underline">About LunaCycle</Link></li>
                <li><Link href="/faq" className="text-[var(--primary)] hover:underline">FAQ</Link></li>
             </ul>
          </div>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
