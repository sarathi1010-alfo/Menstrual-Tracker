import Link from 'next/link';
import { Metadata } from 'next';
import { PredictionCard } from '@/components/PredictionCard';
import { CycleCalendar } from '@/components/CycleCalendar';
import { ArrowRight, Shield, Activity, CalendarDays, Heart, Sparkles } from 'lucide-react';
import { RelatedToolsWidget } from '@/components/RelatedToolsWidget';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'LunaCycle - Menstrual Tracker & Period Calendar',
  description: 'Free, privacy-first menstrual tracker and cycle calculator. Log symptoms, predict period and ovulation dates, and keep your health data private on your device.',
  path: '/',
});

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LunaCycle",
    url: "https://lunacycle.alfo.online/",
    description: "Free, privacy-first menstrual tracker and cycle calculator. Log symptoms, predict period and ovulation dates, and keep your health data private on your device.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does LunaCycle keep my menstrual data private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LunaCycle stores 100% of your cycle logs and symptoms exclusively in your browser's local storage. No data is ever transmitted to remote cloud servers, external databases, or third-party advertising trackers.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate are the next period and ovulation predictions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LunaCycle uses standard clinical calendar algorithms based on your historical cycle lengths (averaging between 21 and 35 days). Accuracy improves progressively as you log three or more consecutive cycles.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this menstrual tracker to calculate my fertile window for conception?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. LunaCycle calculates your estimated ovulation day (typically 14 days prior to your next period) and identifies the 5-day preceding fertile window to assist with conception planning.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do if my menstrual cycle is irregular?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If your cycle varies by more than 7 to 9 days between months, LunaCycle dynamically adjusts rolling averages to provide the most reliable prediction range possible, while recommending consultation with a healthcare provider.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export or backup my cycle data from my browser?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can export your complete cycle history and symptom logs directly to a local JSON file via the Settings page, allowing full data portability without external dependencies.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Track Your Menstrual Cycle Privately",
    description: "Step-by-step guide to tracking periods, symptoms, and ovulation predictions privately on your device.",
    step: [
      {
        "@type": "HowToStep",
        name: "Log Period Start Date",
        text: "Select the first day of your period on the calendar to establish your baseline cycle start date.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Record Daily Symptoms & Flow",
        text: "Track bleeding intensity, cramps, mood changes, and cervical fluid in your secure local log.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Review Fertile Window Predictions",
        text: "Examine projected ovulation days and estimated high-fertility dates highlighted on the visual calendar.",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Analyze Cycle Patterns Over Time",
        text: "Observe cycle length variations, follicular phase length, and symptom recurrence over consecutive months.",
        position: 4,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://lunacycle.alfo.online/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Menstrual Tracker",
        item: "https://lunacycle.alfo.online/tracker",
      },
    ],
  },
];

const faqs = [
  {
    q: "How does LunaCycle keep my menstrual data private?",
    a: "LunaCycle stores 100% of your cycle logs and symptoms exclusively in your browser's local storage. No data is ever transmitted to remote cloud servers, external databases, or third-party advertising trackers.",
  },
  {
    q: "How accurate are the next period and ovulation predictions?",
    a: "LunaCycle uses standard clinical calendar algorithms based on your historical cycle lengths (averaging between 21 and 35 days). Accuracy improves progressively as you log three or more consecutive cycles.",
  },
  {
    q: "Can I use this menstrual tracker to calculate my fertile window for conception?",
    a: "Yes. LunaCycle calculates your estimated ovulation day (typically 14 days prior to your next period) and identifies the 5-day preceding fertile window to assist with conception planning.",
  },
  {
    q: "What should I do if my menstrual cycle is irregular?",
    a: "If your cycle varies by more than 7 to 9 days between months, LunaCycle dynamically adjusts rolling averages to provide the most reliable prediction range possible, while recommending consultation with a healthcare provider.",
  },
  {
    q: "Can I export or backup my cycle data from my browser?",
    a: "Yes, you can export your complete cycle history and symptom logs directly to a local JSON file via the Settings page, allowing full data portability without external dependencies.",
  },
];

