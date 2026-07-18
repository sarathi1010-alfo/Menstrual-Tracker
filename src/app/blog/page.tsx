import Link from 'next/link';
import { getAllGuides } from '@/lib/mdx';
import { Metadata } from 'next';
import { BookOpen, ArrowRight } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Cycle Health Guides & Education - Period Tracking Resources',
  description: 'Free evidence-based guides to understanding your menstrual cycle, tracking methods, and reproductive health. Privacy-first educational resources from LunaCycle.',
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">LunaCycle Blog – Cycle Tracking Guides, Menstrual Health &amp; Privacy Tips</h1>
        <p className="text-lg text-[var(--muted)] max-w-3xl mx-auto leading-relaxed">
          Welcome to the LunaCycle Blog, your trusted, privacy-first resource for understanding your body. Whether you&apos;re learning the basics of your menstrual cycle, trying to conceive, or simply looking for ways to track your period without sacrificing your personal data, we have you covered. Our guides are designed to be clear, educational, and completely free of jargon. Explore our categories below to dive deep into cycle fundamentals, fertility &amp; family planning, privacy &amp; security, and women&apos;s health conditions. Remember, all your data in the <Link href="/" className="text-[var(--primary)] hover:underline">LunaCycle tracker</Link> stays on your device. For more details on our mission, check out our <Link href="/about" className="text-[var(--primary)] hover:underline">About</Link> page, or visit our <Link href="/faq" className="text-[var(--primary)] hover:underline">FAQ</Link> for quick answers.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="heading-2 mb-6">Categories</h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] font-medium rounded-full text-sm">Cycle Fundamentals</span>
          <span className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] font-medium rounded-full text-sm">Fertility &amp; Family Planning</span>
          <span className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] font-medium rounded-full text-sm">Privacy &amp; Security</span>
          <span className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] font-medium rounded-full text-sm">Conditions &amp; Health</span>
          <span className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] font-medium rounded-full text-sm">Wellness &amp; Lifestyle</span>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
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
      <MedicalDisclaimer />
    </div>
  );
}
