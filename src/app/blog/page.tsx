import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';
import { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Free evidence-based guides to understanding your menstrual cycle, tracking methods, and reproductive health. Privacy-first educational resources from LunaCycle.',
};

export default function GuidesIndexPage() {
  const guides = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Welcome to the LunaCycle Blog. Discover comprehensive guides on cycle fundamentals, fertility & family planning, privacy & security, and overall menstrual wellness. We empower you with evidence-based insights without sacrificing your digital privacy. Explore our resources to better understand your body.
        </p>
      </header>

      <MedicalDisclaimer />

      <section className="space-y-6 pt-4">
          <h2 className="heading-3">Category Directory</h2>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium">Cycle Fundamentals</span>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium">Fertility & Family Planning</span>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium">Privacy & Security</span>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium">Conditions & Health</span>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium">Wellness & Lifestyle</span>
          </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/blog/${guide.slug}`} className="group block">
            <div className="card p-6 h-full border border-transparent hover:border-[var(--primary)]/30 transition-all hover:shadow-md">
              <div className="flex gap-2 mb-3 flex-wrap">
                {guide.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-[var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="heading-3 mb-2 group-hover:text-[var(--primary)] transition-colors">
                {guide.title}
              </h2>
              <p className="text-[var(--muted)] text-sm mb-4 line-clamp-3">
                {guide.summary}
              </p>
              <div className="flex items-center text-sm font-medium text-[var(--primary)] mt-auto">
                Read guide <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 justify-center pt-8">
         <Link href="/" className="text-sm font-medium text-[var(--primary)] hover:underline">Back to Tracker</Link>
         <Link href="/about" className="text-sm font-medium text-[var(--primary)] hover:underline">About Us</Link>
         <Link href="/faq" className="text-sm font-medium text-[var(--primary)] hover:underline">FAQ</Link>
      </div>

      {/* Quick Access to Cycle Tools */}
      <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="heading-3 mb-6">Need Quick Calculations?</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/tools/next-period-predictor" className="card p-5 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-base mb-1 group-hover:text-[var(--primary)] transition-colors">Next Period Predictor</h3>
            <p className="text-sm text-[var(--muted)]">Predict your next period date instantly.</p>
          </Link>
          <Link href="/tools/safe-days-calculator" className="card p-5 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-base mb-1 group-hover:text-[var(--primary)] transition-colors">Safe Days Calculator</h3>
            <p className="text-sm text-[var(--muted)]">Calculate safe days and fertile window.</p>
          </Link>
          <Link href="/tools/ovulation-calculator" className="card p-5 hover:border-[var(--primary)]/50 transition-all group">
            <h3 className="font-semibold text-base mb-1 group-hover:text-[var(--primary)] transition-colors">Ovulation Calculator</h3>
            <p className="text-sm text-[var(--muted)]">Find your most fertile days.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