const steps = [
  {
    step: "01",
    title: "Log Period Start Date",
    description: "Select the first day of your period on the calendar to establish your baseline cycle start date.",
    icon: CalendarDays,
  },
  {
    step: "02",
    title: "Record Daily Symptoms & Flow",
    description: "Track bleeding intensity, cramps, mood changes, and cervical fluid in your secure local log.",
    icon: Heart,
  },
  {
    step: "03",
    title: "Review Fertile Window Predictions",
    description: "Examine projected ovulation days and estimated high-fertility dates highlighted on the visual calendar.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Analyze Cycle Patterns Over Time",
    description: "Observe cycle length variations, follicular phase length, and symptom recurrence over consecutive months.",
    icon: Activity,
  },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 md:py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--secondary)]/20 text-emerald-800 dark:text-emerald-300 text-sm font-medium mb-4">
          <Shield size={14} />
          <span>100% Private & Local Storage</span>
        </div>
        <h1 className="heading-1 max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Privacy-First Menstrual Tracker & Cycle Calculator
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          LunaCycle is a 100% private, free menstrual tracker and ovulation calculator that stores all your personal health data directly on your device. Predict next period dates, identify your fertile window, track cycle symptoms, and gain reproductive health clarity with zero accounts, zero cloud storage, and absolute privacy.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tracker" className="button-primary flex items-center gap-2 w-full sm:w-auto justify-center min-h-[44px]">
            Start Tracking <ArrowRight size={18} />
          </Link>
          <Link href="/about" className="px-6 py-3 min-h-[44px] flex items-center justify-center rounded-2xl font-medium text-[var(--foreground)] bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto text-center">
            Learn More
          </Link>
        </div>
      </section>

      {/* Quick Dashboard Preview */}
      <section className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <PredictionCard />
          <div className="card p-6">
            <h2 className="heading-3 mb-2 flex items-center gap-2">
              <Activity className="text-[var(--primary)]" size={20} />
              Instant Reproductive Insights
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Log your dates and immediately see your estimated fertile window, next period prediction, and average cycle length. Everything calculates entirely in your browser with zero latency.
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="w-full">
            <CycleCalendar />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center mb-12 space-y-3">
          <h2 className="heading-2">How It Works: 4-Step Cycle Tracking</h2>
          <p className="text-[var(--muted)] text-base max-w-xl mx-auto">
            Take control of your menstrual health in four straightforward steps with zero privacy compromises.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                      Step {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-bold text-base text-[var(--foreground)] mb-2">{item.title}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="grid sm:grid-cols-3 gap-6 pt-12 border-t border-gray-200 dark:border-gray-800">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <Shield size={20} />
          </div>
          <h3 className="font-semibold text-lg">Privacy First</h3>
          <p className="text-sm text-[var(--muted)]">Your data never leaves your device. We use local storage so your health information remains yours alone.</p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
            <CalendarDays size={20} />
          </div>
          <h3 className="font-semibold text-lg">Visual Calendar</h3>
          <p className="text-sm text-[var(--muted)]">Spot patterns easily with an intuitive color-coded calendar that highlights your period and fertile window.</p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--secondary)]/10 text-[var(--secondary)] flex items-center justify-center">
            <Activity size={20} />
          </div>
          <h3 className="font-semibold text-lg">Smart Predictions</h3>
          <p className="text-sm text-[var(--muted)]">Our algorithm learns your unique rhythm over time to give you more accurate next-period estimates.</p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="pt-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center mb-10 space-y-2">
          <h2 className="heading-2">Frequently Asked Questions</h2>
          <p className="text-[var(--muted)] text-sm">Direct, clear answers about cycle tracking, algorithms, and privacy.</p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <div key={faq.q} className="card p-6 space-y-2">
              <h3 className="text-base font-bold text-[var(--foreground)]">{faq.q}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access to Cycle Tools */}
      <section className="pt-12 border-t border-gray-200 dark:border-gray-800">
        <h2 className="heading-3 mb-6 text-center">Free Cycle Tracking Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/tools/next-period-predictor" className="card p-6 hover:border-[var(--primary)]/50 transition-all group min-h-[44px]">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Next Period Predictor</h3>
            <p className="text-sm text-[var(--muted)]">Predict exactly when your next period will arrive based on your cycle history.</p>
          </Link>
          <Link href="/tools/safe-days-calculator" className="card p-6 hover:border-[var(--primary)]/50 transition-all group min-h-[44px]">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Safe Days Calculator</h3>
            <p className="text-sm text-[var(--muted)]">Calculate your safe days and fertile window with privacy-first tracking.</p>
          </Link>
          <Link href="/tools/ovulation-calculator" className="card p-6 hover:border-[var(--primary)]/50 transition-all group min-h-[44px]">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors">Ovulation Calculator</h3>
            <p className="text-sm text-[var(--muted)]">Find your most fertile days instantly with our free ovulation calculator.</p>
          </Link>
        </div>
      </section>

      {/* Internal Traffic Engine - Related Tools Widget */}
      <RelatedToolsWidget />
    </div>
  );
}
