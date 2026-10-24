import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, ArrowRight, Shield, Activity, CalendarDays, Heart } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle Blog – Cycle Tracking Guides, Menstrual Health & Privacy Tips',
  description: 'Evidence-based guides on menstrual cycle tracking, ovulation, fertility, conditions like PCOS and endometriosis, and digital privacy.',
  path: '/blog',
});

export default function BlogIndexPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] mb-2">
          <BookOpen size={32} />
        </div>
        <h1 className="heading-1">LunaCycle Blog &ndash; Cycle Tracking Guides, Menstrual Health & Privacy Tips</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Welcome to the LunaCycle Blog. Our mission is to empower you with evidence-based, easy-to-understand education about your body and your cycle. Whether you are looking to understand the fundamentals of menstrual health, exploring fertility and family planning options, managing specific health conditions, or learning how to protect your digital privacy in the age of health tracking, we have you covered. Dive into our comprehensive guides, quick answers, and expert insights designed to help you take control of your menstrual health journey safely and privately.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/blog/ultimate-guide-menstrual-cycle-tracking-2026" className="group block md:col-span-2">
           <div className="card p-8 h-full border-2 border-[var(--primary)]/20 hover:border-[var(--primary)] transition-all hover:shadow-lg bg-[var(--primary)]/5">
             <div className="flex gap-2 mb-4">
               <span className="text-xs px-2 py-1 bg-[var(--primary)]/20 rounded-md text-[var(--primary)] font-bold">Featured Pillar Guide</span>
             </div>
             <h2 className="heading-2 mb-3 group-hover:text-[var(--primary)] transition-colors">
               The Ultimate Guide to Menstrual Cycle Tracking in 2026
             </h2>
             <p className="text-[var(--muted)] text-base mb-6 max-w-3xl">
               A comprehensive, step-by-step masterclass on everything you need to know about cycle tracking, from understanding the four phases of your cycle to identifying ovulation and optimizing your well-being.
             </p>
             <div className="flex items-center font-medium text-[var(--primary)]">
               Read the complete guide <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
             </div>
           </div>
        </Link>

        {/* Categories */}
        <div className="card p-6 border hover:border-[var(--primary)]/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <CalendarDays className="text-[var(--primary)]" size={24} />
            <h2 className="heading-3">Cycle Fundamentals</h2>
          </div>
          <p className="text-[var(--muted)] text-sm mb-4">Master the basics of your body's rhythm.</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/what-is-a-menstrual-cycle" className="text-[var(--primary)] hover:underline">What is a Menstrual Cycle?</Link></li>
            <li><Link href="/what-is-the-follicular-phase" className="text-[var(--primary)] hover:underline">What is the Follicular Phase?</Link></li>
            <li><Link href="/what-is-the-luteal-phase" className="text-[var(--primary)] hover:underline">What is the Luteal Phase?</Link></li>
          </ul>
        </div>

        <div className="card p-6 border hover:border-[var(--primary)]/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-[var(--accent)]" size={24} />
            <h2 className="heading-3">Fertility & Family Planning</h2>
          </div>
          <p className="text-[var(--muted)] text-sm mb-4">Insights for avoiding pregnancy or TTC.</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/what-is-ovulation" className="text-[var(--primary)] hover:underline">What is Ovulation?</Link></li>
            <li><Link href="/what-is-the-fertile-window" className="text-[var(--primary)] hover:underline">What is the Fertile Window?</Link></li>
          </ul>
        </div>

        <div className="card p-6 border hover:border-[var(--primary)]/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-[var(--secondary)]" size={24} />
            <h2 className="heading-3">Conditions & Health</h2>
          </div>
          <p className="text-[var(--muted)] text-sm mb-4">Deep dives into PCOS, endometriosis, and more.</p>
          <p className="text-xs text-[var(--muted)] italic">Articles coming soon in this category.</p>
        </div>

        <div className="card p-6 border hover:border-[var(--primary)]/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-gray-500" size={24} />
            <h2 className="heading-3">Privacy & Security</h2>
          </div>
          <p className="text-[var(--muted)] text-sm mb-4">How to protect your digital health data.</p>
          <p className="text-xs text-[var(--muted)] italic">Articles coming soon in this category.</p>
        </div>
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
